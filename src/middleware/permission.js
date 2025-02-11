// user roles, super_admin, artist_manager, artist
const resources = {
  'artist_manager': { view: ['user', 'music'], edit: ['user', 'music'] },
  'artist': { view: ['music'], edit: ['music'] },
}

const permission = (req, resource_name) => {
  return new Promise((resolve, reject) => {
    const role = req.user.role;
    if(role === 'super_admin') return resolve()
    const resource = resources[role]
  // console.log(resource, role, resou)
    if(resource){
      let checkPermission = false
      switch(req.method){
        case "POST":
          checkPermission = resource.edit.includes(resource_name)
          break;
        case "PATCH":
          checkPermission = resource.edit.includes(resource_name)
          break;
        case "PUT":
          checkPermission = resource.edit.includes(resource_name)
          break;
        case "DELETE":
          checkPermission = resource.edit.includes(resource_name)
          break;
        case "GET":
          checkPermission = resource.view.includes(resource_name)
          break;
        default:
          checkPermission = false;
      }
      if(checkPermission) return resolve()
      return reject('Permission denied')
    }

    return reject('User role not found !!')
  })
}

const PermissionError = (res) => (err) => res.status(403).json({ message: err.message ?? err })

const user = (req, res, next) => permission(req, 'user').then(() => next()).catch(PermissionError(res))
const artist = (req, res, next) => permission(req, 'artist').then(() => next()).catch(PermissionError(res))
const music = (req, res, next) => permission(req, 'music').then(() => next()).catch(PermissionError(res))

module.exports = { user, artist, music, resources }
