import General from '../model/general'

import { parseDataKnex } from '../utils/tools'

const query = new General('query')

async function queryUsersView () {
  const sql = 'Select * From users'

  return await query.raw(sql).then((data) => parseDataKnex(data))
}

async function queryView () {
  const sql = 'Select * From users'

  return await query.raw(sql)
}

export { queryUsersView, queryView }
