import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//requiring path and fs modules
const path = require("path")
const fs = require("fs")

// valiables de entorno
const dotenv = require("dotenv")
const { throws } = require("assert")
dotenv.config()

const encrypt = (data) => {
  return bcrypt.hashSync(data, 10)
}

const compareEncryptedData = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const message = (status, mensaje, response) => {
  const data = {}
  data.status = status
  data.data = response
  data.message = mensaje

  return data
}

const CreateToken = (data, time) => {
  const secret = `${process.env.TOKENSECRET}`
  console.log(`🚀 ~ file: tools.js ~ line 32 ~ CreateToken ~ secret`, secret)

  try {
    if (time !== "" || typeof time !== "undefined") {
      return jwt.sign(data, secret, {
        algorithm: "HS256",
        expiresIn: time,
      })
    }

    return jwt.sign({ data }, secret)
  } catch (err) {
    throw err
  }
}

const checkToken = (tokens) => {
  const secret = `${process.env.TOKENSECRET}`

  try {
    return jwt.verify(tokens, secret) !== "undefined"
  } catch (err) {
    throw err
  }
}

const parseDataKnex = (data) => {
  const info = JSON.parse(JSON.stringify(data))
  if (info.isArray || typeof info === "object") {
    return info[0]
  } else {
    console.log("*** parseDataKnex ****", typeof info)
    return false
  }
}

export { CreateToken, checkToken, message, encrypt, compareEncryptedData, parseDataKnex }

export { getFiles, getAllFiles, getAllFilesObject, getAllFilesObjectPromise } from "./files"
