import express from 'express'
import cors from 'cors'

const api = express()

const authController = require('../controllers/auth')

api.post('/login', cors(), authController.login)
api.post('/new/user', cors(), authController.createUser)

export { api as default }
