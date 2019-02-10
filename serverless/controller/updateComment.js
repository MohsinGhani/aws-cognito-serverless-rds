const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function updateComment(event, context, callback) {
    const { comment_id } = event.pathParameters
    const { comment } = JSON.parse(event.body);
    return client.query(`UPDATE public."Comment" SET comment='${comment}' WHERE comment_id='${comment_id}' RETURNING *`)
        .then((data) => {
            if (data.rowCount) {
                sendSuccessRes(context, 200, data.rows[0], `Successfull edit comment with '${comment_id}' id`)
            } else {
                sendErrorRes(context, 404, { message: `'${comment_id}' id does not exist` })
            }
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.updateComment = updateComment