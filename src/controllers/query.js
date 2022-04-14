import general from '../model/general'

import { parseDataKnex } from '../utils/tools'

const auth = new general('auth')

async function query_users_view () {
  const sql = 'Select * From users'

  return await auth.raw(sql).then((data) => parseDataKnex(data))
}

async function query_users () {
  const sql = 'Select * From users'

  return await auth.raw(sql)
}

export { query_users_view, query_users }
