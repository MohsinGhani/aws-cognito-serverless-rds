const { client } = require("./../lib/db");

function getUserById(event, context, callback) {
    let { user_id } = event.pathParameters
    return client.query(`SELECT * FROM public."User" WHERE user_id='${user_id}'`)
        .then((data) => {
            if (data.rowCount) {
                const result = {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: data.rows[0],
                        rowCount: data.rowCount,
                    }),
                };
                context.succeed(result)
            } else {
                const result = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: `'${user_id}' id does not exist`,
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

exports.getUserById = getUserById