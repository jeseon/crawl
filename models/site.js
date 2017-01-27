module.exports = function(sequelize, DataTypes) {
    var Site = sequelize.define('Site', {
        id: {
            type: DataTypes.INTEGER,
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
    }, {
        tableName: 'site',
        underscored: true
    });

    return Site;
};
