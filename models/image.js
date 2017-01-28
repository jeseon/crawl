module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        underscored: true,
        classMethods: {
            associate: function(models) {
                Image.belongsTo(models.Post);
            }
        }
    });

    return Image;
};
