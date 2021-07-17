import { getFiles, getAllFilesObject, message } from "../utils/tools"

function getFolderCache(req, res) {
  try {
    const response = getFiles("public/uploads")
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, response)
    return res.status(200).json(message(true, "respuesta exitosa", response))
  } catch (error) {
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, error)
    return res.status(500).json(message(false, "no se encontraron files getAll", error))
  }
}

function getFolder(req, res) {
  const pathFolder = req.query.path

  try {
    const response = getFiles(pathFolder, req.headers.host)
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, response)
    return res.status(200).json(message(true, "respuesta exitosa", response))
  } catch (error) {
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, error)
    return res.status(500).json(message(false, "no se encontraron files getAll", error))
  }
}

function getFolderAll(req, res) {
  try {
    const response = getAllFilesObject("src/uploads")
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, response)
    return res.status(200).json(message(true, "respuesta exitosa", response))
  } catch (error) {
    console.log(`:rocket: ~ file: general.js ~ line 14 ~ getFolder ~ response`, error)

    return res.status(500).json(message(false, "no se encontraron files getAll", error))
  }
}

export { getFolder, getFolderAll, getFolderCache }
