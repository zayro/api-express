const bcrypt = require("bcrypt");

const encrypt = (data) => {
    return bcrypt.hashSync(data, 10);
};

const mcrypt = encrypt('123456');

console.log(mcrypt);

const valid = bcrypt.compareSync('123456', mcrypt);
console.log("valid", valid);





const knex = require('knex');
const config = require('../config/config')

const connection_defalt = knex(config.db_mysql);


connection_defalt('users').select('username', 'password').then(response => {
        //console.log(`🚧 ~ file: auth.js ~ line 15 ~ awaitgeneral.raw ~ resp`, JSON.parse(JSON.stringify(response)));

        const resp = response[0];

        //return res.status(200).json(message(true, 'respuesta exitosa', reponse));
    })
    .catch((err) => {
        console.log(`🚧 ~ file: auth.js ~ line 66 ~ login ~ err`, err);
        return res
            .status(500)
            .json(message(false, err, "Ocurrio un problema al consultar"));
    });

connection_defalt.raw("select * from  users limit 1 ").then(response => {
        console.log(`🚧 ~ file: auth.js ~ line 15 ~ awaitgeneral.raw ~ resp`, JSON.parse(JSON.stringify(response[0])));

        const resp = response[0];

        //return res.status(200).json(message(true, 'respuesta exitosa', reponse));
    })
    .catch((err) => {
        console.log(`🚧 ~ file: auth.js ~ line 66 ~ login ~ err`, err);
        return res
            .status(500)
            .json(message(false, err, "Ocurrio un problema al consultar"));
    });