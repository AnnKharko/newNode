module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'role', { type: Sequelize.STRING });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'role');
    }
};
