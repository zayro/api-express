import express from 'express'
import * as queryControlller from '../controllers/query'

// valiables de entorno
import dotenv from 'dotenv'

const pdf = require('express-pdf')
const ejs = require('ejs')

dotenv.config()

const api = express()

api.use(pdf)

api.get('/pdf/user', async (req, res) => {
  const data = queryControlller.query_users()

  const html = await ejs
    .renderFile(`${process.cwd()}/src/views/pages/query.ejs`, {
      info: await data
    })
    .then((output) => output)

  res.pdfFromHTML({
    filename: 'generated.pdf',
    htmlContent: html,
    options: {
      format: 'Letter',
      border: {
        right: '5mm',
        left: '5mm'
      }
    }
  })
})

export { api as default }
