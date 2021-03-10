const { errorCodesEnum, errorMessages, ErrorHandler } = require('../error');
const { carValidators } = require('../validators');
const { Car } = require('../dataBase/models');

module.exports = {
    checkIsCarValid: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.BED_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsModelExist: (req, res, next) => {
        try {
            const choseModel = req.body.model;
            const find = Car.find({ model: choseModel });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_CAR_WITH_SUCH_MODEL);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsCarIdExist: (req, res, next) => {
        try {
            const { carId } = req.body;
            const find = Car.find({ _id: carId });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_CAR_WITH_SUCH_ID);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};
