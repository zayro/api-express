 // the connection!
 //const knex = require('../db')
 import {
     connection
 } from '../db/index.js';

 const knex = connection({
     client: 'mysql',
     connection: {
         host: '127.0.0.1',
         port: '3306',
         user: 'root',
         password: 'zayro',
         database: 'auth'
     },
     debug: true
 });

 module.exports = {
     async max(table, id) {
         let data = await knex(table).max(id);
         return data[0].max + 1;
     },

     async select(table) {
         //return knex('sticker');
         return await knex.select('*').from(table);
     },

     async search(field, table, condition) {
         //return knex('users').where('id_users', id).first();
         return await knex.select(field).from(table).where(condition)
     },

     async insert(table, data) {
         return knex(table).insert(data);
     },

     async insert_increment(table, data, increment) {
         let id = await knex(table).max(increment);
         id = id[0].max + 1;
         data[increment] = id

         return knex(table).insert(data);
     },

     async update(table, condition, data) {
         return knex(table).where(condition).update(data);
     },

     async delete(table, condition) {
         return knex(table).where(condition).del();
     }

 }