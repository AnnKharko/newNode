module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cars', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            producer: { type: Sequelize.STRING },
            model: { type: Sequelize.STRING },
            year: { type: Sequelize.INTEGER },
            price: { type: Sequelize.INTEGER },
            color: { type: Sequelize.STRING },
            owner: { type: Sequelize.INTEGER },
            photos: { type: Sequelize.STRING },
            docs: { type: Sequelize.STRING },
            videos: { type: Sequelize.STRING }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('cars');
    }
};
