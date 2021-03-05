const O_Auth = require('../dataBase/models/O_Auth');
const { passwordHasher, tokenizer } = require('../helpers');
const User = require('../dataBase/models/User');

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

        // res.json(tokens);
    },
    // saveTokensToDB: (tokens) => {
    // O_Auth.create({ ...tokens, user: user._id });
    // }
};
