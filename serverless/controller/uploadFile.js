const { client } = require("./../lib/db");
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const serverConfig = require('./../config/credentials')
const multipart = require('aws-lambda-multipart-parser');
const { sendSuccessRes, sendErrorRes } = require('./../lib/sendResponse')

AWS.config.update({
    region: serverConfig.REGION,
    accessKeyId: serverConfig.ACCESS_KEY,
    secretAccessKey: serverConfig.SECRET_KEY
})

function uploadToS3(file, foldername) {
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

function uploadFile(event, context, callback) {
    const { file } = multipart.parse(event, false)
    console.log('file', file)
    uploadToS3(file, "products").then((data) => {
        sendSuccessRes(context, 200, file, `Successfull add image`)
    }).catch((err) => {
        sendErrorRes(context, 500, err)
    })
}

exports.uploadFile = uploadFile