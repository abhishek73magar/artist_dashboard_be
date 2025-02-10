const router = require('express').Router()
const music = require('controller/music.controller')

// music routes
router
  .post('/', music.create)
  .patch('/:id', music.update)
  .get('/', music.get)
  .get('/:id', music.getById)
  .delete('/:id', music.remove)

module.exports = router