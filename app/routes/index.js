//routes/index.js
const userRoutes = require('./user_routes');
const userLoginRoutes = require('./vehicle_routes');
module.exports = function(app, db) {
  userRoutes(app, db);
  // Other route groups could go here, in the future
  userLoginRoutes(app, db);
};
