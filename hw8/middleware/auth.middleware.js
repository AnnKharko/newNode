const jwt = require('jsonwebtoken');
const { errorCodesEnum, errorMessages, ErrorHandler } = require('../error');
const { constants } = require('../constant');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_TOKEN);
                }
            });

            // ===== CHECK DATA BASE
            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_TOKEN);
            }

            req.infoTokens = tokens._id;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.REFRESH_TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_REFRESH_TOKEN);
                }
            });

            // ===== CHECK DATA BASE
            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_REFRESH_TOKEN);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    }
};
