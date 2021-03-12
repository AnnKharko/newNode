const router = require('express').Router();
const { authMiddleware } = require('../middleware');

const { authController } = require('../controller');

router.post('/', authController.authUser);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = router;
