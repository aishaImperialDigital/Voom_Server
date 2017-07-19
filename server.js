// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

var url = "mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb";

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
  

  //load up index file
  app.get('/', function(req, res){
      res.render('index.html');
  });

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
