const { DB_URI } = require('libs/config');

const knex = require('knex')({
  client: 'pg',
  connection: DB_URI
})

knex.raw('SELECT 1').then(() => console.log(`Database connected`)).catch((error) => console.log(`[DB] ${error.message ?? error} \n ${DB_URI}`))
module.exports = knex;