const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const dotenv = require("dotenv");
require("dotenv").config();

const { Gallery, sequelize } = require("../sequelize");

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

// @route       GET api/gallery/:id
// @description Get single gallery
// @access      Private
router.get("/single/:id", [auth], async (req, res) => {
    const userId = req.userId;
    const gallery_id = req.params.id;
    try {
        const gallery = await Gallery.findOne({ where: { id: gallery_id, deleted: 0 } });
        const { is_public, createdUser } = gallery;
        if (is_public === 0 && userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }
        res.json(gallery);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// @route       GET api/gallery/recent
// @description Get recent galleries
// @access      Private
router.get("/recent", [auth], async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT
            MG.id,
            MG.title,
            MG.text,
            MG.createdAt,
            (SELECT link_thumb FROM famgram.photos AS MP WHERE MP.gallery_id = MG.id AND deleted = 0 LIMIT 1) AS thumb_1
            FROM famgram.galleries AS MG
            WHERE id IN(
                SELECT DISTINCT MP.gallery_id FROM famgram.photos AS MP
            )
            AND deleted = 0
            ORDER BY createdAt DESC
            LIMIT 9;
        `);
        res.json(results);
    } catch (error) {
        console.log(error);
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

// @route       POST api/gallery/edit
// @description Edit gallery
// @access      Private
router.post(
    "/edit",
    [
        auth,
        check("gallery_id", "ID required").not().isEmpty(),
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
        // Check if exists and permission
        const { gallery_id, title, text, pic_date, is_public } = req.body;
        const gallery = await Gallery.findOne({ where: { id: gallery_id } });
        if (!gallery) {
            return res.status(401).json({ msg: "Gallery does not exist" });
        }
        // Check if user created
        const { userId } = req;
        const { createdUser } = gallery;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }
        const galleryFields = {
            title,
            text,
            pic_date,
            is_public: parseInt(is_public, 10),
            lastUser: userId
        };
        try {
            let updatedGallery = await Gallery.update(galleryFields, { where: { id: gallery_id } });
            updatedGallery = await Gallery.findOne({ where: { id: gallery_id } });
            res.json(updatedGallery);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
