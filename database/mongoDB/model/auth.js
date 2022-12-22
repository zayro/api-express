const User = require("./user");
const express = require("express");
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const moment = require("moment");
const {
    compareEncryptedData,
    encrypt
} = require("../../src/utils/tools");

const router = express.Router();

const message = (status, response, message, token = null) => {
    const data = {};
    data.status = status;
    data.data = response;
    data.message = message;
    data.token = token;

    return data;
};

// ---------------------------------------------------------
// authentication (no middleware necessary since this is not authenticated)
// ---------------------------------------------------------
//

router.post("/login", function (req, res) {
    var query = {
        username: req.body.username
    };

    User.findOne(query)
        .then((response) => {
            if (response.length < 1) {
                return res.status(401).json({
                    message: "Email no Valid",
                });
            }

            try {
                const validPass = compareEncryptedData(
                    req.body.password,
                    response.password
                );
                console.log(validPass);

                if (!validPass) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    message: "Error Auth failed",
                });
            }

            if (!response) {
                return res
                    .status(400)
                    .json(message(true, response, "no se pudo encontrar registros"));
            } else {
                let token = "";
                const payload = {
                    email: response.email,
                    sub: response._id,
                    iat: moment().unix(),
                    //exp: moment().add(1, "day").unix()
                };

                token = jwt.sign(payload, `${process.env.TOKENSECRET}`, {
                    expiresIn: moment().add(1, "day").unix(), // expires in 24 hours
                });

                return res
                    .status(200)
                    .json(message(true, response, "Se consulto exitosamente", token));
            }
        })
        .catch((err) => {
            return res
                .status(500)
                .json(message(false, err, "Ocurrio un problema al consultar"));
        });
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/test/", (req, res) => {
    res.send("Hello World");
});

module.exports = router;