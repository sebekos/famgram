const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const GalleryModel = require("./models/gallery");
const PersonModel = require("./models/person");
const dotenv = require("dotenv");
require("dotenv").config();

const sequelize = new Sequelize(process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.MYSQL_DATABASE_URL, {
    dialect: "mysql",
    logging: false,
    query: { raw: true }
});

const User = UserModel(sequelize, Sequelize);
const Gallery = GalleryModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);

try {
    sequelize.sync();
    console.log("MySQL Connected...");
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

module.exports = {
    User,
    Gallery,
    Person,
    sequelize
};
