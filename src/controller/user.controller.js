const user = require('model/user.model')

const get = (req, res, next) => {
  return user.get()
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const getById = (req, res, next) => {
  return user.getById(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const update = (req, res, next) => {
  return user.update(req.body, req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const remove = (req, res, next) => {
  return user.remove(req.params.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const signup = (req, res, next) => {
  return user.signup(req.body)
    .then((json) => res.status(201).json(json))
    .catch(next)
}

const login = (req, res, next) => {
  return user.login(req.body)
    .then((json) => res.status(200).json(json))
    .catch(next)
}


const profile = (req, res, next) => {
  return user.getById(req.user.id)
    .then((json) => res.status(200).json(json))
    .catch(next)
}

const updateProfile = (req, res, next) => {
  return user.updateProfile(req.body, req.user.id)
    .then(json => res.status(200).json(json))
    .catch(next)
}

module.exports = { get, getById, update, remove, signup, login, profile, updateProfile }
