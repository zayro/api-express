import express from 'express'

// valiables de entorno
import dotenv from 'dotenv'

import * as fileControlller from '../controllers/files'

import * as queryControlller from '../controllers/query'

import { message } from '../utils/tools'

import { createClient } from 'redis'

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', err => console.log('Redis Client Error', err));

client.on('error', (err) => {
  console.log('error', err)
})

client.on('connect', (err) => {
  if (err) throw err
  console.log('connect')
})

client.on('ready', (err) => {
  if (err) throw err
  console.log('ready')
})

client.on('end', (err) => {
  if (err) throw err
  console.log('end')
})

dotenv.config()

const api = express()
client.connect()

api.get(
  '/client/query/user',
  async (req, res) => {
    try {
      const dataCache = await client.get('/client/query/user')
      if (dataCache) {
        return res.status(200).send(message(true, 'respuesta exitosa from client', JSON.parse(dataCache)))
      } else {
        const data = await queryControlller.queryUsersView()
        await client.set('/client/query/user', JSON.stringify(data.rows), {
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
  '/client/folder',

  fileControlller.getFolder
)

export { api as default }
