const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const statusCodes = require('../constant/statusCodes.enum');
const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            const { email } = req.params;

            const user = await userService.findUserByEmail(email);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hasPassword = await passwordHasher.hash(password);

            await userService.createNewUser({ ...req.body, password: hasPassword });

            res.status(statusCodes.CREATED).json('USER IS CREATED');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.status(statusCodes.OK).json('USER IS DELETED');
        } catch (e) {
            res.json(e.message);
        }
    }
};
