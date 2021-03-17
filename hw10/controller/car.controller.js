const { carService, uploadService } = require('../service');
const { constants, statusCodeEnum } = require('../constant');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars(req.query);

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
            console.log(carId);

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const { photos, docs, videos } = req;

            const car = await carService.createNewCar(req.body);

            if (photos) {
                for (const photo of photos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.carUploadDirBuilder(photo, car._id, 'photo');
                }
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.carUploadDirBuilder(doc, car._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.carUploadDirBuilder(video, car._id, 'video');
                }
            }

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
