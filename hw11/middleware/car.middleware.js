const { errorCodesEnum, errorMessages, ErrorHandler } = require('../error');
const { carValidators } = require('../validators');
const db = require('../dataBase/MySQL').getInstance();

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
    checkIsModelExist: async (req, res, next) => {
        try {
            const choseModel = req.params.model;

            const Car = db.getModel('Car');
            const find = await Car.findAll({ where: { model: choseModel } });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_CAR_WITH_SUCH_MODEL);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsCarIdExist: async (req, res, next) => {
        try {
            const Car = db.getModel('Car');
            const { carId } = req.params;

            const find = await Car.findAll({ where: { id: carId } });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_CAR_WITH_SUCH_ID);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};
