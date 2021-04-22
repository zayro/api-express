const knex = require('knex');
const config = require('../config/config')

const connection_defalt = knex(config.db_mysql);
const connection = (connect) => {
    return knex(connect);
}

export {
    connection_defalt,
    connection
};