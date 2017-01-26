"use strict";

module.exports = function(sequelize, DataTypes) {
    var Site = sequelize.define('site', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        host: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Site;
};
