module.exports = (sequelize, type) => {
    return sequelize.define("tag", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photo_id: {
            type: type.INTEGER,
            allowNull: false
        },
        person_id: {
            type: type.INTEGER,
            allowNull: false
        },
        deleted: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdUser: {
            type: type.STRING,
            allowNull: false
        },
        lastUser: {
            type: type.STRING,
            allowNull: false
        }
    });
};
