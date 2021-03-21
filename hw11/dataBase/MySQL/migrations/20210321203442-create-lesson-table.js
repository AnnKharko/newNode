module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.createTable(
            'lesson',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                date: {
                    type: Sequelize.DataTypes.INTEGER,
                },
                label: {
                    type: Sequelize.DataTypes.INTEGER,
                },
                student_count: {
                    type: Sequelize.DataTypes.INTEGER,
                }
            }
        );
    },
    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('lesson');
    }
};
