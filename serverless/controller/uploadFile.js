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

const getContentType = (event) => {
    let contentType = event.headers['content-type']
    if (!contentType) {
        return event.headers['Content-Type'];
    }
    return contentType;
};

const parser = (event) => new Promise((resolve, reject) => {
    const busboy = new Busboy({
        headers: {
            'content-type': getContentType(event),
        }
    });

    const result = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log('file found', fieldname, file, filename, encoding, mimetype)
        file.on('data', data => {
            result.file = data;
        });

        file.on('end', () => {
            result.filename = filename;
            result.contentType = mimetype;
        });
    });

    busboy.on('field', (fieldname, value) => {
        result[fieldname] = value;
    });

    busboy.on('error', error => reject(`Parse error: ${error}`));
    event.body = result;
    busboy.on('finish', () => {
        console.log('finish event.body', event.body)
        resolve(event)
    });

    // busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
});

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
    parser(event)
    .then((data)=>{
        sendSuccessRes(context, 200, data, `Successfull add image`)
    })
    .catch((err)=>{
        sendErrorRes(context, 500, err)
    })
    // const { file } = multipart.parse(event, false)
    // console.log('file', file)
    // uploadToS3(file, "products").then((data) => {
    //     sendSuccessRes(context, 200, file, `Successfull add image`)
    // }).catch((err) => {
    //     sendErrorRes(context, 500, err)
    // })
}

exports.uploadFile = uploadFile