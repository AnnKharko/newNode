const router = require('express').Router();
const { passwordHasher } = require('../helpers');
const User = require('../dataBase/models/User');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('NO USER');
        }

        await passwordHasher.compare(password, user.password);

        res.json('OK');
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;
