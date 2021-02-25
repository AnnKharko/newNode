const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const users = userService.findUsers()
            const userId = +req.params.userId;
            // const language = req.body;

            if( userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId) || userId > users.length){
                throw new Error(errorMessages.NOT_VALID_ID["ua"]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }

    },
    checkIsUserValid: (req, res, next) => {
        try {
            const {nikName, email, password, language = 'en'} = req.body;

            if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
                // res.json(user);
                throw new Error(errorMessages.NOT_VALID_EMAIL[language]);
            }

            if (!/[A-Z][A-Z a-z ' -]+/.test(nikName)) {
                throw new Error(errorMessages.NOT_VALID_NIKNAME[language]);
            }

            if (password.length < 6 || /!\w+/.test(password)) {
                throw new Error(errorMessages.NOT_VALID_PASSWORD[language]);

            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message)
        }
    }
}
