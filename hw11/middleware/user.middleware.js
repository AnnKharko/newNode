const { errorCodesEnum, ErrorHandler, errorMessages } = require('../error');
const { userValidators } = require('../validators');
const db = require('../dataBase/MySQL').getInstance();

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
            const User = db.getModel('User');

            const findEmail = await User.findAll({
                where: { email: choseEmail }
            });

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
            const User = db.getModel('User');
            const { userId } = req.params;

            const find = await User.findAll({
                where: { id: userId }
            });

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
