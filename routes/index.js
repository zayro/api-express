const express = require('express');

const api = express.Router();

const cliente = require('../controllers/cliente');

const {checkAuth} = require('../middleware');


/** 
 * Metodos de consulta 
 */


api.get('/', (req, res) => {

	return res.status(200).send({
		message: "Welcome to Api "
	});

});

api.get('/cliente', checkAuth, cliente.getAll);
api.get('/cliente/:id', cliente.getOne);
api.post('/cliente', cliente.save);
api.put('/cliente/:id', cliente.update);
api.delete('/cliente/:id', cliente.destroy);



module.exports = api;