const router = require('express').Router()
const artist = require("controller/artist.controller")

// artist routes
router  
  .post('/', artist.create)
  .post('/import-csv', artist.uploadCsv, artist.importCsv)
  .patch('/:id', artist.update)
  .get('/', artist.get)
  .get('/:id', artist.getById)
  .delete('/:id', artist.remove)

module.exports = router;