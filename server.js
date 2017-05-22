var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db

mongodb.MongoClient.connect("mongodb://andrewmundy:unreal@ds149551.mlab.com:49551/joygram_api", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  users = db.collection("users");
  photos = db.collection("photos");
  var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
    console.log("App now running on port", port);
  });
});
