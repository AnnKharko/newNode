const { authService } = require('../service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

module.exports = {
    authUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { email, password } = req.body;

            const tokens = await authService.authUser(email, password, transaction);

            await transaction.commit();
            res.json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { user, id } = req.tokenInfo;
            const tokens = await authService.refreshToken(user, id, transaction);

            await transaction.commit();
            res.json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }

};
