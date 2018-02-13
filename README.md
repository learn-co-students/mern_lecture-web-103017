# Getting Started with a MERN stack


### Packages 

1. Express
      * `npm i express`
      * Acts as the controller for our MVC, meaning it is used to create routes.

2. Body-Parser
      * `npm i body-parser`
      * Allows us to access the body of our request

3. Foreman
      * `npm i foreman`
      * Allows us to boot both front-end and back-end servers simultaneously with a single command

4. Nodemon
      * `npm i nodemon`
      * Watches changes to `server.js` and restarts the server automatically upon saving changes

5. Mongoose
      * `npm i mongoose`
      * Acts as the model for our MVC, providing a schema to interact with MongoDB.

### Setup

After running `create-react-app` to build out your client, the following needs to be setup. Keep in mind that this guide is primarily desgined to keep Express and React within the same repo. It is entirely possible (and likely) that you would want to separate the backend of Express from the frontend of React. In this case, your folder setup will be up to you, but the rest of the guide will still be relevant. 

1. Files/folders
      * `/models/`
        * This folder should be added to your root directory. Here we will store JS files representing our models
      * `/Procfile`
        * Create this file in your root directory. In it, you will add the following lines:
        ```
            web: react-scripts start 
            api: nodemon server.js
        ```
        * The first line specifies what commands to run to boot the client, while the second specifies the commands to boot the API
        
      * `/server.js`
        * We will do most of our configuration and routing work in here. For now, create the file in your root directory and stay tuned to see what we'll be adding
      * `/package.json`
        * Under the key "scripts", make sure that the following lines are included
        ```
            "start": "react-scripts start",
            "start-dev": "nf start -p 3000",
        ```

2. MongoDB
  There are two ways to get started with Mongo: locally or remotely. Remote setup is a bit faster and easier, but eventually you may want to setup locally. Here's how to do both
  
    - mLab
        * We will be using [mLab](https://mlab.com/), an online database hosting service. Make and verify an account. From the main page, you can create a new database by clicking `+ Create new`. Follow the instructions for setting up your cloud services. When that's done, there will be a new row added to 'MongoDB Deployments'. Clicking this will take you to settings related to this DB. Under a tab labeled 'Users', make a username and password to use to access this DB. On this page, you will also see the URI we will use to connect to this database. It should look something like this:
            ```
                    mongodb://<dbuser>:<dbpassword>@<dbname>
            ```
    - Local
      * Most of the instructions for installing MongoDB using Homebrew are included [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition). Follow the guide and get `mongod` running. Once it's running, it should tell you your IP and the port it's listening on. Eventually, when we connect to Mongoose, you will use a string that looks like the following:


# Time to code!

### Configuring Express

Most of the code we will be writing will be in our `server.js` file, as well as any models we create. Keep in mind: in order to run your servers, use the command `npm run start-dev`. This will deploy both your client and API servers.

In your `server.js` files, copy and paste the following code:

``` javascript

'use strict'

//Import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Create an instance of express and of its router
var app = express();
var router = express.Router();

/*Set our port to either a predetermined port number if you have set 
it up in your environment, or 3001 */
var port = process.env.API_PORT || 3001;

//Connect mongoose to your DB using the URI from mLab
mongoose.connect(/*Insert DB URI from DB setup above*/)

/*Configure Express to use body-parser to parse request bodies in JSON. */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS configuration

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


//Add a route!
router.route('/')
.get((req, res) => {
  res.json({message: "Initialized!"});
});


//Configure Express to add '/api' in front of routes
app.use('/api', router);

//Start listening on specified port
app.listen(port, () => {
 console.log(`api running on port ${port}`);
});


```

With this added to your code, you should be able to run `npm run start-dev` and visit `http://localhost:3001/api/` and see some JSON!


### Ingredient 1: Basic Schemas and Models

Models are JS files that, for organizational purposes, will live in a folder called `/models/` in our root directory. They provide the definition of our models' schemas. Here's an example of what this will look like:

```
// /models/examples.js

'use strict'

//Import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a schema

var ExampleSchema = new Schema({
 string_prop: String,
 number_prop: Number,
 boolean_prop: Boolean
});


//Export
module.exports = mongoose.model('Example', ExampleSchema);

```



We will then import these into our `server.js`

```
var Example = require('./models/examples.js')

```

And we will now have access to this model in our `server.js`, which we will use in our controller actions to do full CRUD.

Please refer to the following [Mongoose schema docs](http://mongoosejs.com/docs/guide.html) to get a better sense of the different ways schemas can be setup.


You may also wabt to become acquanted with the documentation on [Mongoose Models](http://mongoosejs.com/docs/models.html), [Mongoose Documents](http://mongoosejs.com/docs/documents.html) (note: 'documents' are analogous to SQL's 'rows'), and [Mongoose Queries](http://mongoosejs.com/docs/queries.html). There is also an extensive [Mongoose API docs page](http://mongoosejs.com/docs/api.html), which you may want to take a look through to get a better sense of the functions you have at your disposal. 

### Ingredient 2: Controllers and Routing

Creating routes in Express is easy! Routes are created using an instance of Router. Specifying a path looks like this:

```javascript
var router = express.Router();

//Static route
router.route("/")

//Dynamic route
router.route("/example/:id")

```

To add methods (e.g. GET, POST, PATCH, DELETE), simply chain that method's name onto the return of the route. This is a function that takes a single argument: a callback with two arguments, one representing the request, the other, the response. This looks like the following:

```javascript
var router = express.Router();

router.route("/")

//GET to "/"
.get((request, response) => {

  })

//POST to "/"
.post((request, response) => {

  })

//etc.
```

Through the request, we will have access to the request body, headers, and any params passed through the URL's path.

```javascript
var router = express.Router();

router.route("/example/:example_id_1/example/:example_id_2")
.post((request, response) => {

    //accessing the body
    request.body

    //accessing the headers
    request.headers

    //accessing the URL parameters
    request.params //=> {example_id_1: <value>, example_id_2: <value>}

  })
```

To send back a response, simply use `send` or `json` on the response!

```javascript
var router = express.Router()

router.route("/choo_choo")
.get((req,res) => {

    res.json({message: "All aboard the Express Train"}) 
  })
```

The function `json` is more or less the same as the function `send`; in fact, `json` simply formats the data into JSON before calling `send` on the formatted data. It's important to keep in mind that firing a response does **not** exit the method, so oftentimes you will want these to be the last bits of code at the ends of your chains of logic. For instance:

```javascript
var router = express.Router()

router.route("/guillotine")
.get((req,res) => {
    console.log("I will be executed!")
    res.json({message: "Sending response!"})
    console.log("I too shall be executed!")

  })
```



### Stirring the Pot

Okay cool, so we learned a little bit about creating schemas and models using Mongoose to communicate with Mongo as well as a little bit about creating routes in Express. Let's bring it all together.

Suppose we had a model that looked like the following: 

```javascript
  // /model/animals.js

  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var AnimalsSchema = new Schema({
   species: String,
   name: String,
   gender: String,
   population: Number,
   extinct: Boolean
  });

module.exports = mongoose.model('Animal', AnimalsSchema);

```

We can create some RESTful routes to this model!

```javascript

/* 
...Initial config here...
*/


var router = express.Router()
var Animal = require('./models/animals');

router.route("/animals")
.get((req, res) => {
    Animal.find((err, animals) => {
        if (err) {
          res.send(err)
        } else {
          res.json({ animals })
        }
      })
  })
.post((req, res) => {
    let newAnimal = new Animal()

    newAnimal.species = req.body.species
    newAnimal.name = req.body.name
    newAnimal.gender = req.body.gender
    newAnimal.population = req.body.population
    newAnimal.extinct = req.body.extinct

    newAnimal.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.send({ newAnimal })
        }
      })
  })

router.route("/animals/:id")
.get((req, res) => {
    Animal.findById(req.params.id, (err, animal) => {
        if (err) {
          res.send(err)
        } else {
          res.json({ animal })
        }
      })
  })
.patch((req, res) => {
    Animal.findById(req.params.id, (err, animalToEdit) => {
        if (err) {
          res.send(err)
        } else {
          animalToEdit.species = req.body.species
          animalToEdit.name = req.body.name
          animalToEdit.gender = req.body.gender
          animalToEdit.population = req.body.population
          animalToEdit.extinct = req.body.extinct

          animalToEdit.save((err) => {
            if (err) {
              res.send(err)
            } else {
              res.json({ animalToEdit })
            }
          })
        }
      })
  })
.delete((req, res) => {
    Animal.remove({_id: req.params.id}, (err) => {
        if (err) {
          res.send(err)
        } else {
          res.json({message: "Successful extermination!"})
        }
      })
  })




```

Closely read the above code. Mongoose has a ton of methods to interact with the database. Note that every method takes a callback as its last argument. This callback is executed once the query is completed and has `err` as its first argument. As you can probably tell, in the case that the query was successful, `err` will be `null`; otherwise, `err` will contain information about why that query failed. 

And there you have it: a basic RESTful API in Express and Mongo! Express, Mongo, and Mongoose each have a lot more to offer, and I heavily suggest reading through the documentation for each to get a better feel for the other bells and whistles each has to offer.

# Final Notes

This is far from an exhaustive guide; there's so much more than can be covered here. Insofar as other opportunities are concerned, I would definitely consider covering the following concepts in this stack:

1. Object relations and advanced schema configuration options
2. Writing static and instance methods for models
3. Validations
4. Authentication (I recommend BCrypt!)
5. Sessions/JsonWebTokens(JWT)
