const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Student = client.define(
        'Student',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: { type: DataTypes.STRING },
            age: { type: DataTypes.INTEGER },
            gender: { type: DataTypes.STRING },
        },
        {
            tableName: 'students',
            timestamps: false
        }
    );

    return Student;
};
