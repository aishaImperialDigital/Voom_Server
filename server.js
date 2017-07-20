// server.js
// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// var mongoose = require('mongoose');
// const app            = express();
// const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/Public"));
// var url = "mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb";
// mongoose.connect(url);
// var User = require('./app/models/user.js');
//  // create a new user called chris
//  var chris = new User({
//    name: 'Chrccisff',
//    username: 'sevilayha',
//    password: 'password'
//  });
//
//  // call the built-in save method to save to the database
//  chris.save(function(err) {
//    if (err) throw err;
//
//    console.log('User saved successfully!');
//  });
// MongoClient.connect(url, (err, database) => {
//   if (err) return console.log(err)
//   require('./app/routes')(app, database);
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  User = require('./app/models/user'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./app/routes/user_routes');
routes(app);

var routes = require('./app/routes/index');
var user_vehicle = require('./app/routes/vehicle_routes');

app.use('/', routes);
app.use('/user_vehicle', user_vehicle);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
//use sessions for tracking logins
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600 // time period in seconds
  })
}));


console.log('user RESTful API server started on: ' + port);
