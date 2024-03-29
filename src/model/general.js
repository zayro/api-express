// the connection!
// const this.knex = require('../db')

import { connection } from '../db/index.js'

// const knex = connection("demo")

class Conectar {
  constructor (db) {
    try {
      this.knex = connection(db)
      // if (!this.knex.pool) throw new Error('Not connected')
    } catch (e) {
      throw new Error('Database conexion error!', e)// debug if needed
    }
  }

  async max (table, id) {
    const data = await this.knex(table).max(id)
    return data[0].max + 1
  }

  async select (table) {
    // return this.knex('sticker');
    const toStringQuery = this.knex.select('*').from(table).toString()
    console.log('🚀 ~ Conectar ~ select ~ toStringQuery', toStringQuery)

    return await this.knex.select('*').from(table)
  }

  async search (field, table, condition = {}, order = []) {
    // return this.knex('users').where('id_users', id).first();
    return await this.knex.select(field).from(table).where(condition).orderBy(order)
  }

  async insert (table, data) {
    return this.knex(table).insert(data)
  }

  async insertIncrement (table, data, increment) {
    let id = await this.knex(table).max(increment)
    id = id[0].max + 1
    data[increment] = id

    return this.knex(table).insert(data)
  }

  async update (table, condition, data) {
    return await this.knex(table).where(condition).update(data)
  }

  async delete (table, condition) {
    return this.knex(table).where(condition).del()
  }

  async raw (sql, param) {
    return await this.knex.raw(sql, param)
  }
}

export default Conectar
