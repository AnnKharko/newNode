const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/find/:model', carMiddleware.checkIsModelExist, carController.getCarByModel);

router.get('/:carId', carMiddleware.checkIsCarIdExist, carController.getCar);

router.post('/', fileMiddleware.checkFile, carMiddleware.checkIsCarValid, carController.createCar);

router.delete('/:carId', carMiddleware.checkIsCarIdExist, carController.deleteCar);

module.exports = router;
