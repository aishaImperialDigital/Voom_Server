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

///////////// end
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 8000,
//   mongoose = require('mongoose'),
//   User = require('./app/models/user'),
//   bodyParser = require('body-parser');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb');
//
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
//
// var routes = require('./app/routes/user_routes');
// routes(app);
//
// app.listen(port);
//
// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });
// //use sessions for tracking logins
// //use sessions for tracking logins
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     touchAfter: 24 * 3600 // time period in seconds
//   })
// }));
//
//
// console.log('user RESTful API server started on: ' + port);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/templateLogReg'));

// include routes
var routes = require('./app/routes/user_routes');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
app.listen(8002, function () {
  console.log('Express app listening on port 8002');
});
