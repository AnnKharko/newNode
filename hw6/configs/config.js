module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/my_database',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000
};
