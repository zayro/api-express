
const log = require('node-file-logger')

const options = {
  folderPath: './src/log/',
  dateBasedFileNaming: true,
  fileNamePrefix: 'DailyLogs_',
  fileNameExtension: '.log',
  dateFormat: 'YYYY_MM_D',
  timeFormat: 'h:mm:ss A'
}

log.SetUserOptions(options)

export { log }
