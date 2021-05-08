import express from 'express';
import * as queryControlller from '../controllers/query'

// valiables de entorno
import dotenv from "dotenv"

const pdf = require('express-pdf');
const ejs = require('ejs');

dotenv.config();

const api = express()


api.use(pdf);
api.set('view engine', 'ejs');

api.set('views', `${process.cwd()}/src/views`);

api.get('/view/user', async (req, res) => {

    const data = queryControlller.query_users();

    function show() {
        console.log('holi');
    }

    res.render('pages/query', {
        info: await data,
        x: show
    });
});

api.get('/pdf/user', async (req, res) => {

    const data = queryControlller.query_users();

    const html = await ejs
        .renderFile(`${process.cwd()}/src/views/pages/query.ejs`, {
            info: await data,
        })
        .then((output) => output);



    res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent: html,
        options: {
            "format": "Letter",
            "border": {
                "right": "5mm",
                "left": "5mm",
            }
        }

    });
});


export {
    api as query
};