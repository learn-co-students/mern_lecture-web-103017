'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./models/comments')
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
mongoose.connect(`mongodb://${username}:${password}@${dbName}`)
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

router.route('/')
.get((request,response) => {
	response.json({message: "Welcome to the Express Train"})
})
.post((req, res) => {
	res.json({body: req.body})
})

router.route('/comments')
.post((req,res) => {
	let comment = new Comment()
	comment.author = req.body.author
	comment.text = req.body.text

	comment.save((err) => {
		if (err){
			res.send(err)
		} else {
			res.send({comment})
		}
	})
})
.get((req, res) => {
	Comment.find(null, (err,comments) => {
		if (err) {
			res.send(err)
		} else {
			res.json({comments})
		}
	})
})

router.route('/comments/:id')
.delete((req,res) => {
	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			res.send(err)
		} else {
			Comment.remove({_id: req.params.id}, (err) => {
				if (err) {
					res.send(err)
				} else {
					res.json({message: `Successfully deleted comment ${req.params.id}!`})
				}
			})
		}
	})
})

//END ROUTES/////////

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, () => {
 console.log(`api running on port ${port}`);
});