const bcrypt = require('bcrypt');
const { ErrorHandler, errorCodesEnum, errorMessages } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
