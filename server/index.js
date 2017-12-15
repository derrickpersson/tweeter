"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const path          = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

const sassMiddleware = require('node-sass-middleware');
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/styles',
    dest: path.join(__dirname, '../public/styles'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, function(err, database){
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // The `data-helpers` module provides an interface to the database of tweets.
  const DataHelpers = require("./lib/data-helpers.js")(database);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);


  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});