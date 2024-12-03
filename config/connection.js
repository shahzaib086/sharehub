const {Client} = require('pg')
const knex = require("knex");
const knexFile = require("../knexfile.js");
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexFile[environment]);

    
// const mongoose = require('mongoose');

// const dbConfig = {
//     development: 'mongodb+srv://devshahzaib:kROIcCZbfoShKWHm@cluster0.s2vnk.mongodb.net/nplflix?retryWrites=true&w=majority&appName=Cluster0',
//     production: process.env.MONGO_URI_PROD || '',
// };

// const mongoUri = dbConfig[environment];

// mongoose.connect(mongoUri, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// })
// .then(() => {
//     console.log(`Connected to MongoDB (${environment})`);
// })
// .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
// });

// module.exports = mongoose;