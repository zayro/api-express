import express from 'express'

import permission from 'express-jwt-permissions'

import * as generalControlller from '../controllers/general'

import { check, body } from 'express-validator'

import { expressjwt } from 'express-jwt'

const dotenv = require('dotenv')

dotenv.config()

const api = express()

const guard = permission({
  requestProperty: 'auth',
  permissionsProperty: 'permissions'
})

const secret = {
  secret: `${process.env.TOKENSECRET}`,
  algorithms: ['HS256']
}

// security Extreme
// api.use(expressjwt(secret))

api.get('/general/select/:table', generalControlller.getAll)

/**
 * path: /general/search
 * @example Get Api Request about Search
 * @param {string} from it's a table from database
 * @param {array} fields it's a field from table
 * @return {object} data result about information
 */

api.get(
  '/general/search',
  // Check Field into Body Request
  check('from').notEmpty(),
  check('fields').notEmpty(),
  // Valid Chec Token
  expressjwt(secret),
  // Valid Profile to Permission
  guard.check(['admin']),
  generalControlller.search
)

/**
 * path: /general/search
 * @example Post Api Request about Search
 * @param {string} from it's a table from database
 * @param {array} fields it's a field from table
 * @return {object} data result about information
 */

api.post(
  '/general/search',
  check('from').notEmpty(),
  check('fields').notEmpty(),
  expressjwt(secret),
  guard.check(['admin']),
  generalControlller.search
)

/**
 * path: /general/insert
 * @example Post Api Request about Insert
 * @param {string} insert it's a table from database
 * @param {array} values it's a field from table
 * @return {object} add data result
 */

api.post(
  '/general/insert',
  [check('insert').exists(), check('values').notEmpty()],
  expressjwt(secret),
  guard.check(['admin']),
  generalControlller.save
)

api.post(
  '/general/insertIncrement',
  [check('insert').exists(), check('values').notEmpty()],
  expressjwt(secret),
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
  expressjwt(secret),
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
  expressjwt(secret),
  guard.check('admin'),
  generalControlller.destroy
)

export { api as general }
