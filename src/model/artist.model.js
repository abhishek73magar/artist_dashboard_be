const DbModel = require("classes/DbModel");

const aritst = new DbModel('artist')
module.exports = {
  create: aritst.insert,
  update: aritst.update,
  get: aritst.get,
  getById: aritst.getByCol,
  remove: aritst.remove
}