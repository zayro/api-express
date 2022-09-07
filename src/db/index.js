import knex from 'knex'
import config from '../config/config'

const connectionDefault = knex(config.db_mysql)

const connection = (db) => {
  try {
    const connect = {
      connection: {}
    }
    connect.client = `${process.env.db_client}`
    connect.debug = `${process.env.db_debug}`
    connect.pool = { min: 0, max: 10 }
    connect.connection.host = `${process.env.db_host}`
    connect.connection.port = `${process.env.db_port}`
    connect.connection.user = `${process.env.db_user}`
    connect.connection.password = `${process.env.db_password}`
    connect.connection.database = db
    return knex(connect)
  } catch (error) {
    console.log('-----------------------')
    console.log(error)
  }
}

export { connectionDefault, connection }
