import moment from 'moment'
import dotenv from 'dotenv'
import General from '../model/general'
import { log } from '../config/log'

const { compareEncryptedData, message, CreateToken, encrypt } = require('../utils/tools')

const env = dotenv.config()
console.log('🚀 ~ env:', env)

const connect = new General('enterprise')

const login = async (req, res) => {
  // Log a simple error message

  const username = req.body.username
  const password = req.body.password

  await connect
    .raw('Select * From auth.users Where username = ? or email = ?', [username, password])
    .then(async (response) => {
      // const resp = parseDataKnex(response)
      const resp = response.rows[0]

      // Debug
      if (process.env.debug) {
        // console.log('🐛 ~ file: auth.js ~ line 19 ~ awaitgeneral.raw ~ resp', response)
      }

      if (response.length === 0) {
        return res.status(401).json({
          message: 'Email no Valid'
        })
      }

      try {
        // Debug
        if (process.env.debug) {
          console.log('🚧 ~ file: auth.js ~ line 42 ~ awaitgeneral.raw ~ password', password)
        }

        const validPass = compareEncryptedData(password, resp.password)
        if (!validPass) {
          return res.status(401).json({
            message: 'Auth validPass failed'
          })
        }
      } catch (error) {
        console.log('🚧 ~ file: auth.js ~ line 41 ~ await general.raw ~ error', error)
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

        const privileges = await connect
          .raw('Select permission, role From auth.view_privileges Where username = ?', [resp.username])

          // .then((data) => JSON.parse((data.rows)[0].permission))
          .then((data) => (data.rows))

        const information = connect
          .raw('Select * From auth.view_information_users Where username = ?', [resp.username])
          .then((data) => data.rows)

        const [{ permission, role }] = privileges

        let token = ''

        const payload = {}
        const payloadResponse = {}

        payload.sub = resp._id
        payload.iat = moment().unix()
        /*
        payloadResponse.menu = await menu
        payloadResponse.permissions = JSON.parse(permission)
        payload.information = await information
        */
        payload.menu = await menu
        payload.permissions = JSON.parse(permission)
        payload.information = await information
        payload.role = role

        // payload.exp: moment().add(1, "day").unix()

        console.log('🚀 ~ file: auth.js ~ line 78 ~ .then ~ payload', payload)

        const expiresIn = '1d'

        token = CreateToken(payload, expiresIn)

        const responseToken = {}
        responseToken.status = true
        responseToken.username = resp.username
        responseToken.email = resp.email
        responseToken.token = token
        responseToken.payload = payloadResponse

        log.Info('/login', 'GET', 'login()', responseToken)

        return res.sendLogResponse(200, responseToken, req, res)
      }
    })
    .catch((err) => {
      console.log('🚧 ~ file: auth.js ~ line 106 ~ login ~ err', err)
      return res.status(500).json(message(false, err, 'Ocurrio un problema al consultar'))
    })
}

const createUser = async (req, res) => {
  console.log('creando usuario')
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  await connect
    .raw('INSERT INTO auth.users (id_users, username, password, email) SELECT MAX(id_users)+1, ?, ?, ? FROM auth.users', [username, encrypt(password), email])
    .then(async (response) => {
      // const resp = parseDataKnex(response)[0]
      const resp = response
      console.log('🚀 ~ .then ~ resp', resp)

      // Debug
      if (process.env.debug) {
        console.log('🚧 ~ file: auth.js ~ line 19 ~ awaitgeneral.raw ~ resp', resp)
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

      return res.status(200).json(message(true, 'user created successfuly'))
    })
    .catch((err) => {
      console.log('🚧 ~ file: auth.js ~ line 66 ~ login ~ err', err)
      return res.status(500).json(message(false, err, 'Ocurrio un problema al crear Usuario'))
    })
}

export { login, createUser }
