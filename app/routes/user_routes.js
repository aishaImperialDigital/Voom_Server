//user_routes.js

// if our user.js file is at app/models/user.js
var User = require('./app/models/user');


module.exports = function(app, db) {
  app.post('/user', (req, res) => {

    // create a new user called chris
    var chris = new User({
      name: 'Chris',
      username: 'sevilayha',
      password: 'password'
    });

    // call the built-in save method to save to the database
    chris.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully!');
    });
    
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
