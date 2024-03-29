import express from 'express'

// valiables de entorno
import dotenv from 'dotenv'

import cacheRedis from 'express-redis-cache'

import * as fileControlller from '../controllers/files'

import * as queryControlller from '../controllers/query'

import { message } from '../utils/tools'

dotenv.config()

const api = express()
const cache = cacheRedis()

cache.on('connected', function () {
  console.log('Connected to Redis'.green)
})

cache.on('disconnected', function () {
  console.log('disconnected to Redis'.yellow)
})

cache.on('error', function (error) {
  throw new Error('Cache conexion error!', error)
})

api.get(
  '/cache/query/user',
  cache.route({
    type: 'json',
    expire: 120
  }),
  async (req, res) => {
    const data = await queryControlller.queryUsersView()

    if (data) {
      return res.status(200).send(message(true, 'respuesta exitosa', data))
    } else {
      return res.status(200).send(message(false, 'no se encontraron registros'))
    }
  }
)

api.get(
  '/cache/folder',
  cache.route({
    type: 'json',
    expire: 120
  }),
  fileControlller.getFolder
)

export { api as default }
