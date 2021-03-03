const carService = require('../service/car.service');
const errorCodes = require('../constant/errorCodes.enum');
const statusCodes = require('../constant/statusCodes.enum');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getCarByModel: async (req, res) => {
        try {
            const { model } = req.params;

            const car = await carService.findCarByModel(model);

            res.json(car);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getCar: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createNewCar(req.body);

            res.status(statusCodes.CREATED).json('CAR IS CREATED');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        const { carId } = req.params;

        await carService.deleteCarById(carId);

        res.status(statusCodes.OK).json('CAR IS DELETED');
    }
};
