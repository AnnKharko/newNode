const jwt = require('jsonwebtoken');
const {
    JWT_SECRET, JWT_SECRET_A, JWT_SECRET_M, JWT_SECRET_U,
    JWT_REFRESH_SECRET, JWT_REFRESH_SECRET_A, JWT_REFRESH_SECRET_M, JWT_REFRESH_SECRET_U
} = require('../configs/config');

module.exports = (role) => {
    let access_token;
    let refresh_token;

    switch (role) {
        case 'admin':
            access_token = jwt.sign({}, JWT_SECRET_A, { expiresIn: '1m' });
            refresh_token = jwt.sign({}, JWT_REFRESH_SECRET_A, { expiresIn: '30d' });

            break;
        case 'manager':
            access_token = jwt.sign({}, JWT_SECRET_M, { expiresIn: '1m' });
            refresh_token = jwt.sign({}, JWT_REFRESH_SECRET_M, { expiresIn: '30d' });
            break;
        case 'user':
            access_token = jwt.sign({}, JWT_SECRET_U, { expiresIn: '1m' });
            refresh_token = jwt.sign({}, JWT_REFRESH_SECRET_U, { expiresIn: '30d' });
            break;
        default:
            access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '1m' });
            refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });
    }

    return {
        access_token,
        refresh_token
    };
};
