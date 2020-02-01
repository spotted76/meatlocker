
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
  categories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  items:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

categorySchema.plugin(validator);


module.exports = mongoose.model('Category', categorySchema);