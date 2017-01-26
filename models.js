var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:25884447@monos.cyt30p97bce6.ap-northeast-2.rds.amazonaws.com/bbtan');

var Site = sequelize.define('site', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    host: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
