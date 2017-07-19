// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
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

  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
// make this available to our users in our Node applications
module.exports = User;
