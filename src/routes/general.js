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
  [check("insert").exists(), check("values").notEmpty()],
  jwt(secret),
  guard.check(["admin"]),
  generalControlller.save
)

api.post(
  "/general/insertIncrement",
  [check("insert").exists(), check("values").notEmpty()],
  jwt(secret),
  guard.check(["admin"]),
  generalControlller.saveAutoIncrement
)

api.put(
  "/general/update",
  [check("update").exists(), check("set").notEmpty()],
  jwt(secret),
  guard.check(["admin"]),
  generalControlller.update
)

api.delete(
  "/general/delete",
  check("condition").not().isEmpty(),
  jwt(secret),
  guard.check(["admin"]),
  generalControlller.destroy
)

export { api as general }
