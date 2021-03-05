const { carValidators } = require('../validators');
const { errorCodesEnum } = require('../constant');
const errorMessages = require('../error/error.messages');
const Car = require('../dataBase/models/Car');

module.exports = {
    checkIsCarValid: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
    checkIsModelExist: (req, res, next) => {
        try {
            const choseModel = req.body.model;
            const { language = 'en' } = req.body;

            if (!Car.find({ model: choseModel })) {
                throw new Error(errorMessages.NOT_EXIST_CAR_WITH_SUCH_MODEL[language]);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.NOT_FOUND).json(e.message);
        }
    },
    checkIsCarIdExist: (req, res, next) => {
        try {
            const { carId, language = 'en' } = req.body;

            if (!Car.find({ _id: carId })) {
                throw new Error(errorMessages.NOT_EXIST_CAR_WITH_SUCH_ID[language]);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.NOT_FOUND).json(e.message);
        }
    }

};
