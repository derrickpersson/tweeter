"use strict";

const ObjectId = require("mongodb").ObjectID;


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(function(err, tweets){
        if(err){
          console.error(err);
          return callback(err);
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    },

    saveLike: function(id, likeCount, callback){
      // db.collection("tweets").find(id);
      db.collection('tweets').update({_id: ObjectId(id)}, {$set: {"likes": likeCount}}, callback);
      // db.test.update({_id: ObjectId("5a31d581d4a0a228d3e4b537")}, {$set: {"name":"test"}})
    }

  };
}
