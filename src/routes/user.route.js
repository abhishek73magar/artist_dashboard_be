const router = require('express').Router()
const user = require('controller/user.controller')

router
  .post('/', user.create)
  .patch('/:id', user.update)
  .get('/', user.get)
  .get('/verify')
  .get('/:id', user.getById)
  .delete('/:id', user.remove)


module.exports = router;