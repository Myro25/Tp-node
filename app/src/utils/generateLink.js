const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (fileId, UserId) => {
    return jwt.sign({ fileId, UserId }, config.secret, { expiresIn: "1h" })
}

