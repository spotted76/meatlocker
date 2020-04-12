

const mongoose = require('mongoose');

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

module.exports = mongoose.model('Transaction', transactionSchema);

