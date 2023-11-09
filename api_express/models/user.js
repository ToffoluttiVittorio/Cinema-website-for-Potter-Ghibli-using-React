const {DataTypes} = require('sequelize')
const DB = require('../db.config')

const User = DB.define('User', {
    id: {
        type:DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },

    }, 
    { paranoid : true})

const Ticket = DB.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categorie: {
        type: DataTypes.STRING(100),
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    numeroSeance: {
        type: DataTypes.STRING(100),

    },
    numeroSiege: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 59,
        },
    },
    userId: {
        type: DataTypes.INTEGER,

    },
});
    
module.exports = {
    User: User,
    Ticket: Ticket
};
