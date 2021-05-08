import general from '../model/general';

import {
    parseDataKnex
} from '../utils/tools';


async function query_users() {

    const sql = "Select * From users";

    return await general.raw(sql).then(data => parseDataKnex(data))

}



export {
    query_users,
}