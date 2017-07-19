// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var mongoose = require('mongoose');
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/Public"));
var url = "mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb";

var User = require('./app/models/user');
 // create a new user called chris
 var chris = new User({
   name: 'Chris',
   username: 'sevilayha',
   password: 'password'
 });

 // on every save, add the date
 userSchema.pre('save', function(next) {
   // get the current date
   var currentDate = new Date();

   // change the updated_at field to current date
   this.updated_at = currentDate;

   // if created_at doesn't exist, add to that field
   if (!this.created_at)
     this.created_at = currentDate;

   next();
 });

 // call the built-in save method to save to the database
 chris.save(function(err) {
   if (err) throw err;

   console.log('User saved successfully!');
 });

mongoose.connect(url);
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
