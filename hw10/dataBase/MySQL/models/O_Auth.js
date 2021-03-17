const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const O_Auth = client.define(
        'O_Auth',
        {
            access_token: { type: DataTypes.STRING },
            refresh_token: { type: DataTypes.STRING },
            user: { type: DataTypes.STRING }
            // user: { type: Schema.Types.ObjectId, ref: USER },
        },
        {
            tableName: 'o_auths',
            timestamps: false
        }
    );
    return O_Auth;
};
