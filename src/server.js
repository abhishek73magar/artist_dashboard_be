require('module-alias/register')
require('libs/knex') // initial database connection checking ...
const express = require('express')
const server = express()
const cors = require('cors')
const { PORT } = require('libs/config')
const HttpError = require('classes/HttpError')
const { auth } = require('middleware/auth')
const { permission } = require('middleware/permission')

server.use(cors())
server.use(express.json())

server.use(require('middleware/logs')) // routes logs
server.use('/api', auth, require('routes/main.route')) // all main routes


server.use((error, req, res, next) => {
  // global error handling
  // console.trace(error)
  if(error instanceof HttpError){
    return res.status(error.statusCode).json({ message: error.message })
  }
  return res.status(500).json({ message: error.message ?? error ?? "Internal Server Error" })
})
// server starting here
server.listen(PORT, () => console.log(`Server is running at ${PORT}`))