const router = require('express').Router();
let jwtCheck = require('../middleware');

router.use("/auth", require("./auth"));

router.get("/test", jwtCheck, (req, res, next) => {
    console.log(req.decoded);
    return res.status(200).json({
        status: 0,
        message: "Successful"
    });
});

module.exports = router;