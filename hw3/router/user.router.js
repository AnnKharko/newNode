const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/email', userMiddleware.checkIsEmailExist, userController.getUserByEmail);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getUser);

router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.patch('/:userId', userMiddleware.checkIsUserIdExist, userController.deleteUser);

module.exports = router;
