import express from 'express'

// valiables de entorno
import dotenv from 'dotenv'

import multer from 'multer'

import fs from 'fs'

dotenv.config()

const api = express()

// Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('multerFilter', req.params.folder)
    const ruta = typeof req.params.folder !== 'undefined' ? `public/uploads/${req.params.folder}` : 'public/uploads/'
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
  if (file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
    cb(null, true)
  } else {
    cb(new Error('Error en el tipo de archivo.'), false)
  }
}

api.post('/uploadSimple', function (req, res) {
  console.log('/uploadSimple', req.files.archivo) // the uploaded file object

  const sampleFile = req.files.archivo
  const filePath = './public/uploads/' + sampleFile.name

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(filePath, function (err) {
    if (err) return res.status(500).send(err)
  })

  res.json({
    message: 'file uploaded',
    file: req.files
  })
})

const upload = multer({
  // dest: 'src/uploads/',
  storage: multerStorage,
  fileFilter: multerFilter
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

  res.json({
    message: 'file uploaded',
    file: req.file
  })

  res.end()
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

api.post('/upload', cpUpload, function (req, res) {
  console.log(req.files)
  res.end()
})

export { api as uploads }
