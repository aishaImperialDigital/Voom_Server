'use strict';
var mongoose = require('mongoose'),
    validate = require('mongoose-validate'),
    REQUIRED_PASSWORD_LENGTH = 8;
    var bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

function validateStringLength (value) {
    return value && value.length >= REQUIRED_PASSWORD_LENGTH;
}
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validate.email, 'is not a valid email address']
    },
    passHash: {
    type: String,
    required: true,
    validate: [validateStringLength, 'The password must be of min ' + REQUIRED_PASSWORD_LENGTH + ' characters length.']
  }
});
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
 bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.passHash = hash;
    next();
  })
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.passHash, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

module.exports = mongoose.model('Users', UserSchema);
