//user_routes.js
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
//the simple example of login//
module.exports = function(app, db) {
  app.post('/user', (req, res) => {
    router.post('/users/login', function (req, res) {
            var users = req.app;
            var email = req.body.email;
            var password = req.body.password;
            if (email.length > 0 && password.length > 0) {
                users.findOne({email: email, password: password}, function (err, user) {
                    if (err) {
                        res.json({status: 0, message: err});
                    }
                    if (!user) {
                        res.json({status: 0, msg: "not found"});
                    }
                    res.json({status: 1, id: user._id, message: " success"});
                })
            } else {
                res.json({status: 0, msg: "Invalid Fields"});
            }
        });
      });
    };
    //and if you have to create schema

 var db_schema = new Schema({
                email: {type: String, required: true, unique: true},
                password: {type: String, required: true, unique: true},
            });
// define this in your db.js
      var login_db = mongoose.model('mongodb://voomdb:voomdb@ds163232.mlab.com:63232/voomdb', db_schema);
        return function (req, res, next) {
                req.app = login_db;
                next();
            };
