const { ROOT_USER, ROOT_USER_PASSWORD } = require('./config');

module.exports = {
    development: {
        username: ROOT_USER,
        password: ROOT_USER_PASSWORD,
        database: 'Sep-2020',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
