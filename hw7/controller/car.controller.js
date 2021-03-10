const { carService } = require('../service');
const { constants, statusCodeEnum } = require('../constant');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarByModel: async (req, res, next) => {
        try {
            const { model } = req.params;

            const car = await carService.findCarByModel(model);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    getCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            await carService.createNewCar(req.body);

            res.status(statusCodeEnum.CREATED).json(constants.CAR_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.status(statusCodeEnum.OK).json(constants.CAR_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};