const { client } = require("./../lib/db");

function sendFeedback(event, context, callback) {
    let { id, email, description } = JSON.parse(event.body);
    return client.query(`INSERT INTO public."Feedback" (id, email, description, created_timestamp) VALUES('${id}', '${email}','${description}', '${new Date().getTime()}')`)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows[0],
                    message: `Successfull send feedback with '${id}' id`,
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

exports.sendFeedback = sendFeedback