var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
  regoNumber: {
    type: String,
    required: true,
  }

  firstName: {
    type: String,
    required: true,
  }

  lastName: {
    type: String,
    required: true,
  }

  driverLicense: {
    type: String,
    required: true,
  }

  dateOfBirth: {
    type: String,
    required: true,
  }

  customName: {
    type: String,
    required: true,
  }

  mobileNumber: {
    type: String,
    required: true,
  }

});
var User = mongoose.model('User', UserSchema);
module.exports = User;
