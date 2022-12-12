# Guia Examen API - Express

El exámen está generado una api backend escrito en NodeJS y PostgreSql el cual expondráuna API REST para la interacción con la aplicación frontend

## instalar el aplicativo

Se debe tener instalado

- nodejs
- npm

clonar el repositorio y ejecutar el comando `npm install`

## Ejecutar aplicacion entorno desarrollo local

- [x] install postgresql y agregar base de datos ubicado en la carpeta db
- [x] npm start
- [x] npm run start:dev
- [x] npm test
- [x] npm lint
- [x] npm build

## Status Codes

devuelve los siguientes códigos de estado en el API:

| Status Code | Description             |
| ----------- | ----------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## Responses

API devuelven la representación JSON de los recursos creados o editados. Sin embargo, si se envía una solicitud no válida o se produce algún otro error, devuelve una respuesta JSON en el siguiente formato:

```json
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

El atributo `mensaje` contiene un mensaje comúnmente utilizado para indicar errores o, en el caso de eliminar un recurso, el éxito de que el recurso se eliminó correctamente.

El atributo `status` describe si la transacción fue exitosa o no.

El atributo `data` contiene cualquier otro metadato asociado con la respuesta. Esta será una cadena escapada que contiene datos JSON.


### Development Local

Ejecutar `npm run start:dev` permite navegar localmente `http://localhost:3000/`. la aplicacion automaticamente se recarga segun los cambios que se afecten.

### Documentacion

 Versions by Postman

URL
[https://documenter.getpostman.com/view/473681/SzzoZaUs](https://documenter.getpostman.com/view/473681/SzzoZaUs)

### delete cache .env

git rm env --cached
git rm env.local --cached

## Funcionalidad

1. Autenticacion con Token - Express-Jwt
2. Autorizacion con Token - Express-Permission
3. Upload Files - Murder
4. Sql Orm - Knex

## Config Lint

1. Project con Eslint

### Pre-Install with Windows

Visual Studio Build Tools

- npm install node-pre-gyp -g
- npm install -g node-gyp
- npm config set msvs_version 2017


### Activar SSÑ

<https://ourcodeworld.co/articulos/leer/261/como-crear-un-servidor-http-con-express-en-nodejs>

- openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout c:/key.pem -out c:/cert.pem
- openssl req -newkey rsa:2048 -new -nodes -keyout c:/key.pem -out c:/csr.pem
