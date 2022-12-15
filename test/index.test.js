import request from 'supertest'
import app from '../src/app'
import { assert } from 'chai'

//= =================== user API test ====================

before(async () => {
  console.log('antes de ...')
})

after(async () => {
  console.log('despues de ...')
})

/**
 * Testing get all user endpoint
 */
describe('GET  /api/v1/general/select/demo.prueba', function () {
  it('respond with json containing a list of all users', async () => {
    await request(app)
      .get('/api/v1/general/select/demo.prueba')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.status, true) // response request have to be true
      })
  })
})
