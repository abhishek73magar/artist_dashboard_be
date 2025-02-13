const router = require('express').Router()
const user = require('controller/user.controller')


const permission = require('middleware/permission')

// user routes
router
  .post('/login', user.login)
  .post('/signup', user.signup)
  // .post('/user')

router
  .get('/user/profile', user.profile)
  .get('/user/verify', user.verify)
  .patch('/user/profile', user.updateProfile)
  
router.use('/user', permission.user, require('./user.route'))
router.use('/artist', permission.artist, require('./artist.route'))
router.use('/music', permission.music, require('./music.route'))

module.exports = router