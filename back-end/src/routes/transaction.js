
const transactionRouter = require('express').Router();
const Transaction = require('../models/transaction');
const Item = require('../models/Item');


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


/**
 * /api/transaction/recents
 * 
 * Retrieves the most recently edited items from the database
 * 
 * Note:  User auth handled by middleware
 */
transactionRouter.get('/recents', async (req, res) => {

  const numRecents = 6;

  const query   = {};
  const options = {
      sort:     { date: -1 },
      lean:     true,
      page:     1,
      limit:    numRecents
  };

  let pageResults = {};

  try {
    //Get the total number of items from the database
    const recentItems = new Set();

    do {
      pageResults = await Transaction.paginate(query, options);


      if ( pageResults.docs ) {
        for ( let lnCurr = 0; lnCurr < pageResults.docs.length; lnCurr++) {
          recentItems.add(pageResults.docs[lnCurr].item.toString());
          if ( recentItems.size >= numRecents ) {
            break;
          }
        }
      }

      if ( pageResults.hasNextPage) {
        options.page = pageResults.nextPage;
      }

    }while ( pageResults.hasNextPage && recentItems.size < numRecents);

    //Now go fetch the items from the list of ids
    const resultIds = Array.from(recentItems);

    const itemList = await Item.find({ 
      _id: { 
        $in: resultIds 
      }
    }).populate('memberCategories', 'categoryName');

    res.status(200).json(itemList);
  }
  catch(err) {
    console.log(err);
    console.log('error encountered retreiving recent transactions');
    res.status(500).json({ error:  'error encountered retrieving recent transactions' });
  }

});



module.exports = transactionRouter;
