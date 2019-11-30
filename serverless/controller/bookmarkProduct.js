const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function bookmarkProduct(event, context, callback) {
    const { user_id, product_id } = JSON.parse(event.body);
    const bookmarkProductQuery = `
        INSERT INTO public."Bookmark" (user_id, product_id, created_timestamp) 
        VALUES(
            '${user_id}',
            '${product_id}',
            '${new Date().getTime()}'
        ) RETURNING *
    `
    return client.query(`SELECT * FROM public."Bookmark" b WHERE b.user_id='${user_id}' AND b.product_id='${product_id}'`)
        .then((data) => {
            if (!data.rowCount) {
                return client.query(bookmarkProductQuery)
            }
            else {
                return { error: "you already have bookmarked this product" }
            }
        })
        .then((data) => {
            if (data.error) {
                sendErrorRes(context, 500, data.error)
            }

            sendSuccessRes(context, 200, data.rows[0], `Successfull bookmarked product '${product_id}'`)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.bookmarkProduct = bookmarkProduct