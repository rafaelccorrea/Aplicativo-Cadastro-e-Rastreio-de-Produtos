const Sequelize = require('sequelize')

const Connection = new Sequelize('rastreiomax', 'root', '21052014',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = Connection;