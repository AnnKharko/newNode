const { studentService } = require('../service/MySQL');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
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
    }
};
