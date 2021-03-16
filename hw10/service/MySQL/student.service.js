// ===========================================
//  mysql2 - низькорівнева імплементація звязку бази і node
const db = require('../../dataBase/MySQL');

module.exports = {
    findAll: async () => {
        const [dbResponse] = await db.query('SELECT * FROM students') || [];

        return dbResponse;
    },
    createOne: (studentObject) => {
        const { age, gender, name } = studentObject;

        db.query(`INSERT INTO students (age, gender, name) VALUES ('${age}', '${gender}', '${name}')`);
    }
};
// =============================================
