import express from 'express'
import path from 'path'
// valiables de entorno
import dotenv from 'dotenv'

import multer from 'multer'

import fs from 'fs'

import { message } from '../utils/tools'

dotenv.config()

const api = express()

// Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('multerFilter', req.params.folder)

    const ruta = typeof req.params.folder !== 'undefined' ? path.join(__dirname, `../public/uploads/${req.params.folder}`) : path.join(__dirname, '../public/uploads')
    fs.mkdirSync(ruta, {
      recursive: true
    })

    cb(null, ruta)
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
  }
})

// Multer Filter
const multerFilter = (req, file, cb) => {
  console.log('🚀 ~ multerFilter ~ file', file)
  if (file.originalname.match(/\.(pdf|doc|docx|jpg|png|jpeg|csv)$/)) {
    cb(null, true)
  } else {
    cb(new Error('Error en el tipo de archivo.'), false)
  }
}

const upload = multer({
  // dest: 'src/uploads/',
  storage: multerStorage,
  fileFilter: multerFilter
})

const cpUpload = upload.fields([
  {
    name: 'archivo',
    maxCount: 1
  },
  {
    name: 'gallery',
    maxCount: 8
  }
])

api.post('/uploadSimple', function (req, res) {
  console.log('/uploadSimple', req.files.archivo) // the uploaded file object

  const sampleFile = req.files.archivo
  const filePath = './public/uploads/' + sampleFile.name
  console.log('🚀 ~ filePath', filePath)

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(filePath, function (err) {
    if (err) return res.status(500).send(message(false, 'ocurrio problema', err))
  })

  res.json(message(true, 'respuesta exitosa', req.files))
})

api.post('/uploadArray', upload.array('archivo', 2), function (req, res) {
  console.log(req.files)
  res.json({
    message: 'file uploaded',
    file: req.files
  })
  res.end()
})

api.post('/uploadSingle/:folder', upload.single('archivo'), function (req, res) {
  console.log('/uploadSingle/:folder', req.params.folder)
  console.log('🚀 ~ /uploadSingle/:folder', req.files)

  res.status(200).send(message(true, 'respuesta exitosa', req.file))

  res.end()
})

api.post('/upload', cpUpload, function (req, res) {
  res.json({
    message: 'file uploaded',
    file: req.files
  })
  res.end()
})

export { api as uploads }
