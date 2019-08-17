const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

function postSocialAuth(event, context, callback) {
    let { user_id, firstname, lastname, email } = JSON.parse(event.body);
    const SignUpUserQuery = `
        INSERT INTO public."User" (user_id, firstname, lastname, email, auth_time) 
        VALUES(
            '${user_id}',
            '${firstname}',
            '${lastname}',
            '${email}',
            now()
        ) RETURNING *
    `
    return client.query(`SELECT * FROM public."User" WHERE user_id='${user_id}'`)
        .then((data) => {
            console.log('data.rows', data.rows, data.rowCount)
            if (data.rows && data.rows.length && data.rowCount) {
                sendSuccessRes(context, 200, data.rows[0], `Successfull add user in database with '${user_id}' id`)
            }
            else {
                return client.query(SignUpUserQuery)
                    .then((data) => {
                        sendSuccessRes(context, 200, data.rows[0], `Successfull add user in database with '${user_id}' id`)
                    })
                    .catch((err) => {
                        sendErrorRes(context, 500, err)
                    })
            }
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

exports.postSocialAuth = postSocialAuth