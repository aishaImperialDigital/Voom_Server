'use strict';
var mongoose = require('mongoose'),
    validate = require('mongoose-validate'),
    bcrypt   = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10,
    REQUIRED_PASSWORD_LENGTH = 8;

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
    var self = this;

    if (!self.isModified('passHash')) return next();

    bcrypt.hash(self.passHash, SALT_WORK_FACTOR, null, function encryptedPassword (err, hash) {
        if(err) console.log(err);

        self.passHash = hash;
        next();
    });
});

module.exports = mongoose.model('Users', UserSchema);
