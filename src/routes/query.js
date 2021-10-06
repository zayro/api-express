import express from "express"
import { message } from "../utils/tools"

import * as queryControlller from "../controllers/query"

// valiables de entorno
import dotenv from "dotenv"

dotenv.config()

const api = express()

api.get("/query/user", async (req, res) => {
  const data = await queryControlller.query_users_view()

  if (data) {
    return res.status(200).send(message(true, "respuesta exitosa", data))
  } else {
    return res.status(200).send(message(false, "no se encontraron registros"))
  }
})

export { api as query }
