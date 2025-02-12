const DbModel = require("classes/DbModel");

class Artist extends DbModel {
  constructor(tablename){
    super(tablename)
    this.tablename = tablename
  }

}

const aritst = new Artist('artist')
module.exports = {
  create: aritst.insert,
  update: aritst.update,
  get: aritst.pagination,
  getById: aritst.getByCol,
  remove: aritst.remove
}