
const itemRouter = require('express').Router();
const Item = require('../models/Item');
const Transaction = require('../models/transaction');

/**
 * /api/item
 * 
 * Adds a new item to the datbase
 * Note:  Auth handled by middleware
 */
itemRouter.post('/', async (req, res) => {

  const item = req.body;
  const newItem = new Item(
    {
      ...item,
      //TBD on the image
    }
  );

  try {
    const result = await newItem.save();
    res.status(201).json(result);
  }
  catch(ex) {
    console.log('Error encountered creating new item');
    res.status(500).json({ error: 'Error encountered creating new item' });
  }

});


/**
 * /api/get
 * 
 * Retreives ALL items from the database
 * 
 * Note:  User auth handled by middleware
 */
itemRouter.get('/', async (req, res) => {
  
  try {
    const results = await Item.find({});
    res.status(200).json(results);
  }
  catch(err) {
    console.log('error encountered retrieving all items');
    res.status(500).json({ error: 'Error encountered retrieving all items' });
  }

});

/*
  REST API /api/item/search

  Performs a query on whatever parameters are passed to the search query
*/
itemRouter.get('/search', async(req, res) => {

  try {
    if (req.query.name) {
      const results = await Item.find({ 'name': { $regex: req.query.name, $options: 'i' } }).populate('memberCategories', 'categoryName');
      res.set('Cache-Control', 'no-store');
      res.status(200).json(results);
    }
    else if (req.query.memberCategories) {
      const results = await Item.find({ 'memberCategories': req.query.memberCategories }).populate('memberCategories', 'categoryName');
      console.log('found data with member category', results);
      res.set('Cache-Control', 'no-store');
      res.status(200).json(results);
    }
    else {
      res.status(500).json({ error: 'Unknown search request type' });
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Error encountered searching for items' });
  }

});


/**
 * /api/item/$id
 * 
 * Retrieves a single item from the database
 * 
 * Note:  User auth handled by middleware
 */
itemRouter.get('/:id', async (req, res) => {


  try {
    const result = await Item.findById(req.params.id);
    res.status(200).json(result);
  }
  catch(err) {
    console.log(`Error encountered fetching item id: ${req.params.id}`);
    res.status(500).json({ error: `Error encountered fetching item id: ${req.params.id}` });
  }


});


/*
  REST API /api/item/:id

  POST, will replace the existing item whilesale with the item 
  int the request object 

*/
itemRouter.put('/:id', async(req, res) => {

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new : true });
    res.status(200).json(updatedItem);
  }
  catch(err) {
    console.log(`Error occurred updating item ${req.params.id}`);
    res.status(500).json({ error: `Error occurred updating item ${req.params.id}` });
  }

});

/*
  REST API /api/item/:id
  DELETE, will delete the item with the passed id
*/
itemRouter.delete('/:id', async(req, res) => {

  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).end();
  }
  catch(err) {
    console.log(`Error encountered deleted item ${req.params.id}`);
    res.status(500).json( { error: `Error encountered deleted item ${req.params.id}` });
  }

});

/*

REST API /api/item/deletemany

POST - a bit of a hack, since this is a destructive post.  This call
will delete all items by id that are passed in the request

*/
itemRouter.post('/deletemany', async(req, res) => {

  const { itemIds } = req.body;

  try {
    await Item.deleteMany(
      {
        _id : {
          $in: itemIds
        }
      }
    );
    res.status(200).end();
  }
  catch(err) {
    console.log(err);
    console.log('Error occurred deleting a block of item IDs');
    res.status(500).json({ error:  'Error occurred deleting a block of item IDs' });
  }


});


/*
  REST API /api/item/:id/count

  Patch, will replace a portion of the existing item data 
  at :id.  This is a count increment / decrement, and is expected to have
  a query specifying increment or decrement as well
*/
itemRouter.patch('/:id/count', async (req, res) => {

  try {
    const result = await Item.updateOne({ _id: req.params.id }, req.body);
    const status = result.nModified > 0 ? 200 : 400;

    if ( req.query && (status === 200) ) {
      //Modification successful, log the transaction
      const transaction = new Transaction({
        type: req.query.type,
        user: req.authUser.username,
        item: req.params.id
      });

      await transaction.save();

    }

    res.status(status).end();
  }
  catch (err) {
    console.log(err);
    console.log(`Error occured patching item ${req.params.id}`);
    res.status(500).json({ error: `Error occured patching item ${req.params.id}` });
  }

});


/*
  REST API /api/item/:id

  Patch, will replace a portion of the existing item data 
  at :id
*/
itemRouter.patch('/:id', async (req, res) => {

  try {
    const result = await Item.updateOne({ _id: req.params.id }, req.body);
    const status = result.nModified > 0 ? 200 : 400;
    res.status(status).end();
  }
  catch (err) {
    console.log(err);
    console.log(`Error occured patching item ${req.params.id}`);
    res.status(500).json({ error: `Error occured patching item ${req.params.id}` });
  }

});


module.exports = itemRouter;