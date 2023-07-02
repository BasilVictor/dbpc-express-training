let router = require('express').Router();

router.post('/login', (req, res, next) => {
    return res.status(200).json({
        status: 0,
        message: "Login successful"
    });
});

module.exports = router;