const DbModel = require("classes/DbModel");
const HttpError = require("classes/HttpError");
const { _genJwtToken } = require("utils/_jwtToken");
const { _passwordHash, _compareHash } = require("utils/_passwordHash");

class UserModel extends DbModel {
  constructor(tablename){
    super(tablename)
    this.tablename = tablename
  }

  userUpdate = (payload, id, user) => {
    if(payload.hasOwnProperty('password')){
      if(payload.password === '') delete payload.password
      else Object.assign(payload, { password: _passwordHash(payload.password) })
    }
    if(payload.role === 'super_admin' && user.role !== 'super_admin') throw HttpError(403, "You cann't modify as super admin role")
    Object.assign(payload, { updated_at: new Date().toISOString() })
    return this.update(payload, id).then((res) => {
      delete res.password;
      return res;
    })
  }

  profileUpdate = (payload, id, user) => {
    if(payload && payload.hasOwnProperty("role")) delete payload.role
    return this.userUpdate(payload, id, user)
  }

  createUser = async(payload) => {
    try {
      const { email, password, role } = payload;
      if(!email || !password) throw new HttpError(500, 'Email and Password is required !!')
      // if(!role) throw new HttpError(500, "Role is required")
      if(role === 'super_admin') throw new HttpError(500, "You cann't assign super admin role")
      const is_exist = await this.getByCol(email, 'email')
      if(is_exist) throw new HttpError(409, 'User alredy exist !!') // conflict

      Object.assign(payload, { password: _passwordHash(password) }) // hash password
      const dd = await this.insert(payload)
      delete dd.password

      return dd
    } catch (error) {
      return Promise.reject(error)
    }
  }

  login = async(payload) => {
    try {
      const { email, password, stay } = payload;
      if(!email) throw new HttpError(401, "Email is required !!")

      const user = await this.getByCol(email, 'email')
      if(user){
        const password_check = _compareHash(password, user.password)
        if(password_check){
          return _genJwtToken(user, (stay ? '7d' : '1d'))
        }
      }
      throw new HttpError(401)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  signup = async(payload) => {
    try {
      Object.assign(payload, { role: 'artist' })
      const user = await this.createUser(payload)

      return _genJwtToken(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

const user = new UserModel('users')

module.exports = {
  create: user.createUser,
  update: user.userUpdate,
  get: user.pagination,
  getById: (...args) => user.getByCol(...args)
    .then(res => { 
      if(res) delete res.password; 
      return res; 
    }),
  remove: user.remove,
  pagination: user.pagination,
  updateProfile: user.profileUpdate,
  login: user.login,
  signup: user.signup,
}