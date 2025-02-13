const knex = require('libs/knex')

class DbModel {
  constructor(tablename){
    this.tablename = tablename
  }

   #_getKeyValues = (payload) => {
    const keys = Object.keys(payload)
    const values = Object.values(payload)
    return [keys, values]
  }


  insert = (payload) => {
    const [keys, values] = this.#_getKeyValues(payload)
    const sql = `INSERT INTO ${this.tablename} (${keys.join(',')}) VALUES (${keys.map(() => "?").join(',')}) RETURNING *`
    return knex.raw(sql, values).then(({ rows }) => rows[0] ?? null) // returnign first index
  }

  insertMultiple = (payload) => {
    if(!Array.isArray(payload) || payload.length === 0) throw new Error("Payload must be array and not empty")
    const keys = Object.keys(payload[0])
    const values = []
    const bindingValues = payload.map((item) => {
      const binding = keys.map((key) => {
        values.push(item[key])
        return '?'
      })
      return `(${binding.join(',')})`
    })
    // console.log(payload)
    const sql = `INSERT INTO ${this.tablename} (${keys.join(',')}) VALUES ${bindingValues.join(',')} RETURNING *`
    return knex.raw(sql, values).then(({ rows }) => rows);
  }

  update = (payload, id, status=false) => {
    if(status === true) Object.assign(payload, { updated_at: new Date().toISOString() })
    const [keys, values] = this.#_getKeyValues(payload)
    const sql = `UPDATE ${this.tablename} SET ${keys.map((k) => `${k}=?`).join(',')} WHERE id=? RETURNING *`
    return knex.raw(sql, values.concat(id)).then(({ rows }) => rows[0] ?? null)
  }

  get = (columns) => {
    const cols = Array.isArray(columns) ? columns.join(',') : '*'
    const sql = `SELECT ${cols} FROM  ${this.tablename} ORDER BY id`
    return knex.raw(sql).then(({ rows }) => rows)
  }

  getByCol = (value, key='id', columns) => {
    const cols = Array.isArray(columns) ? columns.join(',') : '*'
    const sql = `SELECT ${cols} FROM  ${this.tablename} WHERE ${key}=?`
    return knex.raw(sql, [value]).then(({ rows }) => rows[0] ?? null)
  }

  remove = (id) => {
    const sql = `DELETE FROM ${this.tablename} WHERE id=? RETURNING id`
    return knex.raw(sql, [id]).then(({ rows }) => rows[0] ?? null)
  }

  pagination = async(pagenumber=1, limit=30) => {
    try {
      const { rows: [{ count }] } = await knex.raw(`SELECT count(*) FROM ${this.tablename}`)
      const totalpage = Math.ceil(count / limit)
      const offset = (pagenumber * limit) - limit
      
      const sql = `SELECT * FROM ${this.tablename} ORDER BY id DESC LIMIT ? OFFSET ?`
      const { rows: data } = await knex.raw(sql, [limit, offset])
      return { data, totalpage, pagenumber }
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

module.exports = DbModel