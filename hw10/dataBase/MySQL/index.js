const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    user: 'root',
    password: 'javascript',
    database: 'sep-2020',
    host: 'localhost'
});

module.exports = connection.promise();
