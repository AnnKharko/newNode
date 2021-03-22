const { carService, uploadService } = require('../service');
const { constants, statusCodeEnum } = require('../constant');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

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

            const car = await carService.findCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { photos, docs, videos } = req;

            const car = await carService.createNewCar(req.body, transaction);

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
            await transaction.commit();

            res.status(statusCodeEnum.CREATED).json(constants.CAR_IS_CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId, transaction);

            await transaction.commit();
            res.status(statusCodeEnum.OK).json(constants.CAR_IS_DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
