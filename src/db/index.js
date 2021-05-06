import knex from 'knex'
import config from '../config/config'

import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);


const connection_default = knex(config.db_mysql);

const connection = (db = 'auth') => {
    let connect = {
        connection: {}
    };
    connect.client = env.db_client;
    connect.debug = env.db_debug;
    connect.connection.host = env.db_host;
    connect.connection.port = env.db_port;
    connect.connection.user = env.db_user;
    connect.connection.password = env.db_password;
    connect.connection.database = db;
    return knex(connect);
}

export {
    connection_default,
    connection
};