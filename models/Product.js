const Sequelize = require('sequelize')
const Connection = require('../database/database')
const Tracking = require('./Tracking')

const Product = Connection.define('Product', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TrackingId:{
        type: Sequelize.INTEGER
        },
})

//Fazendo Relacionamento de Tabelas

const { Model } =require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class Product extends Model {
        static associate(){
            Product.belongsTo(Tracking)
        }
    }
}


module.exports = Product