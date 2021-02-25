const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');


router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getUser);

router.post('/create', userMiddleware.checkIsUserValid, userController.createUser);

router.patch('/:userId', userController.deleteUser);



module.exports = router;


