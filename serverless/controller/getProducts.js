const { client } = require("./../lib/db");

function getProducts(event, context, callback) {
    return client.query(`SELECT * FROM public."Product"`)
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