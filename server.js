'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config()


//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;


//Connect Mongoose to target Mongo database
var username = process.env.DB_USER
var password = process.env.DB_PASSWORD
var dbName = process.env.DB_NAME
mongoose.connect(`mongodb://${username}:${password}${dbName}`)
//mongodb://sbal13:fitness@ds151207.mlab.com:51207/mern-practice-sbal13


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	//and remove cacheing so we get the most recent comments
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

//BEGIN ROUTES/////////


//END ROUTES/////////

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, () => {
 console.log(`api running on port ${port}`);
});