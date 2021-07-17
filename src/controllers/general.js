import { validationResult } from "express-validator"
import general from "../model/general"

import { message } from "../utils/tools"

function getAll(req, res) {
  const { table } = req.params

  general
    .select(table)
    .then((reponse) => res.status(200).json(message(true, "respuesta exitosa", reponse)))
    .catch((error) => res.status(500).send(message(false, "no se encontraron registros getAll", error)))
}

function search(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    })
  }

  const { from } = req.body
  const { fields } = req.body
  const where = req.body.where || {}

  return general.search(fields, from, where).then((reponse) => {
    if (reponse) {
      return res.status(200).send(message(true, "respuesta exitosa", reponse))
    }
    return res.status(200).send(message(false, "no se encontraron registros"))
  })
}

async function save(req, res) {
  const id_cliente = await general.max("cliente", "id_cliente")

  const data = {
    id_cliente,
    nombre: req.body.nombre,
    identificacion: req.body.identificacion,
  }

  console.log("save cliente", data)

  general
    .insert(data)
    .then((reponse) => {
      if (reponse) {
        return res.status(201).send(message(true, "respuesta exitosa", reponse))
      }
      return res.status(500).send(message(false, "no se encontraron registros"))
    })
    .catch((error) => res.status(500).send(message(false, error)))
}

async function update(req, res) {
  const id = req.params.id

  const data = {
    nombre: req.body.nombre,
  }

  console.log("update cliente", data)

  cliente
    .update(id, data)
    .then((reponse) => {
      if (reponse) {
        return res.status(200).send(message(true, "proceso exitoso", reponse))
      } else {
        return res.status(200).send(message(false, "no se encontraron registros"))
      }
    })
    .catch((error) => {
      return res.status(200).send(message(false, error))
    })
}

async function destroy(req, res) {
  const id = req.params.id

  cliente
    .delete(id)
    .then((reponse) => {
      if (reponse) {
        return res.status(200).send(message(true, "proceso exitoso", reponse))
      } else {
        return res.status(200).send(message(false, "no se encontraron registros"))
      }
    })
    .catch((error) => {
      return res.status(200).send(message(false, error))
    })
}

export { getAll, search, save, update, destroy }
