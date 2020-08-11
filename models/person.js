module.exports = (sequelize, type) => {
    return sequelize.define("person", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                len: [1, 42]
            }
        },
        middle_name: {
            type: type.STRING,
            allowNull: true,
            validate: {
                len: [0, 42]
            }
        },
        last_name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                len: [1, 42]
            }
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
