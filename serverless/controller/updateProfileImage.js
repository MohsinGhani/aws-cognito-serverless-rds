const { client } = require("./../lib/db");
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')
const serverConfig = require('./../config/credentials')
const AWS = require('aws-sdk');

AWS.config.update({
    region: serverConfig.REGION,
    accessKeyId: serverConfig.ACCESS_KEY,
    secretAccessKey: serverConfig.SECRET_KEY
})

function uploadToS3(file, foldername) {
    console.log('file to upload s3', file)
    let s3bucket = new AWS.S3({ params: { Bucket: `${serverConfig.BUCKET}/${foldername}` } });
    return new Promise((res, rej) => {
        s3bucket.createBucket(function () {
            var params = {
                Key: file.filename,
                Body: file.content
            };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    rej(err)
                }
                res(data)
            });
        });

    })
}

function updateProfileImage(event, context, callback) {
    let { user_img, user_id } = JSON.parse(event.body);
    user_img = JSON.parse(user_img)

    let decodedImage = Buffer.from(user_img.base64.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64');
    let file = {
        content: decodedImage,
        filename: user_img.name
    }

    uploadToS3(file, "users").then((data) => {
        const updateUserQuery = `
        UPDATE public."User" SET 
            picture='${data.Location}'
        WHERE user_id='${user_id}' RETURNING *`

        return client.query(updateUserQuery)
            .then((data) => {
                sendSuccessRes(context, 200, data.rows[0], `Successfull update profile picture`)
            })
            .catch((err) => {
                sendErrorRes(context, 500, err)
            })
    }).catch((err) => {
        sendErrorRes(context, 500, err)
    })
}

exports.updateProfileImage = updateProfileImage