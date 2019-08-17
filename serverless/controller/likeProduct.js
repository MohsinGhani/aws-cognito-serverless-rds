const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function likeProduct(event, context, callback) {
    let { product_id, user_id, action } = JSON.parse(event.body);
    if (!product_id || !user_id) sendErrorRes(context, 500, { message: `request body is invalid` })

    client.query(`SELECT EXISTS(SELECT * from public."Product_Like" WHERE user_id='${user_id}' AND product_id='${product_id}')`).then((data) => {
        if (data.rows[0] && data.rows[0].exists) {
            client.query(`UPDATE public."Product_Like" SET action='${action}' WHERE user_id='${user_id}' AND product_id='${product_id}' RETURNING *`)
                .then((data) => {
                    sendSuccessRes(context, 200, data.rows[0], `Successfull ${action ? 'like' : 'dislike'} product '${product_id}'`)
                })
                .catch((err) => {
                    sendErrorRes(context, 500, err)
                })
        }
        else {
            client.query(`INSERT INTO public."Product_Like" (product_id, user_id, action) VALUES('${product_id}','${user_id}', '${action}') RETURNING *`)
                .then((data) => {
                    sendSuccessRes(context, 200, data.rows[0], `Successfull ${action ? 'like' : 'dislike'} product '${product_id}'`)
                })
                .catch((err) => {
                    sendErrorRes(context, 500, err)
                })
        }
    }).catch((err) => {
        sendErrorRes(context, 500, err)
    })
}

exports.likeProduct = likeProduct