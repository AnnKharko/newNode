//  mysql2 - низькорівнева імплементація звязку бази і node

const { studentService } = require('../service');

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
        try {
            await studentService.createOne(req.body);

            res.json('OK!');
        } catch (e) {
            next(e);
        }
    },
    deleteStudent: async (req, res, next) => {
        try {
            const { id } = req.params;

            await studentService.deleteOne(id);

            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
};
