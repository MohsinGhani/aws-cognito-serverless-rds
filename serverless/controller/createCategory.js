const { client } = require("./../lib/db");

function createCategory(event, context, callback) {
    let { category_id, title } = JSON.parse(event.body);
    return client.query(`INSERT INTO public."Category" (category_id, title) VALUES('${category_id}','${title}')`)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows[0],
                    message: `Successfull add category with '${category_id}' id`,
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

exports.createCategory = createCategory