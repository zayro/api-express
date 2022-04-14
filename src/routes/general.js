import express from 'express'

import jwt from 'express-jwt'

import permission from 'express-jwt-permissions'

import * as generalControlller from '../controllers/general'

import { check, body } from 'express-validator'

const dotenv = require('dotenv')

dotenv.config()

const api = express()

const guard = permission()

const secret = {
  secret: `${process.env.TOKENSECRET}`,
  algorithms: ['HS256']
}

// security Extreme
// api.use(jwt(secret))

api.get('/general/select/:table', generalControlller.getAll)

api.get(
  '/general/search',
  check('from').notEmpty(),
  check('fields').notEmpty(),
  jwt(secret),
  guard.check('admin'),
  generalControlller.search
)

api.post(
  '/general/search',
  check('from').notEmpty(),
  check('fields').notEmpty(),
  jwt(secret),
  guard.check('admin'),
  generalControlller.search
)

api.post(
  '/general/insert',
  [check('insert').exists(), check('values').notEmpty()],
  jwt(secret),
  guard.check(['admin']),
  generalControlller.save
)

api.post(
  '/general/insertIncrement',
  [check('insert').exists(), check('values').notEmpty()],
  jwt(secret),
  guard.check(['admin']),
  generalControlller.saveAutoIncrement
)

api.put(
  '/general/update',
  [check('update').exists(),
    check('set').notEmpty(),
    check('where').notEmpty()
  ],
  body('where').custom((value, { req }) => {
    if (Object.entries(req.body.where).length === 0) {
      throw new Error('Error: Where is Empty', value)
    }

    // Indicates the success of this synchronous custom validator
    return true
  }),
  jwt(secret),
  guard.check(['admin']),
  generalControlller.update
)

api.delete(
  '/general/delete',
  check('condition').not().isEmpty(),
  body('condition').custom((value, { req }) => {
    if (Object.entries(req.body.condition).length === 0) {
      throw new Error('Error: condition is Empty', value)
    }

    // Indicates the success of this synchronous custom validator
    return true
  }),
  jwt(secret),
  guard.check(['admin']),
  generalControlller.destroy
)

export { api as general }
