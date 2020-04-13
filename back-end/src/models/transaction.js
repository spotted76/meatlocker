

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const transactionSchema = new mongoose.Schema({

  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },

  type: {
    type: String,
    enum: ['add', 'subtract']
  },

  user: {
    type: String
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }

});

transactionSchema.plugin(paginate);

module.exports = mongoose.model('Transaction', transactionSchema);

