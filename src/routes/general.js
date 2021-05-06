import
express
from 'express';

import jwt from 'express-jwt'

import permission from 'express-jwt-permissions'

import * as generalControlller from '../controllers/general'

import {
    check,
    body,
    validationResult
} from 'express-validator';

import fileUpload from 'express-fileupload'

import multer from 'multer';



// valiables de entorno
import dotenv from "dotenv"

dotenv.config();

const api = express()

var cache = require('express-redis-cache')();

const guard = permission()

const secret = {
    secret: process.env.TOKENSECRET,
    algorithms: ['HS256']
}


api.get('/general/folder', cache.route({
    type: 'json',
    expire: 60
}), generalControlller.getFolder);

api.use(jwt(secret));

api.get('/general/select/:table', guard.check(['admin']), generalControlller.getAll);

api.post('/general/search', check('from').notEmpty(), check('fields').notEmpty(), guard.check(['admin']), generalControlller.search);



//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);

    },
});



// Multer Filter
const multerFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
        cb(null, true);
    } else {
        cb(new Error("Error en el tipo de archivo."), false);
    }
};

const upload = multer({
    //dest: 'src/uploads/',
    storage: multerStorage,
    fileFilter: multerFilter,
});

api.post('/simpleUpload', function (req, res) {
    console.log(req.files.archivo); // the uploaded file object


    var sampleFile = req.files.archivo;
    var filePath = "./src/uploads/" + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(filePath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    res.send('File uploaded!');
});


api.post('/uploadArray', upload.array('archivo', 2), function (req, res) {

    console.log(req.files)
    var file = req.files;
    res.end();

});
api.post('/uploadSingle', upload.single('archivo'), function (req, res) {

    console.log(req.files)
    var file = req.files;
    res.end();

});

var cpUpload = upload.fields([{
    name: 'archivo',
    maxCount: 1
}, {
    name: 'gallery',
    maxCount: 8
}])
api.post('/upload', cpUpload, function (req, res) {

    console.log(req.files)
    var file = req.files;
    res.end();

});

export {
    api as general
};