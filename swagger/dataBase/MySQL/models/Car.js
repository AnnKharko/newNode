const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Car = client.define(
        'Car',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            producer: { type: DataTypes.STRING },
            model: { type: DataTypes.STRING },
            year: { type: DataTypes.NUMBER },
            price: { type: DataTypes.NUMBER },
            color: { type: DataTypes.STRING },
            owner: { type: DataTypes.NUMBER },
            photos: [{ type: DataTypes.STRING }],
            docs: [{ type: DataTypes.STRING }],
            videos: [{ type: DataTypes.STRING }]
        },
        {
            tableName: 'cars',
            timestamps: false
        }
    );
    return Car;
};
