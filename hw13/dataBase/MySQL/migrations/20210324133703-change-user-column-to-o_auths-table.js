module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('o_auths', 'user', {
            type: Sequelize.INTEGER
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('o_auths', 'user', { type: Sequelize.INTEGER });
    }
};
