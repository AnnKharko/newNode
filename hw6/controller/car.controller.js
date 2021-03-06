const { carService } = require('../service');
const { errorCodesEnum, statusCodeEnum } = require('../constant');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getCarByModel: async (req, res) => {
        try {
            const { model } = req.params;

            const car = await carService.findCarByModel(model);

            res.json(car);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getCar: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createNewCar(req.body);

            res.status(statusCodeEnum.CREATED).json('CAR IS CREATED');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        const { carId } = req.params;

        await carService.deleteCarById(carId);

        res.status(statusCodeEnum.OK).json('CAR IS DELETED');
    }
};
