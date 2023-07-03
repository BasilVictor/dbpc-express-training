const router = require('express').Router();
let jwtCheck = require('../middleware');
const bcrypt = require('bcrypt');

router.use("/auth", require("./auth"));

router.get("/test", jwtCheck, async (req, res, next) => {
    console.log(req.decoded);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt);
    console.log(hashedPassword);
    return res.status(200).json({
        status: 0,
        message: "Successful"
    });
});

module.exports = router;