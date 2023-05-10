import { faker } from '@faker-js/faker'

import { connection } from '../../src/db/index'

const knex = connection('enterprise')

for (let i = 0; i <= 50; i++) {
  const dateInfo = faker.date.betweens('2022-01-01', '2022-12-31', 1)

  const monto = faker.datatype.number({ min: 100000, max: 200000 })

  const stm = `INSERT INTO "adminApt".pagos (apartamento, administracion, fecha) values ('${faker.datatype.number({ min: 101, max: 505 })}', '${monto}', '${dateInfo[0].toJSON()}')`
  console.log('🚀 ~ stm', stm)

  knex.raw(stm).then((reponse) => {
    // console.log(reponse)
  })
    .catch((error) => console.log(error))
}
