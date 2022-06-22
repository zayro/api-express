const jwt = require('jsonwebtoken')
const {
  checkToken
} = require('../utils/tools')

const checkAuth = (req, res, next) => {
  try {
    /*
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        */

    let token = ''

    if (!request.headers.authorization && !request.query.token && !request.body.token) {
      return false
    }

    if (request.headers.authorization) {
      const auth = request.headers.authorization

      if (auth.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
      }

      token = auth.split(' ')[1]
    }

    if (request.query.token) {
      token = request.query.token
    }

    if (request.body.token) {
      token = request.body.token
    }

    console.log(token)
    checkToken(token)

    // req.userData = decoded;
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}

module.exports = {
  checkAuth
}
