module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/my_database',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'someone.mail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '234hhhh567890ptrewq',

    ROOT_USER: process.env.ROOT_USER || 'root',
    ROOT_USER_PASSWORD: process.env.ROOT_USER_PASSWORD || 'root',

    JWT_SECRET_A: process.env.JWT_SECRET_ADMIN || 'admin',
    JWT_SECRET_U: process.env.JWT_SECRET_USER || 'user',
    JWT_SECRET_M: process.env.JWT_SECRET_MANAGER || 'manager',
    JWT_REFRESH_SECRET_A: process.env.JWT_REFRESH_SECRET_ADMIN || 'admin',
    JWT_REFRESH_SECRET_M: process.env.JWT_REFRESH_SECRET_MANAGER || 'manager',
    JWT_REFRESH_SECRET_U: process.env.JWT_REFRESH_SECRET_USER || 'user'
};
