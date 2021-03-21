const router = require('express').Router();

const { studentController } = require('../controller');
const { studentMiddleware } = require('../middleware');

router.get('/', studentController.getAll);
router.post('/', studentMiddleware.checkIsStudentValid, studentController.createStudent);
router.use('/:id', studentMiddleware.checkIsStudentIdExist);
router.get('/:id', studentController.getStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
