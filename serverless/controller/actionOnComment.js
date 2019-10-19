const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function actionOnComment(event, context, callback) {
    let { comment_id, user_id, action, id } = JSON.parse(event.body);
    if (!comment_id || !user_id || !id) sendErrorRes(context, 500, { message: `request body is invalid` })

    client.query(`SELECT EXISTS(SELECT * from public."Comment_Action" WHERE user_id='${user_id}' AND comment_id='${comment_id}')`).then((data) => {
        if (data.rows[0] && data.rows[0].exists) {
            client.query(`UPDATE public."Comment_Action" SET action='${action}' WHERE user_id='${user_id}' AND comment_id='${comment_id}' RETURNING *`)
                .then((data) => {
                    sendSuccessRes(context, 200, data.rows[0], `Successfull ${action ? 'like' : 'dislike'} comment '${comment_id}'`)
                })
                .catch((err) => {
                    sendErrorRes(context, 500, err)
                })
        }
        else {
            client.query(`INSERT INTO public."Comment_Action" (comment_id, user_id, action, id) VALUES('${comment_id}','${user_id}', '${action}', '${id}') RETURNING *`)
                .then((data) => {
                    sendSuccessRes(context, 200, data.rows[0], `Successfull ${action ? 'like' : 'dislike'} comment '${comment_id}'`)
                })
                .catch((err) => {
                    sendErrorRes(context, 500, err)
                })
        }
    }).catch((err) => {
        sendErrorRes(context, 500, err)
    })
}

exports.actionOnComment = actionOnComment