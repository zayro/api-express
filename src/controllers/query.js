import General from '../model/general'

import { parseDataKnex } from '../utils/tools'

const auth = new General('auth')

async function queryUsersView () {
  const sql = 'Select * From users'

  return await auth.raw(sql).then((data) => parseDataKnex(data))
}

async function queryView () {
  const sql = 'Select * From users'

  return await auth.raw(sql)
}

export { queryUsersView, queryView }
