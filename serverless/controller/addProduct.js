const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

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
            sendSuccessRes(context, 200, data.rows[0], `Successfull add product with '${product_id}' id`)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.addProduct = addProduct