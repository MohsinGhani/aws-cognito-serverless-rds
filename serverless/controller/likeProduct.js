const { client } = require("./../lib/db");

function likeProduct(event, context, callback) {
    let { product_id, user_id, action } = JSON.parse(event.body);
    return client.query(`INSERT INTO public."Product_Like" (product_id, user_id, action) VALUES('${product_id}','${user_id}', '${action}')`)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows[0],
                    message: `Successfull ${action ? 'like' : 'dislike'} product '${product_id}'`,
                }),
            };
            context.succeed(result)
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

exports.likeProduct = likeProduct