import moment from 'moment'
import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'
import General from '../model/general'

const { compareEncryptedData, message, parseDataKnex, CreateToken, encrypt } = require('../utils/tools')

let env = dotenv.config({})
if (env.error) throw env.error
env = dotenvParseVariables(env.parsed)

const connect = new General('enterprise')

const login = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  await connect
    .raw('Select * From auth.users Where username = ? or email = ?', [username, password])
    .then(async (response) => {
      console.log('🚀 ~ .then ~ response', response.rows)
      // const resp = parseDataKnex(response)
      const resp = response.rows[0]

      // Debug
      if (env.debug) {
        console.log(':rocket: ~ file: auth.js ~ line 19 ~ awaitgeneral.raw ~ resp', response)
      }

      if (response.length === 0) {
        return res.status(401).json({
          message: 'Email no Valid'
        })
      }

      try {
        // Debug
        if (env.debug) {
          console.log(':rocket: ~ file: auth.js ~ line 42 ~ awaitgeneral.raw ~ password', password)
        }

        const validPass = compareEncryptedData(password, resp.password)
        if (!validPass) {
          return res.status(401).json({
            message: 'Auth validPass failed'
          })
        }
      } catch (error) {
        console.log(':rocket: ~ file: auth.js ~ line 41 ~ await general.raw ~ error', error)
        return res.status(500).json({
          message: 'Error Auth Crypt failed',
          error: error
        })
      }

      if (!resp) {
        return res.status(400).json(message(true, resp, 'no se pudo encontrar registros'))
      } else {
        const menu = connect
          .raw('Select menu, link, icon From auth.view_menu Where username = ?', [resp.username])
          .then((data) => (data.rows))

        const privileges = connect
          .raw('Select permission, role From auth.view_privileges Where username = ?', [resp.username])
          .then((data) => JSON.parse((data.rows)[0].permission))

        const information = connect
          .raw('Select * From auth.view_information_users Where username = ?', [resp.username])
          .then((data) => data.rows)

        const role = connect
          .raw('Select role From auth.view_privileges Where username = ?', [resp.username])
          .then((data) => (data.rows)[0].role)

        let token = ''

        const payload = {}
        payload.sub = resp._id
        payload.iat = moment().unix()
        payload.menu = await menu
        payload.permissions = await privileges
        payload.information = await information
        payload.role = await role

        // payload.exp: moment().add(1, "day").unix()

        console.log('🚀 ~ file: auth.js ~ line 78 ~ .then ~ payload', payload)

        const expiresIn = '1d'

        token = CreateToken(payload, expiresIn)

        const responseToken = {}
        responseToken.status = true
        responseToken.username = resp.username
        responseToken.email = resp.email
        responseToken.token = token
        responseToken.payload = payload

        return res.status(200).json(responseToken)
      }
    })
    .catch((err) => {
      console.log(':rocket: ~ file: auth.js ~ line 103 ~ login ~ err', err)
      return res.status(500).json(message(false, err, 'Ocurrio un problema al consultar'))
    })
}

const createUser = async (req, res) => {
  console.log('creando usuario')
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  await connect
    .raw('INSERT INTO auth.users (id_users, username, password, email) VALUES SELECT MAX(id_users)+1, ? , ? , ?', [username, encrypt(password), email])
    .then(async (response) => {
      const resp = parseDataKnex(response)[0]

      // Debug
      if (env.debug) {
        console.log(':rocket: ~ file: auth.js ~ line 19 ~ awaitgeneral.raw ~ resp', resp)
      }

      if (resp.length === 0) {
        return res.status(401).json({
          message: 'Email no Valid'
        })
      }

      const responseToken = {}
      responseToken.status = true
      responseToken.username = resp.username
      responseToken.email = resp.email

      return res.status(200).json(responseToken)
    })
    .catch((err) => {
      console.log(':rocket: ~ file: auth.js ~ line 66 ~ login ~ err', err)
      return res.status(500).json(message(false, err, 'Ocurrio un problema al consultar'))
    })
}

export { login, createUser }
