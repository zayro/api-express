import general from "../model/general"

const auth = new general("auth")

import { parseDataKnex } from "../utils/tools"

async function query_users_view() {
  const sql = "Select * From users"

  return await auth.raw(sql).then((data) => parseDataKnex(data))
}

async function query_users() {
  const sql = "Select * From users"

  return await auth.raw(sql)
}

export { query_users_view, query_users }
