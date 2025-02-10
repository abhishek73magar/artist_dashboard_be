const bcrypt = require('bcrypt')

const _saltRound = 10;
const _passwordHash = (password) => {
  return bcrypt.hashSync(password, _saltRound)
}

const _compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { _passwordHash, _compareHash}