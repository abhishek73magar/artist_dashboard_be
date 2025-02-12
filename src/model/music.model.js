const DbModel = require("classes/DbModel");
const knex = require('libs/knex')

class Music extends DbModel {
  constructor(tablename){
    super(tablename)
    this.tablename = tablename
  }

  _get = async(pagenumber=1, limit=30) => {
    try {
      const { rows: [{ count }] } = await knex.raw(`SELECT count(*) FROM ${this.tablename}`)
      const totalpage = Math.ceil(count / limit)
      const offset = (pagenumber * limit) - limit
      
      const sql = `SELECT m.*, art.name as artist_name FROM ${this.tablename} m LEFT JOIN artist art ON art.id=m.artist_id ORDER BY m.id DESC LIMIT ? OFFSET ?`
      const { rows: data } = await knex.raw(sql, [limit, offset])
      return { data, totalpage, pagenumber }
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

const music = new Music('music')
module.exports = {
  create: music.insert,
  update: music.update,
  get: music._get,
  getById: music.getByCol,
  remove: music.remove
}