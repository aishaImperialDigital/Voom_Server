// user_routes.js
module.exports = function(app, db) {
  app.post('/user', (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    db.collection('user').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};


var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('user').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
