let router = require('express').Router();

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    return res.status(200).json({
        status: 0,
        data: {
            email: email,
            password: password
        },
        message: "Login successful"
    });
});

module.exports = router;