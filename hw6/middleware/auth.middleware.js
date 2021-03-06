const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { JWT_SECRET } = require('../configs/config');
const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error('token is required');
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token Verify');
                }
            });
            // ===== CHECK DATA BASE
            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            if (!tokens) {
                throw new Error('Not valid token');
            }
            next();
        } catch (e) {
            res.json(e.message);
            // next(e);
        }
    }
};
