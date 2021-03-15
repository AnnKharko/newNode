const { queryBuilder } = require('../helpers');
const { User } = require('../dataBase/models');

module.exports = {
    /**
     * @param query
     * @returns {Promise<{pages: number, data: *, limit: (number|*), count: *, page: (number|*)}>}
     */
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
                    filterObject.age = Object.assign({}, filterObject.age, { $gte: +filters.ageGte });
                    break;
                case 'ageLte':
                    filterObject.age = Object.assign({}, filterObject.age, { $lte: +filters.ageLte });
                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },
    /**
     * @param userId
     * @returns {Query<Document | null, Document>}
     */
    findUserById: (userId) => User.findById(userId),
    /**
     * @param choseEmail
     * @returns {Query<Array<Document>, Document>}
     */
    findUserByEmail(choseEmail) {
        return User.find({ email: choseEmail });
    },
    // eslint-disable-next-line no-undef
    /**
     * @param userObject
     * @returns {Promise<Document>}
     */
    createNewUser: (userObject) => User.create(userObject),
    /**
     * @param userId
     * @returns {Query<Document | null, Document>}
     */
    deleteUserById: (userId) => User.findByIdAndDelete(userId)
    // updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject })
};
