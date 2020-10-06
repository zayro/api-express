 // the connection!
const knex = require('../db')

module.exports = {
  async select() {
    //return knex('sticker');
    return await knex.select('*').from('cliente');
  },
  async search(id) {
    //return knex('cliente').where('id_cliente', id).first();
    return await knex.select('*').from('cliente').where('id_cliente', id).first();
  },
  insert(data) {
    return knex('cliente').insert(data, '*');
  },
  update(id, data) {
    return knex('cliente').where('id_cliente', id).update(data, '*');
  },
  delete(id) {
    return knex('cliente').where('id_cliente', id).del();
  }
}