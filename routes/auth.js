const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const { User } = require("../sequelize");

// @route       POST api/auth
// @description Authenticate user and get token
// @access      Public
router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            // Find email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            // Check password
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            // Check if verified
            if (!user.auth) {
                return res.status(400).json({ errors: [{ msg: "Account not verified by admin" }] });
            }
            // Sign token
            const token = jwt.sign({ userId: user.uuid, email: user.email, isAuth: user.auth }, process.env.jwtSecret, {
                expiresIn: "1h" //1h
            });
            const decoded = jwt.decode(token);
            const { userId, isAuth } = decoded;
            res.json({ token, email, userId, isAuth });
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
