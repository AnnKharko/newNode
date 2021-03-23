const db = require('../dataBase/MySQL').getInstance();
// eslint-disable-next-line import/order
const { Op } = require('sequelize');
const { queryBuilder } = require('../helpers');

module.exports = {
    findUsers: async (query = {}) => {
        // ?&ageGte=18&ageLte=25&gender=female
        const {
            filters, keys, limit, page, skip
        } = queryBuilder(query);
        const filterObject = {};
        const age = [];

        keys.forEach((key) => {
            switch (key) {
                //   age: { [Op.between]: [18, 35]}
                case 'ageGte':
                    age.push(+filters.ageGte);
                    break;
                case 'ageLte':
                    age.push(+filters.ageLte);
                    filterObject.age = { ...filterObject.age, [Op.between]: age };

                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const User = db.getModel('User');
        const users = await User.findAll({ where: filterObject }, { offset: skip, limit: +limit });

        return {
            data: users,
            page,
            limit,
        };
    },
    findUserById: (userId) => {
        const User = db.getModel('User');
        return User.findAll({
            where: { id: userId },
            attributes: {
                exclude: ['password']
            }
        });
    },
    findUserByEmail(choseEmail) {
        const User = db.getModel('User');
        return User.findAll({
            where: { email: choseEmail },
            attributes: {
                exclude: ['password']
            }
        });
    },
    createNewUser: (userObject, transaction) => {
        const User = db.getModel('User');
        return User.create(userObject, transaction);
    },
    deleteUserById: (userId, transaction) => {
        const User = db.getModel('User');
        User.destroy({
            where: { id: userId },
            transaction
        });
    }
};
