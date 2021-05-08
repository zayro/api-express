import general from "../model/general";
import { validationResult } from "express-validator";

import { message } from "../utils/tools";

function getAll(req, res) {
    const table = req.params.table;

    general
        .select(table)
        .then((reponse) => {
            return res
                .status(200)
                .json(message(true, "respuesta exitosa", reponse));
        })
        .catch((error) => {
            return res
                .status(500)
                .send(
                    message(false, "no se encontraron registros getAll", error)
                );
        });
}

function search(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    const from = req.body.from;
    const fields = req.body.fields;
    const where = req.body.where || {};

    general.search(fields, from, where).then((reponse) => {
        if (reponse) {
            return res
                .status(200)
                .send(message(true, "respuesta exitosa", reponse));
        } else {
            return res
                .status(200)
                .send(message(false, "no se encontraron registros"));
        }
    });
}

async function save(req, res) {
    const id_cliente = await general.max("cliente", "id_cliente");

    const data = {
        id_cliente: id_cliente,
        nombre: req.body.nombre,
        identificacion: req.body.identificacion,
    };

    console.log("save cliente", data);

    general
        .insert(data)
        .then((reponse) => {
            if (reponse) {
                return res
                    .status(201)
                    .send(message(true, "respuesta exitosa", reponse));
            } else {
                return res
                    .status(500)
                    .send(message(false, "no se encontraron registros"));
            }
        })
        .catch((error) => {
            return res.status(500).send(message(false, error));
        });
}

async function update(req, res) {
    const id = req.params.id;

    const data = {
        nombre: req.body.nombre,
    };

    console.log("update cliente", data);

    cliente
        .update(id, data)
        .then((reponse) => {
            if (reponse) {
                return res
                    .status(200)
                    .send(message(true, "proceso exitoso", reponse));
            } else {
                return res
                    .status(200)
                    .send(message(false, "no se encontraron registros"));
            }
        })
        .catch((error) => {
            return res.status(200).send(message(false, error));
        });
}

async function destroy(req, res) {
    const id = req.params.id;

    cliente
        .delete(id)
        .then((reponse) => {
            if (reponse) {
                return res
                    .status(200)
                    .send(message(true, "proceso exitoso", reponse));
            } else {
                return res
                    .status(200)
                    .send(message(false, "no se encontraron registros"));
            }
        })
        .catch((error) => {
            return res.status(200).send(message(false, error));
        });
}

export { getAll, search };
