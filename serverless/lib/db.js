const { Client } = require('pg');
const Credentials = require('../config/credentials');

const connectionString = Credentials.DATABASE_URL

const client = new Client({
    connectionString: connectionString,
})

client.connect()

exports.client = client;