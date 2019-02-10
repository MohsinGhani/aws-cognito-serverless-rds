const { client } = require("./../lib/db");

function getProducts(event, context, callback) {
    const getAllProductsQuery = `
        SELECT P.*, 
            (SELECT COUNT(PL.action) as _like FROM public."Product_Like" PL WHERE PL.product_id=P.product_id AND PL.action=true),
            (SELECT COUNT(PL.action) as _dislike FROM public."Product_Like" PL WHERE PL.product_id=P.product_id AND PL.action=false),
            (SELECT COUNT(PL.action) as _action FROM public."Product_Like" PL WHERE PL.product_id=P.product_id),
            _comments
        FROM public."Product" P
        LEFT JOIN LATERAL (
            SELECT
            json_agg(
                json_build_object(
                    'comment_id', com.comment_id,
                    'user_id', com.user_id,
                    'comment', com.comment,
                    'time', com.time
                ) 
            ) _comments
            FROM public."Comment" com WHERE com.product_id=P.product_id
        )_comments ON true
    `
    return client.query(getAllProductsQuery)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows,
                    rowCount: data.rowCount,
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

exports.getProducts = getProducts