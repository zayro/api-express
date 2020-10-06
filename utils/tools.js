const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const dotenv = require('dotenv');
dotenv.config();


const encrypt = (data) => {
    return bcrypt.hashSync(data, 10);
};


const compareEncryptedData = (password, hash) => {

    return bcrypt.compareSync(password, hash);
};


const message = (status, mensaje, response, ) => {

    const data = {};
    data.status = status;
    data.data = response;
    data.message = mensaje;

    return data;
};


const token = (data, expiresIn) => {

    const secret = `${process.env.TOKENSECRET}`;

    try {

        if (expiresIn) {

            return jwt.sign({ data }, secret, { expiresIn });

        }

        return jwt.sign({ data }, secret);


    } catch (err) {

        throw err;

    }

};


const checkToken = (tokens) => {

    const secret = `${process.env.TOKENSECRET}`;

    try {

        return jwt.verify(tokens, secret) !== 'undefined';

    } catch (err) {

        throw err;

    }

}


module.exports = { token, checkToken, message, encrypt, compareEncryptedData };