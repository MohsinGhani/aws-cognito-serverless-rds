const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function doComment(event, context, callback) {
    const { comment_id, user_id, product_id, comment } = JSON.parse(event.body);
    const saveCommentQuery = `INSERT INTO public."Comment" (comment_id, user_id, product_id, comment, created_timestamp) 
    VALUES(
        '${comment_id}',
        '${user_id}',
        '${product_id}',
        '${comment}',
        '${new Date().getTime()}'
    ) RETURNING *`

    return client.query(saveCommentQuery)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows[0], `Successfull comment on product '${product_id}'`)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.doComment = doComment