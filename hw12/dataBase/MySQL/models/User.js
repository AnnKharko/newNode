const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const User = client.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                require: true
            },
            age: {
                type: DataTypes.NUMBER,
                require: true
            },
            gender: {
                type: DataTypes.STRING,
                require: true
            },
            email: {
                type: DataTypes.STRING,
                require: true
            },
            password: {
                type: DataTypes.STRING,
                require: true,
                // exclude: true
            },
            role: {
                type: DataTypes.STRING,
                default: 'user'
            },
            avatar: {
                type: DataTypes.STRING,
            },
            doc: {
                type: DataTypes.STRING,
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );

    // User.associate = (models) => {
    //     User.hasOne(models.O_Auth, { foreignKey: 'userId' });
    // };
    return User;
};
