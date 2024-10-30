const { DataTypes } = require('sequelize')
const sequelize = require('sequelize')
const User = require('./User.model')

const File = sequelize.define('File', {
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.INTEGER,
    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    metadata: DataTypes.JSON,
})

File.belongsTo(User, { foreignKey: 'user_id' })

module.exports = File