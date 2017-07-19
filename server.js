// // server.js
// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// const bodyParser     = require('body-parser');
// const app            = express();
//
// const port = 8000;
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
//
// var url = "mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb";
//
// MongoClient.connect(url, (err, database) => {
//   if (err) return console.log(err)
//   require('./app/routes')(app, database);
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
console.log('server on' + port);
