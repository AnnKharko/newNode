const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');
const DB = require('../dataBase/users.json');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const users = userService.findUsers()
            const userId = +req.params.userId;
            const{language = 'en'} = req.body;

            if( userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId) || userId > users.length){
                throw new Error(errorMessages.NOT_VALID_ID[language]);
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
    },
    checkIsEmailExist: (req, res, next) => {
        try {
            const{email, language = 'en'} = req.body;

            if (!email || !DB.filter(user => user.email === email).length) {
                    throw new Error(errorMessages.NOT_EXIST_USER_WITH_SUCH_EMAIL[language])
            }
            next();

        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message)
        }
    },
    checkIsUserIdExist: (req, res, next) => {
        try {
            const{language = 'en'} = req.body;
            const userId = +req.params.userId;

            // if (userId) {
            //     if ( !DB.filter(user => user.userId === userId).length) {
            //         throw new Error(errorMessages.NOT_EXIST_USER_WITH_SUCH_ID[language])
            //     }
            // }
            if (!userId  || !DB.filter(user => user.userId === userId).length ){
                    throw new Error(errorMessages.NOT_EXIST_USER_WITH_SUCH_ID[language])
            }
            next();

        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message)
        }

    }


}
