const music = require('model/music.model')

const create = (req, res, next) => {
  return music.create(req.body)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const update = (req, res, next) => {
  return music.update(req.body, req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const get = (req, res, next) => {
  return music.get()
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const getById = (req, res, next) => {
  return music.getById(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const remove = (req, res, next) => {
  return music.remove(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}


module.exports = { create, update, get, getById, remove }