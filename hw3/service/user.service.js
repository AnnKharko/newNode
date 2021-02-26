const fs = require('fs');
// const path = require('path');
const { promisify } = require('util');
const DB = require('../dataBase/users.json');

const writeFilePromise = promisify(fs.writeFile);

const filePath = '/Users/macbooc/WebstormProjects/Node/HW/hw3/dataBase/users.json';

module.exports = {
    findUsers: () => DB,
    findUserById: (userId) => DB[userId],
    findUserByEmail: (email) => {
        const findUser = DB.filter((user) => user.email === email);
        return findUser[0];
    },
    createUser: (userObject) => {
        console.log(userObject);
        const user = {
            userId: DB.length + 1, nikName: userObject.nikName, email: userObject.email, password: userObject.password
        };
        DB.push(user);
        writeFilePromise(filePath, JSON.stringify(DB)).then();
    },
    deleteUserById: (userId) => {
        DB.splice(userId, 1);
        writeFilePromise(filePath, JSON.stringify(DB)).then();
        return DB;
    }
};
