const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')   

function postSignUp(event, context, callback) {
    let { user_id, firstname, lastname, email, verified, phone } = JSON.parse(event.body);
    const SignUpUserQuery = `
    INSERT INTO public."User" (user_id, firstname, lastname, email, verified, phone, auth_time) 
    VALUES(
        '${user_id}',
        '${firstname}',
        '${lastname}',
        '${email}',
        '${verified}',
        '${phone}',
        now()
    ) RETURNING *`
    return client.query(SignUpUserQuery)
        .then((data) => {
            sendSuccessRes(context, 200, data.rows[0], `Successfull add user in database with '${user_id}' id`)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.postSignUp = postSignUp