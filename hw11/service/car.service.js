const db = require('../dataBase/MySQL').getInstance();
const { queryBuilder } = require('../helpers');
// eslint-disable-next-line import/order
const { Op } = require('sequelize');

module.exports = {
    findCars: async (query = {}) => {
        const Car = db.getModel('Car');
        const price = [];
        const year = [];

        // ?yearGte=2014&yearLte=2021&priceGte=20000&priceLte=50000&color=red
        const {
            filters, keys, limit, page, skip
        } = queryBuilder(query);
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte': // price: { [Op.between]: [20000, 50000]}
                    price.push(+filters.priceGte);
                    filterObject.price = { [Op.between]: price };
                    break;
                case 'priceLte':
                    price.push(+filters.priceLte);
                    filterObject.price = { [Op.between]: price };
                    break;
                case 'yearGte':
                    year.push(+filters.yearGte);
                    filterObject.year = { [Op.between]: year };
                    break;
                case 'yearLte':
                    year.push(+filters.yearLte);
                    filterObject.year = { [Op.between]: year };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });
        console.log(filterObject);

        const cars = await Car.findAll({ where: filterObject }, { offset: skip, limit: +limit });

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
