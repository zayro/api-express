var fs = require('fs');

const knex = require('./index')

var sql = fs.readFileSync('./src/db/sql/access.sql').toString();
//console.log(sql.toString());
return knex.raw('DROP DATABASE IF EXISTS auth')
    .then(() => knex.raw('CREATE DATABASE auth'))
    .then(() => knex.raw(sql))