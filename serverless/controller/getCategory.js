const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function getCategory(event, context, callback) {
    return client.query(`SELECT * FROM public."Category"`)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows, 'success', data.rowCount)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.getCategory = getCategory