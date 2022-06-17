// =================================================================
// Config Expres  ==================================================
// =================================================================

import express from 'express'
import morgan from 'morgan'
import path from 'path'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'
import fs from 'fs'
import jsonMorgan from 'morgan-json'
import morganBody from 'morgan-body'

// =================================================================
// Routes Expres  ==================================================
// =================================================================

import { general, auth, query, files, uploads, view, pdf, cache } from './routes'

// const methodOverride = require('method-override');

const app = express()

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())

// parse application/x-www-form-urlencoded

app.use(
  express.urlencoded({
    extended: true
  })
)

// =================================================================
// Morgan Expres  ==================================================
// =================================================================

// app.use(morgan('tiny'))

// must parse body before morganBody as body will be logged

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

const format = jsonMorgan({
  date: ':date[iso]',
  addr: ':remote-addr',
  user: ':remote-user - :user-agent ',
  url: ':url',
  method: ':method',
  status: ':status',
  short: ':method :url :status :user-agent [:date[web]]',
  length: ':res[content-length]',
  'response-time': ':response-time ms'
})

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
const accessLogStreamJson = fs.createWriteStream(path.join(__dirname, 'log/access.json'), { flags: 'a' })
const accessLogStreamRequest = fs.createWriteStream(path.join(__dirname, 'log/request.json'), { flags: 'a' })

app.use(morgan(format, { stream: accessLogStreamJson }))

// hook morganBody to express app
morganBody(app, { noColors: true, stream: accessLogStreamRequest })

// create a write stream (in append mode)

app.use(morgan('combined', { stream: accessLogStream }))

// parse application/json
app.use(express.json())

// parse application/vnd.api+json as json
app.use(
  express.json({
    type: 'application/vnd.api+json'
  })
)

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(compression())

// Route Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
  return true
})

// =================================================================
// Template Expres  ================================================
// =================================================================
// set the view engine to ejs

app.set('view engine', 'ejs')
console.log('__dirname', __dirname)
console.log('process.cwd()', process.cwd())
app.set('views', path.join(__dirname, '/views'))

// =================================================================
// Static Expres  ==================================================
// =================================================================

// Define the static file path
// app.use(express.static('public'));
app.use('/public', express.static('public'))

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../doc/swagger.json')

// RUTA INICIAL
app.get('/', function (req, res) {
  const domain = req.headers.host

  res.json({
    documentacion: `http://${domain}/api-docs/`,
    api: `http://${domain}/api/v1/`,
    message: 'Welcome to Api'
  })
})

// RUTA DOCUMENTACION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// RUTA API
app.use('/api/v1', general)
app.use('/api/v1', auth)
app.use('/api/v1', query)
app.use('/api/v1', files)
app.use('/api/v1', uploads)
app.use('/api/v1', view)
app.use('/api/v1', pdf)
app.use('/api/v1', cache)

/*
const apiMongo = require('./mongoDB/controller/user')
app.use('/api/mongo', apiMongo)
*/

// Route Not Found
// Handle 404
app.use(function (req, res) {
  res.status(404).json({
    response: '404: Page not Found'
  })
})

// Handle 500
/*
app.use(function (error, req, res, next) {

    res.status(500).json({
        "500": "Internal Server Error",
        "error": error
    });

});
*/

// Route Handle Errors
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
  next(error)
})

export default app
