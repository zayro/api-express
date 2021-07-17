import express from "express"

// valiables de entorno
import dotenv from "dotenv"

import cacheRedis from "express-redis-cache"

import * as fileControlller from "../controllers/files"

const cache = cacheRedis()

dotenv.config()

const api = express()

api.get(
  "/general/folder/cache",
  cache.route({
    type: "json",
    expire: 60,
  }),
  fileControlller.getFolder
)

api.get("/general/folder", fileControlller.getFolder)

export { api as default }
