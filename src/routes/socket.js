import express from 'express'
import { message } from '../utils/tools'

// valiables de entorno
import dotenv from 'dotenv'

import { app } from '../main'

dotenv.config()

const api = express()

api.get('/socket/user', async (req, res) => {
  if (app.locals.users) {
    console.log('🚀 ~ api.get ~ users:', app.locals.users)
    return res.status(200).send(message(true, 'respuesta exitosa', app.locals.users))
  } else {
    return res.status(200).send(message(false, 'no se encontraron registros'))
  }
})

export { api as socket }
