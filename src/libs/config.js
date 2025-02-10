require('dotenv').config()
module.exports = {
  PORT: process.env.PORT || 5001,
  DB_URI: process.env.DB_URI,
  SECRET_KEY: process.env.SECRET_KEY ?? 'N8*5Uhuk]|5gN]k'
}