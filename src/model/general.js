// the connection!
// const this.knex = require('../db')

import { connection } from "../db/index.js"

//const knex = connection("demo")

class conectar {
  constructor(db) {
    this.knex = connection(db)
  }

  async max(table, id) {
    let data = await this.knex(table).max(id)
    return data[0].max + 1
  }

  async select(table) {
    //return this.knex('sticker');
    return await this.knex.select("*").from(table)
  }

  async search(field, table, condition = {}) {
    //return this.knex('users').where('id_users', id).first();
    return await this.knex.select(field).from(table).where(condition)
  }

  async insert(table, data) {
    return this.knex(table).insert(data)
  }

  async insert_increment(table, data, increment) {
    let id = await this.knex(table).max(increment)
    id = id[0].max + 1
    data[increment] = id

    return this.knex(table).insert(data)
  }

  async update(table, condition, data) {
    return await this.knex(table).where(condition).update(data)
  }

  async delete(table, condition) {
    return this.knex(table).where(condition).del()
  }

  async raw(sql, param) {
    return await this.knex.raw(sql, param)
  }
}

export default conectar
