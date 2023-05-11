import General from '../model/general'

const query = new General(process.env.PGDATABASE)

async function queryUsersView () {
  const sql = 'select * from demo.prueba'
  return await query.raw(sql).then((data) => data)
}

async function queryView () {
  const sql = 'Select * From users'

  return await query.raw(sql)
}

export { queryUsersView, queryView }
