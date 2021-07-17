import express from "express"

const api = express()

const authController = require("../controllers/auth")

api.post("/login", authController.login)

export { api as default }
