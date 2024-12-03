const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const config = require('./config/app.js');

const PORT = process.env.PORT || 3000;

// Custom Middlewares
const assetMiddleware = require('./app/middleware/assetMiddleware');
const {verifyApiToken, verifyAuthToken} = require('./app/middleware/apiToken.js');

// Create Express Object
const app = express();
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
	secret: config.session_secret_key,
	resave: false,
	saveUninitialized: false,
	// cookie: { maxAge: 3600000 } // Session expiration time in milliseconds (optional)
}));
app.use(flash());

// Middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(assetMiddleware);
app.use('/assets', express.static(path.join(__dirname, 'assets')))


// ========= Api Router ========= //
const apiTokenRouter = require('./routes/api_token.js');;
const authApiRouter = require('./routes/api_auth.js');
const apiRouter = require('./routes/api.js');

app.use('/api/v1/', apiTokenRouter);
app.use('/api/v1/', verifyApiToken, authApiRouter);
app.use('/api/v1/', verifyApiToken, verifyAuthToken, apiRouter);



app.get('/', async function (req, res) {	
  	res.send(`HOCKEY API Server Running on port ${PORT}!`);
});


app.listen(PORT, function () {
  	console.log(`HOCKEY API Server listening on port ${PORT}!`);
});
