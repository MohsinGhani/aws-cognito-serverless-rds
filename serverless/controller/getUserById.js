const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function getUserById(event, context, callback) {
    let { user_id } = event.pathParameters
    return client.query(`SELECT * FROM public."User" WHERE user_id='${user_id}'`)
        .then((data) => {
            if (data.rowCount) {
                sendSuccessRes(context, 200, data.rows[0], 'success', data.rowCount)
            } else {
                sendErrorRes(context, 500, { message: `'${user_id}' id does not exist` })
            }
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.getUserById = getUserById