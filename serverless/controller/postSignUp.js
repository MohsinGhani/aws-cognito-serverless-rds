const { client } = require("./../lib/db");

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
    )`
    return client.query(SignUpUserQuery)
        .then((data) => {
            const result = {
                statusCode: 200,
                body: JSON.stringify({
                    data: data.rows[0],
                    message: `Successfull add user in database with '${user_id}' id`,
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

exports.postSignUp = postSignUp