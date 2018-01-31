'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt')
var Comment = require('./models/comments');
var User = require('./models/users');
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
mongoose.connect(`mongodb://127.0.0.1:27017`)
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

//now we can set the route path & initialize the API
router.route('/')
.get((req, res) => {
	res.json({message: req.headers});
})

router.route('/login')
.post((req,res) => {
	//findOne returns single object
	User.findOne({username: req.body.username}, (err,user) => {
		if (err) {
			res.send(err)
		} else {
			bcrypt.compare(req.body.password, user.passwordDigest, (err, valid) => {
				if (err || !valid){
					res.json({error: "Incorrect login details!"})
				} else {
					res.json({username: user.username, _id: user._id})
				}
			})
		}

	})
})

router.route('/signup')
.post((req,res) => {
	var user = new User()
	var saltRounds = 10


	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		user.username = req.body.username
		user.passwordDigest = hash

		user.save((err) => {
			if (err) {
				res.send(err)
			} else {
				// res.json({username: user.username})
				res.json(user)
			}
		})
	})

})

router.route('/comments')
.get((req, res) => {
	//find returns an array
	Comment.find((err, comments) => {
		 if (err){
		 	res.send(err);
		 } else {
		 	res.json(comments)
		 }
	});
})
.post((req, res) => {
	var comment = new Comment();
	//body parser lets us use the req.body
	comment.author = req.body.author;
	comment.text = req.body.text;
	let num = Math.round(Math.random()*100)
	if (num < 50) {
		comment.werewolf = true
	}

	comment.save((err) => {
		if (err){
			res.send(err);
		} else {
			res.json({ comment });
		}
	});
});

router.route('/comments/:id')
.get((req, res) => {
	Comment.findById(req.params.id, (err, comment) => {
		if (err) {
			res.send(err);
		} else {
			comment.save((err) => {
				if (err) {
					res.send(err);
				} else {
					res.json({ comment });
				}
			});
		}
	});
})
.put((req,res) => {
	Comment.findById(req.params.id, (err,comment) => {
		if (err){
			res.send(err)
		} else {
			req.body.comment.author ? comment.author = req.body.comment.author : null
			req.body.comment.text ? comment.text = req.body.comment.text : null

			comment.save((err) => {
				if (err){
					res.send(err)
				} else {
					res.json({comment})
				}
			})
		}
	})
})
.delete((req,res) => {
	Comment.remove({_id: req.params.id}, (err) => {
		console.log(comment)
		if (err){
			res.send(err)
		} else {
			Comment.find((err, comments) =>{
				if (err){
					res.send(err)
				} else {
					res.json({comments})
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