
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true
  },
  count: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String,
  }
});

itemSchema.plugin(validator);


module.exports = mongoose.model('Item', itemSchema);