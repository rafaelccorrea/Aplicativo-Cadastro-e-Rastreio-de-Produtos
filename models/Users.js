const { static } = require('express')
const Sequelize = require('sequelize')
const Connection = require('../database/database')
const Tracking = require('./Tracking')

const Users = Connection.define('Users', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Fazendo Relacionamento de Tabelas

const { Model } =require('sequelize');
module.exports = (sequelize, DataTypes)=>{
    class Users extends Model {
        static associate(){
         Users.hasMany(Tracking)
        }
    }
}

module.exports = Users