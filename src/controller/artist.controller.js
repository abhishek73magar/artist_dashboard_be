const { fileUpload, csvFilter } = require('libs/fileUpload')
const artist = require('model/artist.model')
const multer = require('multer')

const uploadCsv = multer({
  storage: fileUpload('public/csv'),
  fileFilter: csvFilter,
}).single('csv-file')

const create = (req, res, next) => {
  return artist.create(req.body)
    .then((json) => res.status(201).json(json))
    .catch(next)
}

const update = (req, res, next) => {
  return artist.update(req.body, req.params.id, true) // add updated_at datetime
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const get = (req, res, next) => {
  return artist.get(req.query.pagenumber, req.query.limit)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const getById = (req, res, next) => {
  return artist.getById(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const remove = (req, res, next) => {
  return artist.remove(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const importCsv = (req, res, next) => {
  return artist.importCsv(req.file)
    .then(json => res.status(200).json(json))
    .catch(next)
}


module.exports = { create, update, get, getById, remove, uploadCsv, importCsv }