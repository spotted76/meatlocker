
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');


const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  items:[{
    type: mongoose.Types.ObjectId,
    ref: 'Item'
  }]
});


module.exports = mongoose.model('Category', categorySchema);