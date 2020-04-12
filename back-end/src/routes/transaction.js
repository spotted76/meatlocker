
const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');


/*
  /api/transaction

  //Creates a new transaction, stores the activity in the database

*/
transactionRouter.post('/', async (req, res) => {

  //Add a new transaction
  const newTransaction = new Transaction({
    ...req.body
  });
  
  try {
    const result = await newTransaction.save();
    res.status(201).json(result);
  }
  catch(err) {
    console.log('error encountered saving new transaction:  ', err);
    res.status(500).json({ error: 'error encountered saving new transaction' });
  }

});



module.exports = transactionRouter;
