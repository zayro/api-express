import express from 'express'
import { message } from '../utils/tools'

import * as queryControlller from '../controllers/query'

// valiables de entorno
import dotenv from 'dotenv'

dotenv.config()

const api = express()

api.get('/query/user', async (req, res) => {
  const data = await queryControlller.queryUsersView()

  if (data) {
    return res.status(200).send(message(true, 'respuesta exitosa', data.rows))
  } else {
    return res.status(200).send(message(false, 'no se encontraron registros'))
  }
})

export { api as query }
