// node myapp.js --color

import app from './app.js'
// import config from './config/config.js'

require('longjohn')

require('dotenv').config()

const colors = require('colors')
colors.enable()

app.listen(process.env.PORT, () => {
  console.log(`API REST corriendo en el puerto ${process.env.PORT}`.blue)
  console.log(`http://localhost:${process.env.PORT}/api-docs`.green)
  console.log(`http://localhost:${process.env.PORT}/api/vi`.green)
})
