const { passwordHasher, tokenizer } = require('../helpers');
const db = require('../dataBase/MySQL').getInstance();

const authUser = async (userEmail, password, transaction) => {
    const User = db.getModel('User');
    const O_Auth = db.getModel('O_Auth');

    const user = await User.findAll({
        where: { email: userEmail }
    });

    if (!user) {
        throw new Error('NO USER');
    }

    await passwordHasher.compare(password, user[0].dataValues.password);
    const tokens = tokenizer();
    // ==== SAVE TOKENS TO DB
    await O_Auth.create({ ...tokens, user: user[0].dataValues.id }, transaction);

    return tokens;
};

const refreshToken = async (user, tokenId, transaction) => {
    const O_Auth = db.getModel('O_Auth');
    const tokens = tokenizer();

    await O_Auth.update({ ...tokens, user }, {
        where: { id: tokenId },
        transaction
    });

    return tokens;
};

module.exports = {
    authUser,
    refreshToken
};
