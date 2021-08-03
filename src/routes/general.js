import express from "express"

import jwt from "express-jwt"

import permission from "express-jwt-permissions"

import * as generalControlller from "../controllers/general"

import { check, oneOf, body, validationResult } from "express-validator"

const dotenv = require("dotenv")

dotenv.config()

const api = express()

const guard = permission()

const secret = {
  secret: `${process.env.TOKENSECRET}`,
  algorithms: ["HS256"],
}

// security Extreme
//api.use(jwt(secret))

api.get("/general/select/:table", generalControlller.getAll)

api.post(
  "/general/search",
  check("from").notEmpty(),
  check("fields").notEmpty(),
  guard.check(["admin"]),
  generalControlller.search
)

api.post(
  "/general/insert",
  [check("insert").exists(), check("values").exists()],
  jwt(secret),
  guard.check(["admin"]),
  generalControlller.save
)

export { api as general }
