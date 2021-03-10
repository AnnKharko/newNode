const { userService } = require('../service');
const { statusCodeEnum, constants } = require('../constant');
const { passwordHasher } = require('../helpers');
const { O_Auth } = require('../dataBase/models');

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
            const { password } = req.body;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createNewUser({ ...req.body, password: hasPassword });

            res.status(statusCodeEnum.CREATED).json(constants.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const id = req.infoTokens;

            await userService.deleteUserById(userId);
            await O_Auth.findByIdAndDelete({ _id: id });

            res.status(statusCodeEnum.OK).json(constants.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
