/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const createEnum = (knex, name, options) => {
  return knex.raw(`CREATE TYPE ${name} AS ENUM (${options.map(n => `'${n}'`).join(',')})`)
}

const removeEnum = (knex, enums) => {
  return Promise.all(enums.map((name) => knex.raw(`DROP TYPE ${name}`)))
}

exports.up = async function(knex) {
  // create users table
  await createEnum(knex, '_gender', ['m', 'f', 'o']) // creating _gender enum types
  await createEnum(knex, '_role', ['super_admin', 'artist_manager', 'artist']) // creating _gender enum types
  await createEnum(knex, '_genre', ['rnb', 'country', 'classic', 'rock', 'jazz'])

  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary()
    table.string('first_name', 255)
    table.string('last_name', 255)
    table.string('email', 255).unique()
    table.string('password', 255)
    table.string('phone', 255)
    table.date('dob')
    table.string('address', 255)
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('created time in UTC')
    table.timestamp('updated_at')

    table.enu('gender', null, {
      useNative: true,
      existingType: true,
      enumName: "_gender",
      schemaName: "public"
    }).comment('_gender enum type must be created \n [m,f,o] \n m = male \n f = female \n o = others')
    table.enu('role', null, {
      useNative: true,
      existingType: true,
      enumName: "_role",
      schemaName: "public"
    }).defaultTo('artist').comment('_role enum type must be created \n [super_admin, artist_manager, artist]')
  })

  await knex.schema.createTable('artist', (table) => {
    table.bigIncrements('id').primary()
    table.string('name', 255)
    table.date('dob')
    table.enu('gender', null, {
      useNative: true,
      existingType: true,
      enumName: "_gender",
      schemaName: "public"
    }).comment('_gender enum type must be created \n [m,f,o] \n m = male \n f = female \n o = others')
    table.string('address', 255)
    table.integer('no_of_albums_released').comment('may be required trigger function')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at')

  })

  await knex.schema.createTable('music', (table) => {
    table.bigIncrements('id').primary()
    table.integer('artist_id')
    table.string('title', 255)
    table.string('album_name', 255)
    table.enu('genre', null, {
        useNative: true,
        existingType: true,
        enumName: "_genre",
        schemaName: "public"
    }).comment('_genre enum type must be created \n [rnb, country, classic, rock, jazz]')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at')

    table.foreign('artist_id').references('id').inTable('artist').onUpdate('CASCADE').onDelete('CASCADE') // CASCADE FOR IF ARTIST IS DELETED ALL ARTIST MUSIC MUST BE DELETED AUTOMATICALLY

  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('music')
  await knex.schema.dropTableIfExists('artist')
  await removeEnum(knex, ['_gender', '_role', '_genre'])

};
