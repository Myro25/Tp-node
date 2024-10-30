require('dotenv').config()

module.exports = {
    db:{
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    },
    secret: process.env.SECRET,
}