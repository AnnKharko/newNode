module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('lesson2', 'xxx', { type: Sequelize.STRING });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('lesson2', 'xxx');
    }
};
