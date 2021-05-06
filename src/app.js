// =================================================================
// Config Expres  ==================================================
// ================================================================= 


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';
import helmet from 'helmet';


//const bodyParser = require('body-parser');
//const methodOverride = require('method-override');




const app = express();


// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// parse application/x-www-form-urlencoded

app.use(express.urlencoded({
    extended: true
}))

app.use(morgan('tiny'));


// parse application/json
app.use(express.json());

// parse application/vnd.api+json as json
app.use(express.json({
    type: 'application/vnd.api+json'
}));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

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

// =================================================================
// Routes Expres  ==================================================
// ================================================================= 

import {
    api,
    general,
    auth
} from './routes'

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../doc/swagger.json');


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
app.use('/api/v1', general)
app.use('/api/v1', auth)

/*
const apiMongo = require('./mongoDB/controller/user')
app.use('/api/mongo', apiMongo)
*/

// Route Not Found
// Handle 404
app.use(function (req, res) {
    res.status(404).json({
        "response": "404: Page not Found"
    });
});

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
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
    next(error);
});


module.exports = app