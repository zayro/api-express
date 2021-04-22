import
express
from 'express';

const api = express()

const generalControlller = require('../controllers/general');

api.get('/general/folder', generalControlller.getFolder);

export {
    api as general
};