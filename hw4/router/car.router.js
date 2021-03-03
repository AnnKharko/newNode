const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);

router.get('/:model', carMiddleware.checkIsModelExist, carController.getCarByModel);

router.get('/:carId', carMiddleware.checkIsIdValid, carController.getCar);

router.post('/', carMiddleware.checkIsCarValid, carController.createCar);

router.patch('/:carId', carMiddleware.checkIsCarIdExist, carController.deleteCar);

module.exports = router;
