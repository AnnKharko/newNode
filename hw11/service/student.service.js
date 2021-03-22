// ===========================================
//  mysql2 - низькорівнева імплементація звязку бази і node
// const db = require('../../dataBase/MySQL');
//
// module.exports = {
//     findAll: async () => {
//         const [dbResponse] = await db.query('SELECT * FROM students') || [];
//
//         return dbResponse;
//     },
//     createOne: (studentObject) => {
//         const { age, gender, name } = studentObject;
//
//         db.query(`INSERT INTO students (age, gender, name) VALUES ('${age}', '${gender}', '${name}')`);
//     }
// };
// =============================================
const db = require('../dataBase/MySQL').getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },
    findOne: (id) => {
        const Student = db.getModel('Student');

        return Student.findAll({ where: { id } });
    },
    createOne: (studentObject, transaction) => {
        const Student = db.getModel('Student');

        return Student.create(studentObject, { transaction });
    },
    // updateStudent: (id, student, transaction) => {
    //     const Student = db.getModel('Student');
    //
    //     return Student.update(student, {
    //         where: { id },
    //         returning: true,
    //         transaction
    //     });
    // },
    deleteOne: (id, transaction) => {
        const Student = db.getModel('Student');
        return Student.destroy({ where: { id }, transaction });
    }
};
