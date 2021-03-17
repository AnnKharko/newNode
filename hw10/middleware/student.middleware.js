const { errorCodesEnum, ErrorHandler, errorMessages } = require('../error');
const { studentValidators } = require('../validators');
const db = require('../dataBase/MySQL').getInstance();

module.exports = {
    checkIsStudentValid: (req, res, next) => {
        try {
            const { error } = studentValidators.createStudentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.BED_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsStudentIdExist: async (req, res, next) => {
        try {
            const Student = db.getModel('Student');
            const { id } = req.params;

            const find = await Student.findAll({
                where: { id }
            });

            if (!find.length) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorMessages.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            req.infoEmail = find[0].email;
            req.infoName = find[0].name;
            next();
        } catch (e) {
            next(e);
        }
    }
};
