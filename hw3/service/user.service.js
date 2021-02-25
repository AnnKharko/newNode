const DB = require('../dataBase/users.json')

const fs = require('fs');
// const path = require('path');
const {promisify} = require('util');

const appendFilePromise = promisify(fs.appendFile);

const filePath ='/Users/macbooc/WebstormProjects/Node/HW/hw3/dataBase/users.json';

module.exports = {
    findUsers: () => {
        return DB;
    },
    findUserById: (userId) => {
        return DB[userId];
    },
    createUser: (userObject) => {
        console.log(userObject);
        const user = { userId: DB.length+1, nikName: userObject.nikName, email: userObject.email, password: userObject.password}
        // // DB.push(userObject);
        appendFilePromise(filePath, JSON.stringify(user)).then()
        console.log(DB)

    },
    deleteUserById: (userId) => {
        DB.splice(userId,1);
        return DB;
    }
}
