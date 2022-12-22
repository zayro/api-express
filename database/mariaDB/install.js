const fs = require('fs')

const knex = require('../src/db/index')

const sql = fs.readFileSync('./src/db/sql/access.sql').toString()

// console.log(sql.toString());
knex
  .raw('DROP DATABASE IF EXISTS auth')
  .then(() => knex.raw('CREATE DATABASE auth'))
  .then(() => knex.raw(sql))
