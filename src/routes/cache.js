import express from 'express'

import * as fileControlller from '../controllers/files'

import * as queryControlller from '../controllers/query'

import { message } from '../utils/tools'

import { clientRedisExpress } from '../main'

const api = express()

api.get(
  '/client/query/user',
  async (req, res) => {
    try {
      const dataCache = await clientRedisExpress.get('/client/query/user')
      if (dataCache) {
        const data = message(
          true,
          'respuesta exitosa from client',
          JSON.parse(dataCache)
        )
        data.cache = true
        await clientRedisExpress.quit()
        return res
          .status(200)
          .send(data
          )
      } else {
        const data = await queryControlller.queryUsersView()
        await clientRedisExpress.set('/client/query/user', JSON.stringify(data.rows), {
          EX: 180,
          NX: true
        })
        await clientRedisExpress.quit()

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
