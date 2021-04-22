const general = require('../model/general');

import {
    getFiles,
    getAllFilesObject,
    message
} from '../utils/tools';



function getFolder(req, res) {

    try {
        const response = getFiles("src/uploads");
        console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, response);
        return res.status(200).json(message(true, 'respuesta exitosa', response));

    } catch (error) {
        console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, error);
        return res.status(500).json(message(false, 'no se encontraron files getAll', error));

    }

}

function getFolderAll(req, res) {

    try {
        const response = getAllFilesObject("src/uploads");
        console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, response);
        return res.status(200).json(message(true, 'respuesta exitosa', response));

    } catch (error) {
        console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, error);

        return res.status(500).json(message(false, 'no se encontraron files getAll', error));

    }

}

function getAll(req, res) {

    const table = req.params.table

    general.select(table).then(reponse => {
        return res.status(200).json(message(true, 'respuesta exitosa', reponse));
    }).catch(error => {
        return res.status(500).send(message(false, 'no se encontraron registros getAll', error));
    })

}

function getOne(req, res) {

    const id = req.params.id

    cliente.search(id).then(reponse => {
        if (reponse) {
            console.log(`:rocket: ~ file: general.js ~ line 41 ~ getFolder ~ error`, error);
            console.log(`:rocket: ~ file: general.js ~ line 41 ~ getFolder ~ error`, error);
            console.log(`:rocket: ~ file: general.js ~ line 41 ~ getFolder ~ error`, error);
            return res.status(200).send(message(
                true,
                'respuesta exitosa',
                reponse
            ));
        } else {
            return res.status(200).send(message(false, 'no se encontraron registros'));
        }
    });

}

async function save(req, res) {

    const id_cliente = await general.max('cliente', 'id_cliente');

    const data = {
        id_cliente: id_cliente,
        nombre: req.body.nombre,
        identificacion: req.body.identificacion
    };

    console.log('save cliente', data);

    cliente.insert(data).then(reponse => {
        if (reponse) {
            return res.status(201).send(message(true, 'respuesta exitosa', reponse));
        } else {
            return res.status(500).send(message(false, 'no se encontraron registros'));
        }
    }).catch(error => {
        return res.status(500).send(message(false, error));
    });


}

async function update(req, res) {

    const id = req.params.id;

    const data = {
        nombre: req.body.nombre
    };

    console.log('update cliente', data);

    cliente.update(id, data).then(reponse => {
        if (reponse) {
            return res.status(200).send(message(true, 'proceso exitoso', reponse));
        } else {
            return res.status(200).send(message(false, 'no se encontraron registros'));
        }
    }).catch(error => {
        return res.status(200).send(message(false, error));
    });

}

async function destroy(req, res) {

    const id = req.params.id;

    cliente.delete(id).then(reponse => {
        if (reponse) {
            return res.status(200).send(message(true, 'proceso exitoso', reponse));
        } else {
            return res.status(200).send(message(false, 'no se encontraron registros'));
        }
    }).catch(error => {
        return res.status(200).send(message(false, error));
    });

}


module.exports = {
    getAll,
    getFolder,
    getFolderAll

}