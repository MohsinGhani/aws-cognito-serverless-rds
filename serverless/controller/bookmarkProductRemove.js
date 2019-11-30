const { client } = require("./../lib/db");

function bookmarkProductRemove(event, context, callback) {
    let { product_id, user_id } = event.pathParameters
    return client.query(`DELETE FROM public."Bookmark" WHERE product_id='${product_id}' AND user_id='${user_id}' RETURNING *`)
        .then((data) => {
            if (data.rowCount) {
                const result = {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: data.rows[0],
                        message: `Successfull remove product from bookmark`,
                    }),
                };
                context.succeed(result)
            } else {
                const result = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: `'${product_id}' id does not exist`,
                    }),
                };
                context.succeed(result)
            }
        })
        .catch((err) => {
            const error = {
                statusCode: 500,
                body: JSON.stringify({
                    error: err,
                    message: err.message,
                    stack: err.stack,
                }),
            };
            context.succeed(error)
        })
}

exports.bookmarkProductRemove = bookmarkProductRemove