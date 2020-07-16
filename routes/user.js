const express = require("express");
const router = express.Router();

// @route       GET api/auth
// @description Get user
// @access      Public
router.get("/", async (req, res) => {
    res.send("test");
});

module.exports = router;
