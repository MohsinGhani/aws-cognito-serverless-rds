const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function sendFeedback(event, context, callback) {
    let { id, email, description } = JSON.parse(event.body);
    return client.query(`INSERT INTO public."Feedback" (id, email, description, created_timestamp) VALUES('${id}', '${email}','${description}', '${new Date().getTime()}')`)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows[0], 'success', data.rowCount)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.sendFeedback = sendFeedback