const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

module.exports = function (req, res, next) {
    // Get token
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        // Check if verified by admin
        if (!decoded.isAuth) {
            return res.status(401).json({ msg: "Your account has not been verified by the admin" });
        }
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
