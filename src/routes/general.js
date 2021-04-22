import
express
from 'express';

const api = express()

var cache = require('express-redis-cache')();

const generalControlller = require('../controllers/general');

api.get('/general/folder', cache.route({
    type: 'json',
    expire: 60
}), generalControlller.getFolder);

export {
    api as general
};