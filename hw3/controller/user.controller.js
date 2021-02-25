const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const statusCodes = require('../constant/statusCodes.enum')

module.exports = {
    getAllUsers: (req, res) => {
       try {
           const users = userService.findUsers()

           res.json(users)
       } catch (e) {
           res.status(errorCodes.BAD_REQUEST).json(e.message);
       }
    },

    getUserByEmail: (req, res) => {
        try {
            const {email} = req.body;

            const user = userService.findUserByEmail(email);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },

    getUser: (req, res) => {
       try {
           const {userId} = req.params;

           const user = userService.findUserById(userId-1);

           res.json(user);
       } catch (e) {
           res.status(errorCodes.BAD_REQUEST).json(e.message);
       }
    },

    createUser: (req, res) => {
        userService.createUser(req.body);
        console.log(req.body);

        res.status(statusCodes.CREATED).json('USER IS CREATED')
    },

    deleteUser: (req, res) => {
        const {userId} = req.params;

        userService.deleteUserById(userId-1);

        res.status(statusCodes.OK).json('USER IS DELETED');

    }
}
