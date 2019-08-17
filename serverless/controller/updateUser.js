const { client } = require("./../lib/db");

function updateUser(event, context, callback) {
    let { user_id } = event.pathParameters
    let { firstname, lastname, phone } = JSON.parse(event.body);
    const updateUserQuery = `
        UPDATE public."User" SET 
            firstname='${firstname}',
            lastname='${lastname}',
            phone='${phone}'
        WHERE user_id='${user_id}' RETURNING *`
    return client.query(updateUserQuery)
        .then((data) => {
            if (data.rowCount) {
                const result = {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: data.rows[0],
                        message: `Successfull updated user with '${user_id}' id`,
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

exports.updateUser = updateUser