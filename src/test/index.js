//apiTest.js
const request = require('supertest');
const app = require('../../app');
const expect = require('chai').expect;
const knex = require('../db')

//==================== user API test ====================

before(async () => {
    await console.log('antes de ...');

});

after(async () => {
    await console.log('despues de ...');
});

/**
 * Testing get all user endpoint
 */
describe('GET /cliente', function () {
    it('respond with json containing a list of all cliente', function (done) {
        request(app)
            .get('/api/v1/cliente')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.status).to.equal(200);
                done()
            });
    });
});




describe('POST /cliente', () => {
    it('respond with json containing to create support ticket', function (done) {
        request(app)
            .post('/api/v1/client')
            .send({
                "identificacion_cliente": "102030",
                "descripcion": "arrego del tv"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                done()
            });

    });
});


describe('PUT /cliente/1', () => {
    it('respond with json containing to create support ticket', function (done) {
        request(app)
            .put('/api/v1/cliente/1')
            .send({
                "calificacion": 10
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            });

    });
});