// =================================================================
// Config Expres  ==================================================
// =================================================================

import express from 'express'
import morgan from 'morgan'
import path from 'path'
import methodOverride from 'method-override'
import helmet from 'helmet'
import compression from 'compression'

import expressMetrics from 'express-metrics'
import { logger, getStatusText } from './config/log'

// =================================================================
// Routes Expres  ==================================================
// =================================================================

import { general, auth, query, files, uploads, view, pdf, cache, socket } from './routes'

const responseTime = require('response-time')

// const methodOverride = require('method-override');

const app = express()

app.use(responseTime())

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())

// parse application/x-www-form-urlencoded

app.use(
  express.urlencoded({
    extended: true
  })
)

// =================================================================
// Log Expres  ==================================================
// =================================================================
app.response.sendLogResponse = function (statusCode, message, req, res) {
  const status = getStatusText(res.statusCode)
  console.log('🚀 ~ status', status)
  // message.code = status
  logger(message, req, res)
  return this.status(statusCode).json(message)
}

// =================================================================
// Morgan Expres  ==================================================
// =================================================================

app.use(morgan('tiny'))

// must parse body before morganBody as body will be logged

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

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

app.use(function (req, res, next) {
  req.setTimeout(500000, function () {
    // call back function is called when request timed out.
    return res.status(408).json({ message: '408 Request Timeout - HTTP' })
  })
  next()
})

// =================================================================
// Metrics Expres  ================================================
// =================================================================

// start a metrics server
app.use(expressMetrics({
  port: 8091
}))

// =================================================================
// Template Expres  ================================================
// =================================================================
// set the view engine to ejs

app.set('view engine', 'ejs')
console.log('__dirname', __dirname)
console.log('process.cwd()', process.cwd())
app.set('views', path.join(__dirname, '/views'))

// =================================================================
// Document Swagger Express  =======================================
// =================================================================

/*
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../doc/swagger.json')
// RUTA DOCUMENTACION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
*/

// =================================================================
// Static Express  ==================================================
// =================================================================

// Define the static file path

// app.use('/public', express.static('public'))

app.use('/public', express.static(path.join(__dirname, './public')))

// RUTA INICIAL
app.get('/', function (req, res) {
  const domain = req.headers.host
  const hostname = req.hostname

  res.json({
    documentacion: `http://${domain}/api-docs/`,
    api: `http://${domain}/api/v1/`,
    socket: `ws://${domain}/`,
    metrics: `http://${hostname}:8091/metrics`,
    message: 'Welcome to Business Api'
  })
})

// RUTA API
app.use('/api/v1', general)
app.use('/api/v1', auth)
app.use('/api/v1', query)
app.use('/api/v1', files)
app.use('/api/v1', uploads)
app.use('/api/v1', view)
app.use('/api/v1', pdf)
app.use('/api/v1', cache)
app.use('/api/v1', socket)

// Route Not Found
app.use(function (req, res) {
  res.status(404).json({
    code: 404,
    msg: '404 Page not  Found'
  })
})

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
