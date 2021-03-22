const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Lesson = client.define(
        'Lesson',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            date: {
                type: DataTypes.INTEGER,
            },
            label: {
                type: DataTypes.INTEGER,
            },
            student_count: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'lesson',
            timestamps: false
        }
    );

    return Lesson;
};
