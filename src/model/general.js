 // the connection!
const knex = require('../db')

module.exports = {
  async max(table, id) {
    //return knex('sticker');
    let data = await knex(table).max(id);
    return data[0].max + 1;
  }

}