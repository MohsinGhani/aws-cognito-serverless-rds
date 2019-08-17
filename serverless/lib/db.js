const { Client } = require('pg');
const Credentials = require('../config/credentials');

const connectionString = Credentials.DATABASE_URL

const client = new Client({
    connectionString: connectionString,
})

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

exports.client = client;