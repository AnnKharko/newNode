module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'authId', {
            type: Sequelize.INTEGER,
            references: { model: 'o_auths', key: 'id' }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'authId');
    }
};
