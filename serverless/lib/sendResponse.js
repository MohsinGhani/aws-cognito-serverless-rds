const sendSuccessRes = (context, statusCode, data, message) => {
    const result = {
        statusCode,
        body: JSON.stringify({
            data,
            message
        }),
    };
    context.succeed(result)
}

const sendErrorRes = (context, statusCode, err) => {
    const error = {
        statusCode,
        body: JSON.stringify({
            error: err,
            message: err.message,
            stack: err.stack ? err.stack : err.message,
        }),
    };
    context.succeed(error)
}

module.exports = { sendSuccessRes, sendErrorRes }