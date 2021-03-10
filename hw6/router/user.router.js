const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middleware');
const { userController } = require('../controller');

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.use('/find/:email', userMiddleware.checkIsEmailExist);
router.get('/find/:email', userController.getUserByEmail);

router.use('/:userId', userMiddleware.checkIsUserIdExist);
router.get('/:userId', userController.getUser);
router.delete('/:userId', authMiddleware.checkAccessToken, userController.deleteUser);

// router.route('/:userId')
//     .all(userMiddleware.checkIsUserIdExist)
//     .get(userController.getUser)
//     .delete(authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
