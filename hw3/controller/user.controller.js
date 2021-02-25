const userService = require('../service/user.service');

module.exports = {
    getAllUsers: (req, res) => {
       try {
           const users = userService.findUsers()

           res.json(users)
       } catch (e) {
           res.status(400).json(e.message);
       }
    },

    getUser: (req, res) => {
       try {
           const {userId} = req.params;

           const user = userService.findUserById(userId-1);

           res.json(user);
       } catch (e) {
           res.status(400).json(e.message);
       }
    },

    createUser: (req, res) => {
        userService.createUser(req.body);
        console.log(req.body);

        res.status(201).json('USER IS CREATED')
    },

    deleteUser: (req, res) => {
        const {userId} = req.params;

        userService.deleteUserById(userId-1);

        res.json('USER IS DELETED');
    }
}
