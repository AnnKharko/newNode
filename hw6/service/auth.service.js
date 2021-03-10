const { O_Auth, User } = require('../dataBase/models');
const { passwordHasher, tokenizer } = require('../helpers');

const authUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('NO USER');
    }

    await passwordHasher.compare(password, user.password);
    const tokens = tokenizer();
    // ==== SAVE TOKENS TO DB
    await O_Auth.create({ ...tokens, user: user._id });
    return tokens;
};

const refreshToken = async (user, _id) => {
    const tokens = tokenizer();
    await O_Auth.findByIdAndUpdate(_id, { ...tokens, user });

    return tokens;
};

module.exports = {
    authUser,
    refreshToken
};
