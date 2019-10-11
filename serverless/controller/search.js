const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function search(event, context, callback) {
    let { query } = event.pathParameters
    query = query.replace("%20", " ")
    const searchProductQuery = `
        SELECT * FROM public."Product" WHERE
            lower(title) LIKE '%${query.toLowerCase()}%' OR
            lower(description) LIKE '%${query.toLowerCase()}%' OR
            lower(country) LIKE '%${query.toLowerCase()}%' OR
            lower(state) LIKE '%${query.toLowerCase()}%' OR
            lower(city) LIKE '%${query.toLowerCase()}%'
    `  
    return client.query(searchProductQuery)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows, 'success', data.rowCount)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.search = search