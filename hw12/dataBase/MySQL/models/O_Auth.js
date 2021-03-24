const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const O_Auth = client.define(
        'O_Auth',
        {
            access_token: { type: DataTypes.STRING },
            refresh_token: { type: DataTypes.STRING },
            user: { type: DataTypes.STRING }
        },
        {
            tableName: 'o_auths',
            timestamps: false
        }
    );

    // O_Auth.associate = (models) => {
    //     O_Auth.belongsTo(models.User, { foreignKey: 'userId' });
    // };

    return O_Auth;
};
