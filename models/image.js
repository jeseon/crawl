var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: models.Post
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'image',
        underscored: true
    });

    return Image;
};
