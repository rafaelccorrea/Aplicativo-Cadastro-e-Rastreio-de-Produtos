const Sequelize = require('sequelize')
const Connection = require('../database/database')

const Token = Connection.define('Token', {
    token: Sequelize.STRING
})

module.exports = Token