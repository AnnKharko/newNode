//  mysql2 - низькорівнева імплементація звязку бази і node

const { studentService } = require('../service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },
    getStudent: async (req, res, next) => {
        try {
            const student = await studentService.findOne(req.params.id);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },
    createStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            await studentService.createOne(req.body, transaction);
            // await studentService.updateStudent(16, { name: 'Ivan' }, transaction);

            await transaction.commit();
            res.json('OK!');
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    deleteStudent: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { id } = req.params;

            await studentService.deleteOne(id, transaction);

            await transaction.commit();
            res.json('OK');
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
