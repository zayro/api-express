// requiring path and fs modules
// const path = require('path')
const fs = require('fs')

const getFiles = (folder, domain = 'localhost') => {
  // joining path of directory
  // const directoryPath = path.join(__dirname, folder);
  // passsing directoryPath and callback function

  const arraytFiles = []

  const files = fs.readdirSync(folder)

  // listing all files using forEach
  files.forEach((file) => {
    // Do whatever you want to do with the file
    if (fs.statSync(folder + '/' + file).isDirectory()) {
      // arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      // const url = "http://${domain}/" + folder + "/" + file;
      const url = `http://${domain}/${folder}/${file}`
      arraytFiles.push({
        filename: file,
        url: url
      })
    }
  })

  return arraytFiles
}

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      arrayOfFiles.push(file)
    }
  })

  return arrayOfFiles
}

const getAllFilesObject = (dirPath, arrayData) => {
  const files = fs.readdirSync(dirPath)

  const arrayOfFiles = {}
  arrayOfFiles[dirPath] = []

  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      const folder = `${file}`
      // arrayOfFiles[folder] = getFiles(dirPath + "/" + file);
      arrayOfFiles[folder] = getAllFilesObject(dirPath + '/' + file, arrayOfFiles)
    } else {
      // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      arrayOfFiles[dirPath].push({
        // 'dirPath': dirPath,
        filename: file
      })
    }
  })

  return arrayOfFiles
}

const getAllFilesObjectPromise = (dirPath, arrayOfFiles) => {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(dirPath, {
        withFileTypes: false
      })

      arrayOfFiles = arrayOfFiles || {}
      arrayOfFiles[dirPath] = []

      files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          const folder = `${file}`
          // arrayOfFiles[folder] = getFiles(dirPath + "/" + file);
          arrayOfFiles[folder] = getAllFilesObject(dirPath + '/' + file, arrayOfFiles)
        } else {
          // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
          arrayOfFiles[dirPath].push({
            // 'dirPath': dirPath,
            filename: file
          })
        }
      })
      resolve('sd')
      return arrayOfFiles
    } catch (error) {
      reject(error)
    }
  })
}

export { getFiles, getAllFiles, getAllFilesObject, getAllFilesObjectPromise }
