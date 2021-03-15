const { errorCodesEnum, ErrorHandler, errorMessages } = require('../error');
const { userValidators } = require('../validators');
const { User } = require('../dataBase/models');

module.exports = {
    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.BED_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailExist: async (req, res, next) => {
        try {
            const choseEmail = req.params.email;
            const findEmail = await User.find({ email: choseEmail });

            if (!findEmail.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_USER_WITH_SUCH_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserIdExist: async (req, res, next) => {
        try {
            const id = req.params.userId;

            const find = await User.find({ _id: id });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            req.infoEmail = find[0].email;
            req.infoName = find[0].name;
            next();
        } catch (e) {
            next(e);
        }
    }
};
