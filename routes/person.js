const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
require("dotenv").config();

const { Person } = require("../sequelize");

// @route       GET api/person/all
// @description Get people
// @access      Private
router.get("/all", [auth], async (req, res) => {
    try {
        const peopleData = await Person.findAll({ where: { deleted: 0 }, order: [["updatedAt", "DESC"]] });
        res.json(peopleData);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// @route       GET api/person/:id
// @description Get one person
// @access      Private
router.get("/one/:id", [auth], async (req, res) => {
    const userId = req.userId;
    const person_id = req.params.id;
    try {
        const person = await Person.findOne({ where: { id: person_id, deleted: 0 } });
        const { createdUser } = person;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "This person was not made by you" });
        }
        res.json(person);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// @route       POST api/person/add
// @description Add person
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
        const { userId } = req;
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

// @route       POST api/person/edit
// @description Edit person
// @access      Private
router.post(
    "/edit",
    [
        auth,
        check("person_id", "ID required").not().isEmpty(),
        check("first_name", "First name must be between 1 and 42 characters").isLength({ min: 1, max: 42 }),
        check("last_name", "Last name must be between 1 and 42 characters").isLength({ min: 1, max: 42 })
    ],
    async (req, res) => {
        // Check inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check if exists and permission
        const { person_id, first_name, middle_name, last_name } = req.body;
        const person = await Person.findOne({ where: { id: person_id } });
        if (!person) {
            return res.status(401).json({ msg: "Person does not exist" });
        }
        // Check if user created
        const { userId } = req;
        const { createdUser } = person;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "You did not create this person" });
        }
        const personFields = {
            first_name,
            middle_name,
            last_name,
            lastUser: userId
        };
        try {
            let updatedPerson = await Person.update(personFields, { where: { id: person_id } });
            updatedPerson = await Person.findOne({ where: { id: person_id } });
            res.json(updatedPerson);
        } catch (error) {
            res.status(500).send("Server Error");
        }
    }
);

// @route       Delete api/person/delete/:id
// @description Delete person
// @access      Private
router.delete("/delete/:id", [auth], async (req, res) => {
    const { userId } = req;
    const person_id = req.params.id;
    try {
        const person = await Person.findOne({ where: { id: person_id, deleted: 0 } });
        const { createdUser } = person;
        if (userId !== createdUser) {
            return res.status(401).json({ msg: "You did not create this person" });
        }
        const personFields = {
            lastUser: userId,
            deleted: 1
        };
        await Person.update(personFields, { where: { id: person_id } });
        res.json({ id: person_id });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
