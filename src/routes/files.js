import express from 'express'

// valiables de entorno
import dotenv from 'dotenv'

import * as fileControlller from '../controllers/files'

dotenv.config()

const api = express()

api.get('/general/folder', fileControlller.getFolder)

api.get('/general/getFolderAll', fileControlller.getFolderAll)

export { api as default }
