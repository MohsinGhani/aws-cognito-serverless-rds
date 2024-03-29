const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function postConfirmation(event, context, callback) {
    let { user_id } = event.pathParameters
    const postConfirmationUserQuery = `UPDATE public."User" SET verified=true WHERE user_id='${user_id}' RETURNING *`
    return client.query(postConfirmationUserQuery)
        .then((data) => {
            if (data.rowCount) {
                sendSuccessRes(context, 200, data.rows[0], `Successfull verified user in database with '${user_id}' id`)
            } else {
                sendErrorRes(context, 404, { message: `'${user_id}' id does not exist` })
            }
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.postConfirmation = postConfirmation