let router = require('express').Router();
let {check, validationResult} = require('express-validator');

router.post('/login', [check('email', 'Email is required and must be a valid email').notEmpty().isEmail(), check('password', 'Password is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: -1, errors: errors.array(), message: 'Invaliid request' })
    }
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