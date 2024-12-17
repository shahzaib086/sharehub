require("dotenv").config();
const { Client: Client7 } = require('es7')

const environment = process.env.NODE_ENV || "development";

const client7 = new Client7({
    node: process.env.ELASTIC_SEARCH_HOST,
    ssl: {
        rejectUnauthorized: false,
    },
    auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD
    },
})

module.exports = client7;