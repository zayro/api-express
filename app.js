const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// =================================================================
// Config Log  =====================================================
// ================================================================= 

const log4js = require("log4js");
log4js.configure({
  appenders: { 
    console: { type: 'console' },
    debugInfo: { type: "file", filename: "log/info.log", pattern: ".yyyy-MM-dd-hh" },
    debugError: { type: "dateFile", filename: "log/error.log", pattern: ".yyyy-MM-dd-hh", compress: true },
    debug: { type: "dateFile", pattern: '.yyyy-MM-dd-hh', filename: "log/debug.log" }
 },
  categories: { 
    debug: { appenders: ['debug'], level: 'debug' },
    debugInfo: { appenders: ['debugInfo'], level: 'info' },
    debugError: { appenders: ['debugError'], level: 'error' },
    default: { appenders: ['console'], level: "all" }
 }
});
 

logger = log4js.getLogger();



// =================================================================
// Config mongoose ====================================================
// =================================================================

const {db} = require('./mongoDB/');

// =================================================================
// Config Expres  ==================================================
// ================================================================= 


const express = require('express')
const app = express();
const fileUpload = require('express-fileupload')

app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// Route Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    return true;
});


const api = require('./routes')

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./doc/swagger.json');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(fileUpload());

// RUTA INICIAL
app.get('/', function (req, res) {

    const domain = req.headers.host;

    res.json({
        documentacion: `http://${domain}/api-docs/`,
        api: `http://${domain}/api/v1/`,
        message: 'Bienvenido al Api'

    })
})

// RUTA DOCUMENTACION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// RUTA API
app.use('/api/v1', api)

const apiMongo = require('./mongoDB/controller/user')
app.use('/api/mongo', apiMongo)


// Route Not Found
// Handle 404
app.use(function (req, res) {
    res.status(404).json({"response": "404: Page not Found"});
});

// Handle 500
app.use(function (error, req, res, next) {
    res.send('500: Internal Server Error', 500);
});

// Route Handle Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});


module.exports = app