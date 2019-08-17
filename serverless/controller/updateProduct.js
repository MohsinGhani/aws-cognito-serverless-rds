const { client } = require("./../lib/db");

function updateProduct(event, context, callback) {
    const { product_id, creator_id } = event.pathParameters
    const { title, description, country, state, city, street_address, latitude, longitude } = JSON.parse(event.body);
    const updateProductQuery = `UPDATE public."Product" SET 
        title='${title}', 
        description='${description}', 
        country='${country}', 
        state='${state}', 
        city='${city}', 
        street_address='${street_address}', 
        latitude='${latitude}', 
        longitude='${longitude}' 
    WHERE product_id='${product_id}' AND creator_id='${creator_id}' RETURNING *`
    return client.query(updateProductQuery)
        .then((data) => {
            if (data.rowCount) {
                const result = {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: data.rows[0],
                        message: `Successfull updated product with '${product_id}' id`,
                    }),
                };
                context.succeed(result)
            } else {
                const result = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: `'${product_id}' product id does not exist with '${creator_id}' creator id`,
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

exports.updateProduct = updateProduct