var express        = require('express');
var MongoClient    = require('mongodb').MongoClient;
var bodyParser     = require('body-parser');
var db             = require('./config/db');
var app            = express();

// var port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
})
