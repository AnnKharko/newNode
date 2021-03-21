const jwt = require('jsonwebtoken');
const { errorCodesEnum, errorMessages, ErrorHandler } = require('../error');
const { constants } = require('../constant');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const db = require('../dataBase/MySQL').getInstance();

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const O_Auth = db.getModel('O_Auth');
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
            // const tokens = await O_Auth.findOne({ access_token }).populate('user');
            const tokens = await O_Auth.findAll({
                where: { access_token }
            });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_TOKEN);
            }

            req.infoTokens = tokens[0].dataValues.id;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const O_Auth = db.getModel('O_Auth');
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
            // const tokens = await O_Auth.findOne({ refresh_token });
            const tokens = await O_Auth.findAll({
                where: { refresh_token }
            });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_REFRESH_TOKEN);
            }

            // req.tokenInfo = tokens;
            req.tokenInfo = tokens[0].dataValues;
            next();
        } catch (e) {
            next(e);
        }
    }
};
