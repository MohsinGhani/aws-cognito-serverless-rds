const { client } = require("./../lib/db");

function deleteCategory(event, context, callback) {
    let { category_id } = event.pathParameters
    return client.query(`DELETE FROM public."Category" WHERE category_id='${category_id}' RETURNING *`)
        .then((data) => {
            if (data.rowCount) {
                const result = {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: data.rows[0],
                        message: `Successfull deleted category with '${category_id}' id`,
                    }),
                };
                context.succeed(result)
            } else {
                const result = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: `'${category_id}' id does not exist`,
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

exports.deleteCategory = deleteCategory