const { _jwtVerify } = require("utils/_jwtToken")
const openAccess = ['/signup', '/login']
const auth = async(req, res, next) => {
  try {
    if(openAccess.includes(req.url)) return next(); // for public

    const auth_token = req.headers.authorization.split(' ').at(-1)
    const decode = await _jwtVerify(auth_token)
    req.user = decode
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User"})
  }
}

module.exports = { auth }