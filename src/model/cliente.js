// the connection!
import { connection } from '../db/index.js'

const knex = connection({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'zayro',
    database: 'auth'
  },
  debug: false,
  pool: { min: 0, max: 10 }
})

module.exports = {
  async select () {
    // return knex('sticker');
    return await knex.select('*').from('users')
  },
  async search (id) {
    // return knex('users').where('id_users', id).first();
    return await knex
      .select('*')
      .from('users')
      .where('id_users', id)
      .first()
  },
  insert (data) {
    return knex('users').insert(data, '*')
  },
  update (id, data) {
    return knex('users').where('id_users', id).update(data, '*')
  },
  delete (id) {
    return knex('users').where('id_users', id).del()
  }
}
