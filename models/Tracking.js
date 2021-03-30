const Sequelize = require('sequelize')
const Connection = require('../database/database')
const Users = require('./Users')
const Product = require('./Product')

const Tracking = Connection.define('Tracking', {
    local:{
        type: Sequelize.STRING,
    },
    
    Codigo:{
        type: Sequelize.STRING,
    },

    userId:{
        type: Sequelize.INTEGER,
    }
})

//Fazendo Relacionamento de Tabelas

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class Tracking extends Model {
        static associate(){
            Tracking.belongsTo(Users)
            Tracking.hasMany(Product)
        }
    }
}

module.exports = Tracking