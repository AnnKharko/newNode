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
                select: false
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
    return User;
};
