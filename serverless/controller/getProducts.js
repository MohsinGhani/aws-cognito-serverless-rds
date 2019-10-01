const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function getProducts(event, context, callback) {
    const getAllProductsQuery = `
        SELECT P.*, 
            (SELECT COUNT(PL.action) as _like FROM public."Product_Like" PL WHERE PL.product_id=P.product_id AND PL.action=true),
            (SELECT COUNT(PL.action) as _dislike FROM public."Product_Like" PL WHERE PL.product_id=P.product_id AND PL.action=false),
            (SELECT COUNT(PL.action) as _action FROM public."Product_Like" PL WHERE PL.product_id=P.product_id),
            _comments,
            _creator
        FROM public."Product" P
        LEFT JOIN LATERAL (
            SELECT
            json_agg(
                json_build_object(
                    'comment_id', com.comment_id,
                    'user_id', com.user_id,
                    'comment', com.comment,
                    'time', com.created_timestamp
                ) 
            ) _comments
            FROM public."Comment" com WHERE com.product_id=P.product_id
        )_comments ON true
        LEFT JOIN LATERAL (
            SELECT
                json_build_object(
                    'user_id', us.user_id,
                    'firstname', us.firstname,
                    'lastname', us.lastname
                ) _creator
            FROM public."User" us WHERE us.user_id=P.creator_id
        )_creator ON true
    `
    return client.query(getAllProductsQuery)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows, 'success', data.rowCount)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.getProducts = getProducts