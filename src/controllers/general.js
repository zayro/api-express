import { validationResult } from 'express-validator'

import { message } from '../utils/tools'

import General from '../model/general'

const connect = new General('demo')

function getAll (req, res) {
  const { table } = req.params

  connect
    .select(table)
    .then((reponse) => res.status(200).json(message(true, 'respuesta exitosa', reponse)))
    .catch((error) => res.status(500).send(message(false, 'no se encontraron registros getAll', error)))
}

function search (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errors: errors.array()
    })
  }

  const { from, fields } = req.body

  const where = req.body.where || {}
  const order = req.body.order || []

  return connect
    .search(fields, from, where, order)
    .then((reponse) => {
      if (reponse) {
        return res.status(200).send(message(true, 'respuesta exitosa', reponse))
      }
      return res.status(200).send(message(false, 'no se encontraron registros'))
    })
    .catch((error) => res.status(500).send(message(false, 'ocurrio un error', error)))
}

async function save (req, res) {
  // const id_cliente = await connect.max("cliente", "id_cliente")
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errors: errors.array()
    })
  }

  connect
    .insert(req.body.insert, req.body.values)
    .then((reponse) => {
      if (reponse) {
        return res.status(201).send(message(true, 'respuesta exitosa', reponse))
      }
      return res.status(500).send(message(false, 'no se encontraron registros'))
    })
    .catch((error) => res.status(500).send(message(false, error)))
}

async function saveAutoIncrement (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errors: errors.array()
    })
  }

  connect
    .insert(req.body.insert, req.body.values, req.body.increment)
    .then((reponse) => {
      if (reponse) {
        return res.status(201).send(message(true, 'respuesta exitosa', reponse))
      }
      return res.status(500).send(message(false, 'no se encontraron registros'))
    })
    .catch((error) => res.status(500).send(message(false, error)))
}

async function update (req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  connect
    .update(req.body.update, req.body.where, req.body.set)
    .then((response) => {
      console.log(':rocket: ~ file: general.js ~ line 91 ~ .then ~ reponse', response)
      if (response) {
        return res.status(200).send(message(true, 'proceso exitoso', response))
      } else {
        return res.status(200).send(message(false, 'no se encontraron registros', response))
      }
    })
    .catch((error) => {
      return res.status(403).send(message(false, error))
    })
}

async function destroy (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(403).json({
      errors: errors.array()
    })
  }

  connect
    .delete(req.body.delete, req.body.condition)
    .then((reponse) => {
      if (reponse) {
        return res.status(200).send(message(true, 'proceso exitoso', reponse))
      } else {
        return res.status(200).send(message(false, 'no se encontraron registros'))
      }
    })
    .catch((error) => {
      return res.status(200).send(message(false, error))
    })
}

export { getAll, search, save, saveAutoIncrement, update, destroy }
