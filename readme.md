# Guia Examen API - IMAGINAMOS

El exámen está generado una api backend escrito en NodeJS y PostgreSql el cual expondráuna API REST para la interacción con la aplicación frontend

## instalar el aplicativo

Se debe tener instalado

-   nodejs
-   npm

clonar el repositorio y ejecutar el comando `npm install`

## Ejecutar aplicacion entorno desarrollo local

-   [x] install postgresql y agregar base de datos ubicado en la carpeta db
-   [x] npm start
-   [x] npm run start-dev
-   [x] npm test

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

```
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

El atributo `mensaje` contiene un mensaje comúnmente utilizado para indicar errores o, en el caso de eliminar un recurso, el éxito de que el recurso se eliminó correctamente.

El atributo `status` describe si la transacción fue exitosa o no.

El atributo `data` contiene cualquier otro metadato asociado con la respuesta. Esta será una cadena escapada que contiene datos JSON.

### Despligue aplicacion cloud Heroku

el aplicativo se testeo con heroku subiendo el proyecto con un deploy en heroku manejando estandares de calidad en el desarrollo.

URL BACK-END
https://api-imaginamos.herokuapp.com/

### Development Local

Ejecutar `npm run start-dev` permite navegar localmente `http://localhost:3000/`. la aplicacion automaticamente se recarga segun los cambios que se afecten.

### Documentacion

Imaginamos Versions by Postman

URL
[https://documenter.getpostman.com/view/473681/SzzoZaUs](https://documenter.getpostman.com/view/473681/SzzoZaUs)

#### Puntos a evaluar:

● Diseño modelado de datos.

● API REST con sus endpoints y documentación.

-   Documentacion con Swagger

● Arquitectura de aplicación en NodeJS (express o
nest.js)

-   Arquitectura con Express

● Utilización del ORM.

-   Orm implementado es knex

● NO usar ningún boilerplate ni starter.
● Patrones de diseño utilizados.

-   MODELO - CONTROLADOR

#### Puntos extras:

● Escribir pruebas unitarias y/o de comportamiento.

-   Pruebas con supertest y mocha

● Virtualización local (docker).

-   Docker monolito con dockerFile

● Virtualización auto deploy (dokku, heroku,
kubernetes).

-   deploy con Heroku

● Documentación con swagger.

-   Documentacion incluida

● Utilizar typeScript.
● Utilizar Nest.js

# delete cache .env

git rm env --cached
git rm env.local --cached

## Funcionalidad

1. Autenticacion con Token - Express-Jwt
2. Autorizacion con Token - Express-Permission
3. Upload Files - Murder
4. Sql Orm - Knex
5.
