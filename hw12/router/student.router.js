const router = require('express').Router();

const { studentController } = require('../controller');
const { studentMiddleware, authMiddleware } = require('../middleware');

router.get('/', studentController.getAll);
router.post('/',
    authMiddleware.checkUserRole([
        'admin',
        'manager'
    ]),
    studentMiddleware.checkIsStudentValid,
    studentController.createStudent);
router.use('/:id', studentMiddleware.checkIsStudentIdExist);
router.get('/:id', studentController.getStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
