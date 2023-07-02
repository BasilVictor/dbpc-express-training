let router = require('express').Router();
let {check, validationResult} = require('express-validator');
let config = require('../config');
let connection = require('mysql2').createPool(config.database);
const jwt = require('jsonwebtoken');

router.post('/login', [check('email', 'Email is required and must be a valid email').notEmpty().isEmail(), check('password', 'Password is required').notEmpty()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: -1, errors: errors.array(), message: 'Invaliid request' })
    }
    let email = req.body.email;
    let password = req.body.password;
    connection.getConnection((error, tempConnection) => {
        if (error) {
            console.log(error.message);
            return res.status(504).json({
                status: -1,
                message: 'Something went wrong. Please try again later.'
            })
        }
        tempConnection.query("select * from users where email = ? AND password = ?;", [email, password], async(err, rows, field) => {
            tempConnection.release();
            if (err) {
                console.log("error", err)
                return res.status(500).json({
                    status: -1, message: 'Unable to process.'
                });
            }
            if(rows.length == 1) {
                const payload = { user_id: rows[0].id, name: rows[0].name };
                const accessToken = jwt.sign(payload, config.secretKey);
                return res.status(200).json({
                    status: 0,
                    data: accessToken,
                    message: "Login successful"
                });
            } else {
                return res.status(200).json({
                    status: 0,
                    message: "Login failed"
                });
            }
        });
    });
});

module.exports = router;