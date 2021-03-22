module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('o_auths', {
            access_token: { type: Sequelize.STRING },
            refresh_token: { type: Sequelize.STRING },
            user: { type: Sequelize.STRING }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('o_auths');
    }
};
