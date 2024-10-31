const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '')
    if (!token) {
        console.log("auth error: ", req.headers['authorization'])
        res.status(403).json({ message: 'Token manquant' })
    }

    try {
        console.log(token)
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next()
    }
    catch (err) {
        console.log(err)
        res.status(403).json({ error: 'Token invalide' });
    }
}