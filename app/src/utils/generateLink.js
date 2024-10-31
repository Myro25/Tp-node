const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const config2 = require('../config');

module.exports = (fileId, UserId) => {
    return jwt.sign({ fileId, UserId }, config2.secret, { expiresIn: "1h" })
}

