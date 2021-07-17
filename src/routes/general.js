import express from "express"

import jwt from "express-jwt"

import permission from "express-jwt-permissions"

import * as generalControlller from "../controllers/general"

import { check, body, validationResult } from "express-validator"

// valiables de entorno
import dotenv from "dotenv"

dotenv.config()

const api = express()

const guard = permission()

const secret = {
  secret: process.env.TOKENSECRET,
  algorithms: ["HS256"],
}

//api.use(jwt(secret));

api.get("/general/select/:table", generalControlller.getAll)

api.post(
  "/general/search",
  check("from").notEmpty(),
  check("fields").notEmpty(),
  guard.check(["admin"]),
  generalControlller.search
)

export { api as general }
