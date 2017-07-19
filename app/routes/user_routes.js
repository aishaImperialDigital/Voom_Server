// user_routes.js
// module.exports = function(app, db) {
//   app.post('/user', (req, res) => {
//     const user = { email: req.body.email, password: req.body.password };
//     db.collection('user').insert(user, (err, result) => {
//       if (err) {
//         res.send({ 'error': 'An error has occurred' });
//       } else {
//         res.send(result.ops[0]);
//       }
//     });
//   });
// };

module.exports = function (app,db) {
  app.post('/user', (req, res) => {
    // You'll create your note here
    if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}
    res.send('hello user')
  }

};

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
