import knex from 'knex'
import config from '../config/config'

const connectionDefault = knex(config.db_mysql)

const connection = (db) => {
  try {
    const connect = {
      connection: {}
    }
    connect.client = `${process.env.db_client}`
    connect.debug = false
    connect.pool = { min: 0, max: 10 }
    connect.connection.host = `${process.env.db_host}`
    connect.connection.port = `${process.env.db_port}`
    connect.connection.user = `${process.env.db_user}`
    connect.connection.password = `${process.env.db_password}`
    connect.connection.database = db
    connect.log = {
      warn (message) {
        throw new Error('Database conexion warn!', message)
      },
      error (message) {
        throw new Error('Database conexion error!', message)
      },
      deprecate (message) {
        throw new Error('Database conexion deprecate!', message)
      },
      debug (message) {
        throw new Error('Database conexion debug!', message)
      }
    }
    return knex(connect)
  } catch (error) {
    console.log('-----------------------')
    console.log(error)
  }
}

export { connectionDefault, connection }
