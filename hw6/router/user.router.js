const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middleware');
const { userController } = require('../controller');

router.get('/', userController.getAllUsers);

router.get('/:email', userMiddleware.checkIsEmailExist, userController.getUserByEmail);

router.get('/:userId', userMiddleware.checkIsUserIdExist, userController.getUser);

router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
