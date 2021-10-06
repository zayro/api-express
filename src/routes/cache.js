import express from "express"

// valiables de entorno
import dotenv from "dotenv"

import cacheRedis from "express-redis-cache"

import * as fileControlller from "../controllers/files"

import * as queryControlller from "../controllers/query"

import { message } from "../utils/tools"

dotenv.config()

const api = express()
const cache = cacheRedis()

api.get(
  "/cache/query/user",
  cache.route({
    type: "json",
    expire: 60,
  }),
  async (req, res) => {
    const data = await queryControlller.query_users_view()

    if (data) {
      return res.status(200).send(message(true, "respuesta exitosa", data))
    } else {
      return res.status(200).send(message(false, "no se encontraron registros"))
    }
  }
)

api.get(
  "/cache/folder",
  cache.route({
    type: "json",
    expire: 120,
  }),
  fileControlller.getFolder
)

export { api as default }
