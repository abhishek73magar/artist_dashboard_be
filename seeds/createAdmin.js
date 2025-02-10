/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { _passwordHash } = require("../src/utils/_passwordHash");

const payload = {
  first_name: "Super",
  last_name: "Admin",
  email: "admin@email.com",
  password: "admin123",
  dob: null,
  phone: "",
  role: "super_admin",
  address: "",
  gender: "m",
}
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const [user] = await knex('users').where({ role: "super_admin" })
  if(user) throw new Error("Super admin already exist")
  Object.assign(payload, { password: _passwordHash(payload.password) })
  await knex('users').insert(payload)
};

// npx knex seed:run --specific=createAdmin.js