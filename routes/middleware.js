let router = require('express').Router();
let bodyParser = require('body-parser');
let jwt  = require('jsonwebtoken');
let secretKey = require('./config').secretKey;

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secretKey, function(err, decoded) {      
            if (err) {
                console.log(err);
                return res.json({ status: -1, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
     } else {
        // if there is no token
        // return an error
        return res.status(403).send({ status: -1, message: 'No token provided.'});
    }
});

module.exports = router;