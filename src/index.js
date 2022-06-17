// node myapp.js --color

import app from './app.js'
// Include os module and create its object
// const os = require('os')
// import config from './config/config.js'

// require('dotenv').config()

const argv = require('optimist')

const colors = require('colors')
colors.enable()

if (process.env.environment !== 'production') {
  require('longjohn')
}

/*
// return the endianness of system
console.log('Endianness of system: '.yellow, os.endianness())

// It returns hostname of system
console.log('Hostname: '.yellow, os.hostname())

// It returns userInfo of system
console.log('userInfo: '.yellow, os.userInfo())

// It returns cpus of system
console.log('cpus: '.yellow, os.cpus())

// It return operating system name
console.log('Operating system name: '.yellow, os.type())

// It returns the platform of os
console.log('operating system platform: '.yellow, os.platform())

// It returns the operating systems release.
console.log('OS release : '.yellow, os.release())

// return the cpu architecture
console.log('CPU architecture: '.yellow, os.arch())

// It returns the amount of free system memory in bytes
console.log('Free memory: '.yellow, os.freemem())

// It return total amount of system memory in bytes
console.log('Total memory: '.yellow, os.totalmem())

// It returns the list of network interfaces
console.log('List of network Interfaces: '.yellow, os.networkInterfaces())

// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : '.yellow, os.tmpdir())
*/

const environment = argv.default({ port: process.env.PORT || 4000 }).argv

app.listen(environment.port, () => {
  console.log(`API REST corriendo en el puerto ${environment.port}`.bold.blue)
  console.log(`http://localhost:${environment.port}/api-docs`.green)
  console.log(`http://localhost:${environment.port}/api/vi`.green)
  console.log(`environment: ${process.env.environment}`.underline.magenta)
  console.log(`debug: ${process.env.debug}`.underline.magenta)
})
