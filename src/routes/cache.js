import express from 'express'

// valiables de entorno
import dotenv from 'dotenv'

import * as fileControlller from '../controllers/files'

import * as queryControlller from '../controllers/query'

import { message } from '../utils/tools'

import { createClient } from 'redis'

const cache = createClient()

cache.on('error', (err) => {
  console.log('error', err)
})

cache.on('connect', (err) => {
  if (err) throw err
  console.log('connect')
})

cache.on('ready', (err) => {
  if (err) throw err
  console.log('ready')
})

cache.on('end', (err) => {
  if (err) throw err
  console.log('end')
})

dotenv.config()

const api = express()
cache.connect()

api.get(
  '/cache/query/user',
  async (req, res) => {
    try {
      const dataCache = await cache.get('/cache/query/user')
      if (dataCache) {
        return res.status(200).send(message(true, 'respuesta exitosa from cache', JSON.parse(dataCache)))
      } else {
        const data = await queryControlller.queryUsersView()
        await cache.set('/cache/query/user', JSON.stringify(data.rows), {
          EX: 180,
          NX: true
        })
        return res.status(200).send(message(true, 'respuesta exitosa', data.rows))
      }
    } catch (err) {
      console.log('🚀 ~ err', err)
    }
  }
)

api.get(
  '/cache/folder',

  fileControlller.getFolder
)

export { api as default }
