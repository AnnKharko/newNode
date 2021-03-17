//  mysql2 - низькорівнева імплементація звязку бази і node
// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//     user: 'root',
//     password: 'javascript',
//     database: 'sep-2020',
//     host: 'localhost'
// });
//
// module.exports = connection.promise();
// ===============================

// ======== sequelize =================
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
// const { ROOT_USER, ROOT_USER_PASSWORD } = require('../../configs/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('sep-2020', 'root', 'javascript', { dialect: 'mysql' });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');

                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

                    models[model] = modelFile(client);
                });
            });
        };
        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };
    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    };
})();
