const { constants, emailActionsEnum, statusCodeEnum } = require('../constant');
const { mailService, userService } = require('../service');
const { O_Auth } = require('../dataBase/models');
const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

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
            const { password, email, name } = req.body;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createNewUser({ ...req.body, password: hasPassword });

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.status(statusCodeEnum.CREATED).json(constants.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId, email, name } = req.params;
            const id = req.infoTokens;

            await userService.deleteUserById(userId);
            await O_Auth.findByIdAndDelete({ _id: id });

            await mailService.sendMail(email, emailActionsEnum.USER_DELETED, { userName: name });

            res.status(statusCodeEnum.OK).json(constants.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
