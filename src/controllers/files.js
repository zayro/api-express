
import { getFiles, getAllFilesObject, message } from '../utils/tools'

function getFolder (req, res) {
  const pathFolder = req.query.path
  try {
    const response = getFiles(pathFolder, req.headers.host)

    return res.status(200).json(message(true, 'respuesta exitosa', response))
  } catch (error) {
    console.log('🚀 ~ getFolder ~ error', error)

    return res.status(500).json(message(false, 'no se encontraron files getAll', error))
  }
}

function getFolderAll (req, res) {
  try {
    const response = getAllFilesObject('./public/uploads')

    return res.status(200).json(message(true, 'respuesta exitosa', response))
  } catch (error) {
    console.log('🚀 ~ getFolderAll ~ error', error)

    return res.status(500).json(message(false, 'no se encontraron files getAll', error))
  }
}

export { getFolder, getFolderAll }
