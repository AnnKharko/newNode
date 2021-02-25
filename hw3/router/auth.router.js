const router = require('express').Router();

router.get('/', ((req, res) => {
    res.json('Auth is success')
}))


module.exports = router;


