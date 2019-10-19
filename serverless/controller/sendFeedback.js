const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' });
const SES = new AWS.SES({ apiVersion: "2010-12-01" })

const emails = [
    "mohsinghani.777@gmail.com",
    "digitmatic@yahoo.com",
    "digitmaticllc@gmail.com"
]

function sendFeedback(event, context, callback) {
    let { id, email, description, subject } = JSON.parse(event.body);
    return client.query(`INSERT INTO public."Feedback" (id, email, description, created_timestamp) VALUES('${id}', '${email}','${description}', '${new Date().getTime()}')`)
        .then((data) => {
            return sendEmails(emails, `${email} sent a feedback, "${description}"`, subject)
        })
        .then(() => {
            sendSuccessRes(context, 200, null, 'success', 1)
        })
        .catch((err) => {
            sendErrorRes(context, 500, err)
        })
}

const sendEmails = (emails, msg, subject) => {
    let params = {
        Destination: {
            CcAddresses: ["digitmatic@yahoo.com"],
            ToAddresses: emails
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: msg
                },
                Text: {
                    Charset: "UTF-8",
                    Data: msg
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        Source: "digitmaticllc@gmail.com",
    };

    return SES.sendEmail(params).promise()
}

exports.sendFeedback = sendFeedback