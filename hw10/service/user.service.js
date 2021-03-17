const { queryBuilder } = require('../helpers');
// const { User } = require('../dataBase/models');
const db = require('../dataBase/MySQL').getInstance();

module.exports = {
    findUsers: async (query = {}) => {
        // ?&ageGte=18&ageLte=35&gender=female&isMarried=false
        const {
            filters, keys, limit, page, skip, sort
        } = queryBuilder(query);
        const filterObject = {};

        keys.forEach((key) => {
            switch (key) {
                // age: {$gte: 18, $lte: 35}
                case 'ageGte':
                    filterObject.age = { ...filterObject.age, $gte: +filters.ageGte };
                    break;
                case 'ageLte':
                    filterObject.age = { ...filterObject.age, $lte: +filters.ageLte };
                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });
        const User = db.getModel('User');
        const users = await User.findAll();

        // const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);
        // const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit,
        };
    },
    findUserById: (userId) => {
        const User = db.getModel('User');
        return User.findAll({
            where: { id: userId }
        });
    },
    findUserByEmail(choseEmail) {
        const User = db.getModel('User');
        return User.findAll({
            where: { email: choseEmail }
        });
    },
    createNewUser: (userObject) => {
        const User = db.getModel('User');
        return User.create(userObject);
    },
    deleteUserById: (userId) => {
        const User = db.getModel('User');
        User.destroy({
            where: { id: userId }
        });
    }
        // User.findByIdAndDelete(userId)
    // updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })
};
