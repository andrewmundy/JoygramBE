var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

mongodb.MongoClient.connect("mongodb://andrewmundy:unreal@ds149551.mlab.com:49551/joygram_api", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
    console.log("App now running on port", port);
  });
});
//
// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const db             = require('./config/db');
// const app            = express();
// const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)
//   require('./app/routes')(app, database);
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
////////

app.get('/users', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('users').find({}).toArray(function(err, item){
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('users').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

app.get('/photos/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('photos').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

/******** POST ********
**********************/
app.post('/photos', (req, res) => {
  const photo = { url: req.body.url, description: req.body.description, posted_by: req.body.posted_by };

  db.collection('photos').insert(photo, (err, result)=> {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
      res.send(result.ops[0]);
    }
  });
});

app.post('/users', (req, res) => {
    var user = {
      username: req.body.username,
      avatar: req.body.avatar,
      description: req.body.description
    };

    db.collection('users').insertOne(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

/******** DELETE ********
**********************/
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('user ' + id + ' deleted!');
      }
    });
  });

app.delete('/photos/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('photos').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('photo ' + id + ' deleted!');
      }
    });
  });

/******** PUT ********
**********************/
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const user = { text: req.body.username, title: req.body.description };
  db.collection('users').update(details, user, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(user);
    }
  });
});

app.put('/photos/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const user = { text: req.body.username, title: req.body.description };
  db.collection('photos').update(details, user, (err, result) => {
    if (err) {
        res.send({'error':'An error has occurred'});
    } else {
        res.send(user);
    }
  });
});
