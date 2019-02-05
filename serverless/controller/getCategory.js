const { client } = require("./../lib/db");

function getCategory(event, context, callback) {
    return client.query(`SELECT * FROM public."Category"`)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows,
                    rowCount: data.rowCount,
                }),
            };
            callback(null, result)
            client.end();
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
            callback(null, error)
            client.end();
        })
}

exports.getCategory = getCategory