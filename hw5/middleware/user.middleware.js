// const userService = require('../service/user.service');
const { errorCodesEnum } = require('../constant');
const { userValidators } = require('../validators');
const errorMessages = require('../error/error.messages');
//
// const DB = [];
const User = require('../dataBase/models/User');

module.exports = {
    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    checkIsEmailExist: (req, res, next) => {
        try {
            const choseEmail = req.body.email;
            const { language = 'en' } = req.body;

            if (!User.find({ email: choseEmail })) {
                throw new Error(errorMessages.NOT_EXIST_USER_WITH_SUCH_EMAIL[language]);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.NOT_FOUND).json(e.message);
        }
    },
    checkIsUserIdExist: (req, res, next) => {
        try {
            const { userId, language = 'en' } = req.body;

            if (!User.find({ _id: userId })) {
                throw new Error(errorMessages.NOT_EXIST_USER_WITH_SUCH_ID[language]);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.NOT_FOUND).json(e.message);
        }
    }

};
