const { User } = require('../dataBase/models');

module.exports = {
    /**
     * @returns {Query<Array<Document>, Document>}
     */
    findUsers: () => User.find(),
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
};
