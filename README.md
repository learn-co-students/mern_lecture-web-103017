# Packages

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

# Setup

After running `create-react-app` to build out your client, the following needs to be setup.

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

2. mLab
    * We will be using [mLab](https://mlab.com/), an online database hosting service. Make and verify an account. From the main page, you can create a new database by clicking `+ Create new`. Follow the instructions for setting up your cloud services. When that's done, there will be a new row added to 'MongoDB Deployments'. Clicking this will take you to settings related to this DB. Under a tab labeled 'Users', make a username and password to use to access this DB. On this page, you will also see the URI we will use to connect to this database. It should look something like this:
         ```
        mongodb://<dbuser>:<dbpassword>@<dbname>
        ```

# Time to code!

### Configuring Express

Most of the code we will be writing will be in our `server.js` file, as well as any models we create. Keep in mind: in order to run your servers, use the command `npm run start-dev`. This will deploy both your client and API servers.

In your `server.js` files, copy and paste the following code:

``` javascript

'user strict'

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
mongoose.connect('mongodb://<dbusername>:<dbuserpassword>@ds151207.mlab.com:51207/<dbname')

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


### Creating models

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

### Creating Routes



