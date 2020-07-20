const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
require("dotenv").config();

const { Gallery } = require("../sequelize");

// @route       GET api/gallery/user
// @description Get user galleries
// @access      Private
router.get("/user", [auth], async (req, res) => {
    const userId = req.userId;
    try {
        const galleriesData = await Gallery.findAll({ where: { createdUser: userId } });
        res.json(galleriesData);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/gallery/add
// @description Add gallery
// @access      Private
router.post(
    "/add",
    [
        auth,
        check("title", "Title must be between 6 and 42 characters").isLength({ min: 6, max: 42 }),
        check("text", "Description must be between 6 and 500 characters").isLength({ min: 6, max: 500 }),
        check("pic_date", "Date is required").isDate(),
        check("is_public", "Public must be between 0 and 1").isInt({ min: 0, max: 1 })
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, text, pic_date, is_public } = req.body;
        const userId = req.userId;
        const galleryFields = {
            title,
            text,
            pic_date,
            is_public: parseInt(is_public, 10),
            createdUser: userId,
            lastUser: userId
        };
        try {
            const createdGallery = await Gallery.create(galleryFields);
            res.json(createdGallery.dataValues);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
