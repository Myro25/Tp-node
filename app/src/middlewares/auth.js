const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    if(!token){
        res.status(403).json({ message : 'Token manquant'})
    }

    try{
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next()
    }
    catch(err){
        res.status(403).json({ error: 'Token invalide' });
    }
}