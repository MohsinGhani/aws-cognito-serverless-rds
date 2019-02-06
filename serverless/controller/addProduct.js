const { client } = require("./../lib/db");

function addProduct(event, context, callback) {
    const { product_id, title, description, country, state, city, street_address, latitude, longitude, creator_id } = JSON.parse(event.body);
    const addProductQuery = `INSERT INTO public."Product" (product_id, title, description, country, state, city, street_address, latitude, longitude, creator_id, created_date) 
    VALUES(
        '${product_id}',
        '${title}',
        '${description}',
        '${country}',
        '${state}',
        '${city}',
        '${street_address}',
        '${latitude}',
        '${longitude}',
        '${creator_id}',
        now()
    )`
    
    return client.query(addProductQuery)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows[0],
                    message: `Successfull add product with '${product_id}' id`,
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

exports.addProduct = addProduct