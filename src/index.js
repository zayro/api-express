import { httpServer } from './main.js'

const chalk = require('chalk')
const figlet = require('figlet')
const logSymbols = require('log-symbols')

const clear = require('clear')
const boxen = require('boxen')

const os = require('node:os')

const colors = require('colors')

const { program, Option } = require('commander')

colors.enable()

console.log(
  chalk.yellow(
    figlet.textSync('Backend - API', { horizontalLayout: 'full' })
  )
)

// It returns hostname of system
console.log('Hostname: '.yellow, os.hostname())
console.log(logSymbols.success, 'Compile Info!')
console.log(logSymbols.info, process.env.domain)

program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging', process.env.debug || false)
  .option('-i, --info', 'show Info System')
  .option('-w, --webSocket', ' allow connected Socket')
  // .option('-s, --separator <char>')
  .addOption(new Option('-p, --port <number>', 'port number')
    .default(process.env.PORT || 4000)
    .env('PORT'))

program.parse()

const options = program.opts()
if (options.debug) console.log(options)

// ANCHOR - Info
if (options.info) {
  clear()

  // return the endianness of system
  console.log('Endianness of system: '.yellow, os.endianness())

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
}

httpServer.listen(options.port, () => {
  console.log(`http://localhost:${options.port}/api-docs`.green)
  console.log(`http://localhost:${options.port}/api/vi`.green)
  console.log('http://localhost:8091/metrics/'.green)
  console.log(`ws://localhost:${options.port}/`.green)
  console.log(`environment: ${process.env.environment}`.underline.magenta)
  console.log(`debug: ${process.env.debug}`.underline.magenta)
  console.log(logSymbols.warning, 'DATABASE_URL: ', `${process.env.DATABASE_URL}`.red)
  console.log(logSymbols.warning, 'REDIS_URL: ', `${process.env.REDIS_URL}`.red)
  console.log(boxen('bY: Marlon Zayro Arias Vargas <zayro8905@gmail.com>', { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'blue' }))
})

if (process.env.environment !== 'production') {
  require('longjohn')
}

process.on('warning', e => console.warn('*** WARNING ***', e.stack))

process.on('unhandledRejection', err => {
  console.warn('*** WARNING unhandledRejection ***', err)
  throw err
})
