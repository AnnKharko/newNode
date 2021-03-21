const { constants, emailActionsEnum, statusCodeEnum } = require('../constant');
const { mailService, uploadService, userService } = require('../service');
const { passwordHasher } = require('../helpers');
const db = require('../dataBase/MySQL').getInstance();

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {
            const { email } = req.params;

            const user = await userService.findUserByEmail(email);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const id = req.params.userId;

            const user = await userService.findUserById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {
                body: { password, email, name }, avatar, docs, videos
            } = req;

            const hasPassword = await passwordHasher.hash(password);

            const user = await userService.createNewUser({ ...req.body, password: hasPassword });

            if (avatar) {
                // await uploadService.photoDirBuild(avatar, user._id);
                await uploadService.userUploadDirBuilder(avatar, user._id, 'photo');
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.userUploadDirBuilder(doc, user._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.userUploadDirBuilder(video, user._id, 'video');
                }
            }
            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.status(statusCodeEnum.CREATED).json(constants.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const O_Auth = db.getModel('O_Auth');
            const { userId } = req.params;
            const id = req.infoTokens;
            const email = req.infoEmail;
            const name = req.infoName;

            await userService.deleteUserById(userId);
            await O_Auth.destroy({
                where: { id }
            });

            await mailService.sendMail(email, emailActionsEnum.USER_DELETED, { userName: name });

            res.status(statusCodeEnum.OK).json(constants.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
