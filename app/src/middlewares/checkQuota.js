const User = require('../models/User.model')
const File = require('../models/File.model')
const { where } = require('sequelize')

module.exports = async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    const usedQuota = await File.sum('size', { where : {user_id : req.user.id}})

    if (usedQuota >= user.quota) {
        return res.status(400).json({ error: 'Quota dépassé' });
    }
    next();
}