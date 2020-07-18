const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const { User } = require("../sequelize");

// @route       register
// @description register user
// @access      public
router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
        check("register_key", "Key is required").not().isEmpty()
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check key
        const { email, password, register_key } = req.body;
        if (process.env.REGISTER_KEY !== register_key) {
            return res.status(400).json({
                errors: [{ msg: "Please contact admin to get a registration key" }]
            });
        }
        // Setup user object
        let userFields = {
            uuid: uuid(),
            email,
            password
        };
        try {
            // Check if email exists
            let user = await User.findAll({ limit: 1, where: { email } });
            if (user.length > 0) {
                throw new Error("User already exists");
            }
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            // Hash password
            userFields.password = await bcrypt.hash(password, salt);
            user = await User.create(userFields);
            const token = jwt.sign({ userId: user.dataValues.uuid, email: user.dataValues.email, isAuth: 0 }, process.env.jwtSecret, {
                expiresIn: "1h" //1h
            });
            res.json({ token });
        } catch (err) {
            throw new Error(err);
        }
    }
);

module.exports = router;
