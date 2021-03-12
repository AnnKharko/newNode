const { Car } = require('../dataBase/models');

module.exports = {
    /**
     * @returns {Query<Array<Document>, Document>}
     */
    findCars: () => Car.find(),
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
