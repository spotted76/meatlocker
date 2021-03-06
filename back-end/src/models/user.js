
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

//Define the schema for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema);