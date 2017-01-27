var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        site_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: models.Site
            }
        },
        no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'post',
        underscored: true
    });

    return Post;
};
