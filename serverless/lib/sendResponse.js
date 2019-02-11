const sendSuccessRes = (context, statusCode, data, message, rowCount) => {
    const result = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
            data,
            message,
            status: statusCode,
            rowCount: rowCount ? rowCount : undefined
        }),
    };
    context.succeed(result)
}

const sendErrorRes = (context, statusCode, err) => {
    const error = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
            error: err,
            message: err.message,
            stack: err.stack ? err.stack : err.message,
        }),
    };
    context.succeed(error)
}

module.exports = { sendSuccessRes, sendErrorRes }