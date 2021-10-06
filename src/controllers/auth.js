import moment from "moment"
import dotenv from "dotenv"
import dotenvParseVariables from "dotenv-parse-variables"
import general from "../model/general"

let env = dotenv.config({})
if (env.error) throw env.error
env = dotenvParseVariables(env.parsed)

const connect = new general("auth")

const { compareEncryptedData, message, parseDataKnex, CreateToken } = require("../utils/tools")

const login = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  await connect
    .raw("Select * From users Where username = ? or email = ?", [username, password])
    .then(async (response) => {
      const resp = parseDataKnex(response)[0]

      // Debug
      if (env.debug) {
        console.log(`:rocket: ~ file: auth.js ~ line 19 ~ awaitgeneral.raw ~ resp`, resp)
      }

      if (resp.length == 0) {
        return res.status(401).json({
          message: "Email no Valid",
        })
      }

      try {
        // Debug
        if (env.debug) {
          console.log(`:rocket: ~ file: auth.js ~ line 42 ~ awaitgeneral.raw ~ password`, password)
          console.log(`:rocket: ~ file: auth.js ~ line 43 ~ awaitgeneral.raw ~ resp.password`, resp.password)
        }

        const validPass = compareEncryptedData(password, resp.password)
        if (!validPass) {
          return res.status(401).json({
            message: "Auth validPass failed",
          })
        }
      } catch (error) {
        console.log(`:rocket: ~ file: auth.js ~ line 41 ~ awaitgeneral.raw ~ error`, error)
        return res.status(500).json({
          message: "Error Auth Crypt failed",
          error: error,
        })
      }

      if (!resp) {
        return res.status(400).json(message(true, resp, "no se pudo encontrar registros"))
      } else {
        const menu = connect
          .raw("Select menu, link, icon From view_menu Where username = ?", [resp.username])
          .then((data) => parseDataKnex(data))

        const privileges = connect
          .raw("Select permission, name From view_privileges Where username = ?", [resp.username])
          .then((data) => JSON.parse(parseDataKnex(data)[0].permission))

        const information = connect
          .raw("Select * From view_information_users Where username = ?", [resp.username])
          .then((data) => parseDataKnex(data))

        let token = ""

        const payload = {}
        payload.sub = resp._id
        payload.iat = moment().unix()
        payload.menu = await menu
        payload.permissions = await privileges
        payload.information = await information

        //payload.exp: moment().add(1, "day").unix()

        console.log(`🚀 ~ file: auth.js ~ line 78 ~ .then ~ payload`, payload)

        const expiresIn = "1d"

        token = CreateToken(payload, expiresIn)

        let responseToken = {}
        responseToken.status = true
        responseToken.username = resp.username
        responseToken.email = resp.email
        responseToken.token = token
        //responseToken.menu = await menu;
        //responseToken.privileges = await privileges;
        //responseToken.information = await information;

        return res.status(200).json(responseToken)
      }
    })
    .catch((err) => {
      console.log(`:rocket: ~ file: auth.js ~ line 66 ~ login ~ err`, err)
      return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"))
    })
}

export { login }
