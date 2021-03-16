const { Car } = require('../dataBase/models');
const { queryBuilder } = require('../helpers');

module.exports = {
    /**
     * @param query
     * @returns {Promise<{pages: number, data: *, limit: (number|*), count: *, page: (number|*)}>}
     */
    findCars: async (query = {}) => {
        // ?yearGte=2014&yearLte=2021&priceGte=20000&priceLte=50000&color=red
        const {
            filters, keys, limit, page, skip, sort
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

        const cars = await Car.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await Car.countDocuments(filterObject);

        return {
            data: cars,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },
    /**
     * @param carID
     * @returns {Query<Document | null, Document>}
     */
    findCarById: (carID) => Car.findById(carID),
    /**
     * @param choseModel
     * @returns {Query<Array<Document>, Document>}
     */
    findCarByModel(choseModel) {
        return Car.find({ model: choseModel });
    },
    // eslint-disable-next-line no-undef
    /**
     * @param carObject
     * @returns {Promise<Document>}
     */
    createNewCar: (carObject) => Car.create(carObject),
    /**
     * @param carId
     * @returns {Query<Document | null, Document>}
     */
    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
