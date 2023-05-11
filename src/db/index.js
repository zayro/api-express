import knex from 'knex'

const connection = (db) => {
  try {
    const connect = {
      connection: {}
    }
    connect.client = `${process.env.db_client}`
    connect.debug = `${process.env.db_debug}`
    connect.pool = { min: 0, max: 10 }
    connect.connection = `${process.env.DATABASE_URL}`

    connect.log = {
      warn (message) {
        console.warn('Database conexion warn!', message)
      },
      error (message) {
        throw new Error('Database conexion error!', message)
      },
      deprecate (message) {
        throw new Error('Database conexion deprecate!', message)
      },
      debug (message) {
        console.info('Database conexion debug!', message)
      }
    }
    return knex(connect)
  } catch (error) {
    console.log('-----------------------')
    console.log(error)
  }
}

export { connection }
