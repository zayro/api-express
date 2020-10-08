const User = require('../model/user');

const express = require('express');
const { message, encrypt } = require('../../utils/tools');

const router = express.Router();

/** 
 * Metodos de consulta 
 */

router.get('/', (req, res) => {

    User.find({}, function(err, response) {

        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }

    });

});

router.get('/username/:username',  (req, res) => {
    //(req.body);
    //req.params.username;

    User.find({ 'username': req.params.username })
        .then(response => {
            if (!response) {
                return res.status(400).json(message(true, response, "no se pudo encontrar registros"));
            } else {
                return res.status(200).json(message(true, response, "Se consulto exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        });


});

router.get('/email/:email',  (req, res) => {
    //(req.body);
    //req.params.username;

    User.find({ 'email': req.params.email })
        .then(response => {
            if (!response) {
                return res.status(400).json(message(true, response, "no se pudo encontrar registros"));
            } else {
                return res.status(200).json(message(true, response, "Se consulto exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        });


});

router.get('/search/:data',  (req, res) => {

    User.find({
            "$or": [{
                "email": req.params.data
            }, {
                "username": req.params.data
            }]
        })
        .then(response => {
            if (!response) {
                return res.status(400).json(message(true, response, "no se pudo encontrar registros"));
            } else {
                return res.status(200).json(message(true, response, "Se consulto exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        });


});


/** 
 * Metodos de creacion 
 */
router.post('/', (req, res) => {

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: encrypt(req.body.password),
        active: req.body.active
    });



    user.save(function(err, response) {
        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });


});

/** 
 * Metodos de actualizacion 
 */
router.put('/:id',  (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "Email not null"
        });
    }

    User.update({ _id: req.params.id }, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: encrypt(req.body.password),
            active: req.body.active
        })
        .then(response => {
            if (!response) {
                return res.status(200).json(message(true, response, "Se actualizo exitosamente"));
            }
            res.send(response);
        }).catch(err => {
            return res.status(500).json(message(true, err, "Ocurrio un problema al consultar"));
        });

});

/** 
 * Metodos de eliminacion 
 */
router.delete('/:id',  (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).json(message(true, null, "No existe el parametro"));
    }

    // Process Delete
    User.deleteOne({ _id: req.params.id })
        .then(response => {
            if (response) {
                return res.status(200).json(message(true, response, "Se elimino exitosamente"));
            } else {
                return res.status(400).json(message(true, response, "Se elimino exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(true, err, "Ocurrio un problema al consultar"));
        });

});

router.delete('/username/:username',  (req, res) => {
    // Validate Request
    if (!req.params.username) {
        return res.status(400).json(message(true, null, "No existe el parametro"));
    }

    // Process Delete
    User.deleteOne({ username: req.params.username })
        .then(response => {
            if (response) {
                return res.status(200).json(message(true, response, "Se elimino exitosamente"));
            } else {
                return res.status(400).json(message(true, response, "Se elimino exitosamente"));
            }

        }).catch(err => {
            return res.status(500).json(message(true, err, "Ocurrio un problema al consultar"));
        });

});

/** Module For Testing */

router.get('/setup/', (req, res) => {

    // create a sample user
    var user = new User({
        name: 'Marlon Zayro',
        username: 'MarlonZayro01',
        email: 'zayro890502@gmail.com',
        password: 'password',
        active: 1
    });


    user.save(function(err, response) {
        if (!err) {
            return res.status(200).json(message(true, response, "Se consulto exitosamente"));
        } else {
            return res.status(500).json(message(false, err, "Ocurrio un problema al consultar"));
        }
    });



});

router.get('/test/', (req, res) => {

    res.send('Hello World');

});

module.exports = router;