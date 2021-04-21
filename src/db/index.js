const knex = require('knex');
const config = require('../config/config')

const connection = knex(config.db);

module.exports = connection;