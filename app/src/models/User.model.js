const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const User = sequelize.define(User, {
    username:{ type: DataTypes.STRING, unique: true},
    email:{ type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING},
    quota: { type: DataTypes.INTEGER, defaultValue: 2147483648 },
}) 

module.exports = User