const { Sequelize } = require('sequelize')
const config = require('./config')

console.log(config)

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mariadb',
})

module.exports = sequelize