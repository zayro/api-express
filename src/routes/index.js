import
express
from 'express';

const api = express();

const users = require('../controllers/cliente');


const {
    checkAuth
} = require('../middleware');


/** 
 * Metodos de consulta 
 */
api.get('/', (req, res) => {

    return res.status(200).send({
        message: "Welcome to Api "
    });

});




api.get('/users', users.getAll);
api.get('/users/:id', users.getOne);
api.post('/users', users.save);
api.put('/users/:id', users.update);
api.delete('/users/:id', users.destroy);



export {
    api
};

export {
    general
}
from './general';