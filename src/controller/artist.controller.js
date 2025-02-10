const artist = require('model/artist.model')

const create = (req, res, next) => {
  return artist.create(req.body)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const update = (req, res, next) => {
  return artist.update(req.body, req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const get = (req, res, next) => {
  return artist.get()
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


module.exports = { create, update, get, getById, remove }