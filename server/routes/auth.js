const router = require("express").Router();
const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptojs.AES.encrypt(
            req.body.password,
            process.env.CRYPTOJS_KEY
        ).toString()
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }

    /* try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    } */

});

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        !user && res.status(401).json("Username not found");

        const hashedPassword = cryptojs.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);
        const password = hashedPassword.toString(cryptojs.enc.Utf8);
        const inputPassword = req.body.password;
        password !== inputPassword && res.status(401).json("Incorrect password");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        // send info other than password
        // user._doc because of mongodb internal mechanics (mongo saves in "_doc")
        const { pw, ...otherinfo } = await user._doc;
        res.status(200).json({ ...otherinfo, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;