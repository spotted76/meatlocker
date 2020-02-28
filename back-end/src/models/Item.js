
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

//Define a transform function, so that some of the document specific data is removed
if ( !itemSchema.options.toJSON ) {
  itemSchema.options.toJSON = {};
}

itemSchema.options.toJSON.transform =  (doc, ret) => {

  // remove the _id of every document before returning the result
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};


module.exports = mongoose.model('Item', itemSchema);