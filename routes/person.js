const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
require("dotenv").config();

const { Person } = require("../sequelize");

// @route       POST api/gallery/add
// @description Add gallery
// @access      Private
router.post(
    "/add",
    [
        auth,
        check("first_name", "First name must be between 1 and 42 characters").isLength({ min: 1, max: 42 }),
        check("last_name", "Last name must be between 1 and 42 characters").isLength({ min: 1, max: 42 })
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, middle_name, last_name } = req.body;
        const userId = req.userId;
        const personFields = {
            first_name,
            middle_name,
            last_name,
            createdUser: userId,
            lastUser: userId
        };
        try {
            const person = await Person.create(personFields);
            res.json(person.dataValues);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
