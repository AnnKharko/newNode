// const carService = require('../service/car.service');
const errorCodes = require('../constant/errorCodes.enum');
// const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    checkIsCarValid: (req, res, next) => {
        try {
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    checkIsModelExist: (req, res, next) => {
        try {
            // const { model, language = 'en' } = req.body;}
            next();
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    },
    checkIsCarIdExist: (req, res, next) => {
        try {
            // const { language = 'en' } = req.body;
            // const userId = +req.params.userId;
            next();
        } catch (e) {
            res.status(errorCodes.NOT_FOUND).json(e.message);
        }
    }

};
