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

function addProduct(event, context, callback) {
    let { product_id, title, description, country, state, city, street_address, latitude, longitude, creator_id, category_id, product_img } = JSON.parse(event.body);
    product_img = JSON.parse(product_img)

    let decodedImage = Buffer.from(product_img.base64.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64');
    let file = {
        content: decodedImage,
        filename: product_img.name
    }

    uploadToS3(file, "products").then((data) => {
        const addProductQuery = `INSERT INTO public."Product" (product_id, title, description, country, state, city, street_address, latitude, longitude, creator_id, category_id ,product_img, created_date) 
        VALUES(
            '${product_id}',
            '${title}',
            '${description}',
            '${country}',
            '${state}',
            '${city}',
            '${street_address}',
            '${latitude}',
            '${longitude}',
            '${creator_id}',
            '${category_id}',
            '${data.Location}',
            now()
        ) RETURNING *
    `
        return client.query(addProductQuery)
            .then((data) => {
                sendSuccessRes(context, 200, data.rows[0], `Successfull add product with '${product_id}' id`)
            })
            .catch((err) => {
                sendErrorRes(context, 500, err)
            })
    }).catch((err) => {
        sendErrorRes(context, 500, err)
    })
}

exports.addProduct = addProduct