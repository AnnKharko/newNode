const db = require('../dataBase/MySQL').getInstance();
const { queryBuilder } = require('../helpers');

module.exports = {
    findCars: async (query = {}) => {
        const Car = db.getModel('Car');

        // queryBuilder ще не реалізовано
        // ?yearGte=2014&yearLte=2021&priceGte=20000&priceLte=50000&color=red
        const {
            filters, keys, limit, page
        } = queryBuilder(query);
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = Object.assign({}, filterObject.price, { $gte: +filters.priceGte });
                    break;
                case 'priceLte':
                    filterObject.price = Object.assign({}, filterObject.price, { $lte: +filters.priceLte });
                    break;
                case 'yearGte':
                    filterObject.year = Object.assign({}, filterObject.year, { $gte: +filters.yearGte });
                    break;
                case 'yearLte':
                    filterObject.year = Object.assign({}, filterObject.year, { $lte: +filters.yearLte });
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        // const cars = await Car.findAll(filterObject).limit(+limit).skip(skip).sort(sort);
        const cars = await Car.findAll();

        return {
            data: cars,
            page,
            limit,
        };
    },
    findCarById: async (carID) => {
        const Car = db.getModel('Car');

        const car = await Car.findAll({
            where: { id: carID }
        });
        return car;
    },
    findCarByModel: (choseModel) => {
        const Car = db.getModel('Car');
        return Car.findAll({
            where: { model: choseModel }
        });
    },
    createNewCar: (carObject, transaction) => {
        const Car = db.getModel('Car');
        return Car.create(carObject, transaction);
    },
    deleteCarById: (carId, transaction) => {
        const Car = db.getModel('Car');
        return Car.destroy({
            where: { id: carId },
            transaction
        });
    }
};
