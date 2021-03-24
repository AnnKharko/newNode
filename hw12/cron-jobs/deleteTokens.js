const db = require('../dataBase/MySQL').getInstance();

module.exports = async () => {
    const O_Auth = db.getModel('O_Auth');

    await O_Auth.destroy({ where: { user: null } }); // у мене в таблиці немає дати створення
};
