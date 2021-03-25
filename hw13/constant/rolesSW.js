const { JWT_SECRET_A, JWT_SECRET_M, JWT_SECRET_U } = require('../configs/config');

module.exports = {
    admin: JWT_SECRET_A,
    manager: JWT_SECRET_M,
    user: JWT_SECRET_U
};
