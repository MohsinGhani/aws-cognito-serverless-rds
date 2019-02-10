const sendSuccessRes = (context, statusCode, data, message, rowCount) => {
    const result = {
        statusCode,
        body: JSON.stringify({
            data,
            message,
            rowCount: rowCount ? rowCount : undefined
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