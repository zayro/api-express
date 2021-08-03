require("longjohn")

require('dotenv').config()

var colors = require('colors');
colors.enable();

//node myapp.js --color

import app from "./src/app.js"
import config from "./src/config/config.js"


app.listen(process.env.PORT, () => {
    console.log(`API REST corriendo en el puerto ${process.env.PORT}`.blue)
    console.log(`http://localhost:${process.env.PORT}/api-docs`.green)
    console.log(`http://localhost:${process.env.PORT}/api/vi`.green)  
})
