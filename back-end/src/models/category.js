
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');


const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
    unique: false
  },
  isMajor: {
    type: Boolean,
    default: false
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  childCategories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  items:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

categorySchema.plugin(validator);

//Define a transform function, so that some of the document specific data is removed
if ( !categorySchema.options.toJSON ) {
  categorySchema.options.toJSON = {};
}

categorySchema.options.toJSON.transform =  (doc, ret) => {

  // remove the _id of every document before returning the result
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};


module.exports = mongoose.model('Category', categorySchema);