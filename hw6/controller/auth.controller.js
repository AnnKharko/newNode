const { authService } = require('../service');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const tokens = await authService.authUser(email, password);

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }

};
