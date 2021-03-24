module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('students', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: { type: Sequelize.STRING },
            age: { type: Sequelize.INTEGER },
            gender: { type: Sequelize.STRING },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('students');
    }
};
