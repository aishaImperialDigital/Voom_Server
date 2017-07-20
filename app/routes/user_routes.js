//user_routes.js
// if our user.js file is at app/models/user.js
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
'use strict';
module.exports = function(app) {
  var userList = require('../controllers/userController');
  // todoList Routes
  app.route('/user')
    .get(userList.list_all_users)
    .post(userList.create_a_user);


  app.route('/users/:userId')
    .get(userList.read_a_user)
    .put(userList.update_a_user)
    .delete(userList.delete_a_user);
};
