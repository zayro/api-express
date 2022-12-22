import { faker } from '@faker-js/faker'

import { connection } from '../src/db/index'

const knex = connection('enterprise')

for (let i = 0; i <= 1000; i++) {
  const stm = `INSERT INTO demo.prueba (name, address, phone) values ('${faker.name.firstName()}','${faker.address.streetAddress()}','${faker.phone.number()}')`
  // console.log('🚀 ~ stm', stm)
  knex.raw(stm).then((reponse) => {
    // console.log(reponse)
  })
    .catch((error) => console.log(error))
}
