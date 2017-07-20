//user_routes.js
// if our user.js file is at app/models/user.js
module.exports = function(app, db) {
  app.post('/user', (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    db.collection('user').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        var User = require('./app/models/user');
         // create a new user called chris
         var chris = new User({
           name: 'Chrccisff',
           username: 'sevilayha',
           password: 'password'
         });

         // call the built-in save method to save to the database
         chris.save(function(err) {
           if (err) throw err;

           console.log('User saved successfully!');
         });

      }
    });
  });
};
