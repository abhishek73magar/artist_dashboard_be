const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('libs/config')
const { resources } = require('middleware/permission')

const _genJwtToken = (user, expiresIn='1d') => {
  const permission = resources[user.role] ?? null
  const payload = {
      id: user.id, 
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      dob: user.dob,  
      created_at: user.created_at,
      permission: permission
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn })
    return { token }
}

const _jwtVerify = (token) => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, SECRET_KEY, (err, decode) => {
      if(err) return reject("Authorization Token expired")
      return resolve(decode)
    })
  })
}

module.exports = { _genJwtToken, _jwtVerify }