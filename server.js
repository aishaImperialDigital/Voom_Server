// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var mongoose = require('mongoose');
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/Public"));
var User = require('./app/models/user');
var url = "mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb";
mongoose.connect(url);
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
