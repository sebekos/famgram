const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const dotenv = require("dotenv");
require("dotenv").config();

const { Gallery, Photo, Tag, sequelize, Person } = require("../sequelize");

// @route       GET api/gallery/user
// @description Get user galleries
// @access      Private
router.get("/user", [auth], async (req, res) => {
    const userId = req.userId;
    try {
        const galleriesData = await Gallery.findAll({ where: { createdUser: userId, deleted: 0 }, order: [["updatedAt", "DESC"]] });
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

// @route       GET api/gallery/viewgallery
// @description Get gallery to display
// @access      Private
router.get("/viewgallery/:id", [auth], async (req, res) => {
    const userId = req.userId;
    const gallery_id = req.params.id;
    try {
        const gallery = await Gallery.findOne({ where: { id: gallery_id, deleted: 0 } });
        const { is_public, createdUser } = gallery;
        if (is_public === 0 && userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }
        const photos = await Photo.findAll({ where: { gallery_id, deleted: 0 } });
        res.json({ ...gallery, photos });
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

// @route       POST api/gallery/savemedia
// @description Save media
// @access      Private
router.post(
    "/savemedia/:id",
    [auth, check("gallery_id", "Gallery ID is required").not().isEmpty(), check("media_array", "Media array required").isArray()],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check if exists and permission
        const { gallery_id, media_array } = req.body;
        const gallery = await Gallery.findOne({ where: { id: gallery_id } });
        if (!gallery) {
            return res.status(401).json({ msg: "Gallery does not exist" });
        }
        // Check if user created
        const { userId } = req;
        const { createdUser } = gallery;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is not yours" });
        }
        try {
            await sequelize.query(`
                UPDATE famgram.photos SET
                deleted = 1
                WHERE gallery_id = ${gallery_id}
                AND id NOT IN (${media_array.join(", ")})
            `);
            res.json(true);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

// @route       POST api/gallery/addtag
// @description Save media
// @access      Private
router.post(
    "/addtag",
    [
        auth,
        check("gallery_id", "Gallery ID is required").not().isEmpty(),
        check("photo_id", "Photo ID is required").not().isEmpty(),
        check("person_id", "Person ID is required").not().isEmpty()
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if gallery exists
        const { gallery_id, photo_id, person_id } = req.body;
        const gallery = await Gallery.findOne({ where: { id: gallery_id } });
        if (!gallery) {
            return res.status(401).json({ msg: "Gallery does not exist" });
        }

        // Check if user created or public
        const { userId } = req;
        const { createdUser, is_public } = gallery;
        if (is_public === 0 && userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }

        // Check if photo in gallery
        const photo = await Photo.findOne({ where: { id: photo_id } });
        if (!photo || photo.gallery_id != gallery_id) {
            return res.status(401).json({ msg: "Photo not in gallery" });
        }

        // Check if person exists
        const person = await Person.findOne({ where: { id: person_id } });
        if (!person) {
            return res.status(401).json({ msg: "Person does not exist" });
        }

        // Check if tag already exists
        const tag = await Tag.findOne({
            where: {
                photo_id,
                person_id,
                deleted: 0
            }
        });
        if (tag) {
            return res.status(401).json({ msg: "Tag already exists" });
        }

        const tagFields = {
            photo_id,
            person_id,
            createdUser: userId,
            lastUser: userId
        };

        try {
            const tagPhoto = await Tag.create(tagFields);
            res.json(tagPhoto.dataValues);
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    }
);

// @route       POST api/gallery/removetag
// @description Remove tag
// @access      Private
router.post(
    "/removetag",
    [
        auth,
        check("gallery_id", "Gallery ID is required").not().isEmpty(),
        check("photo_id", "Photo ID is required").not().isEmpty(),
        check("person_id", "Person ID is required").not().isEmpty()
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if gallery exists
        const { gallery_id, photo_id, person_id } = req.body;
        const gallery = await Gallery.findOne({ where: { id: gallery_id } });
        if (!gallery) {
            return res.status(401).json({ msg: "Gallery does not exist" });
        }

        // Check if user created or public
        const { userId } = req;
        const { createdUser, is_public } = gallery;
        if (is_public === 0 && userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }

        // Check if photo in gallery
        const photo = await Photo.findOne({ where: { id: photo_id } });
        if (!photo || photo.gallery_id != gallery_id) {
            return res.status(401).json({ msg: "Photo not in gallery" });
        }

        // Check if person exists
        const person = await Person.findOne({ where: { id: person_id } });
        if (!person) {
            return res.status(401).json({ msg: "Person does not exist" });
        }

        // Find tag
        const tag = await Tag.findOne({
            where: {
                photo_id,
                person_id,
                deleted: 0
            }
        });
        if (!tag) {
            return res.status(401).json({ msg: "Tag not found" });
        }

        const tagFields = {
            lastUser: userId,
            deleted: 1
        };

        try {
            await Tag.update(tagFields, { where: { photo_id, person_id } });
            res.json(tag);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

// @route       POST api/gallery/gallerytags
// @description Get gallery tag data
// @access      Private
router.get("/gallerytags/:id", [auth], async (req, res) => {
    const gallery_id = req.params.id;
    try {
        const photosData = await Photo.findAll({ where: { gallery_id, deleted: 0 } });
        const peopleData = await Person.findAll({ where: { deleted: 0 }, order: [["updatedAt", "DESC"]] });
        const [results] = await sequelize.query(`
                SELECT 
                * 
                FROM famgram.tags 
                WHERE photo_id IN(
                    SELECT 
                    id 
                    FROM famgram.photos 
                    WHERE gallery_id = ${gallery_id}
                    AND deleted = 0
                )
                AND deleted = 0
            `);
        res.json({ photos: photosData, people: peopleData, tags: results });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// @route       Delete api/gallery/delete/:id
// @description Delete gallery
// @access      Private
router.delete("/delete/:id", [auth], async (req, res) => {
    const userId = req.userId;
    const gallery_id = req.params.id;
    try {
        const gallery = await Gallery.findOne({ where: { id: gallery_id, deleted: 0 } });
        const { createdUser } = gallery;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "This gallery is private" });
        }
        const galleryFields = {
            lastUser: userId,
            deleted: 1
        };
        await Gallery.update(galleryFields, { where: { id: gallery_id } });
        res.json({ id: gallery_id });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
