'use strict';

const { testing } = require('./controller/index')

module.exports.hello = async (event, context, callback) => {
  const result = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
  callback(null, result)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.test = async (event, context, callback) => {
  testing(event, context, callback);
};

