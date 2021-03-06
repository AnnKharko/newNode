const { O_Auth, User } = require('../dataBase/models');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    authUser: async (email, password) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('NO USER');
        }

        await passwordHasher.compare(password, user.password);
        const tokens = tokenizer();
        // ==== SAVE TOKENS TO DB
        await O_Auth.create({ ...tokens, user: user._id });
        return tokens;
    },
    // saveTokensToDB: (tokens) => {
    // O_Auth.create({ ...tokens, user: user._id });
    // }
};
