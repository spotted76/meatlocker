
const itemRouter = require('express').Router();
const Item = require('../models/Item');

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


/**
 * /api/item/$id
 * 
 * Retrieves a single item from the database
 * 
 * Note:  User auth handled by middleware
 */
itemRouter.get('/:id', async (req, res) => {

  console.log('looking for', req.params.id);

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

module.exports = itemRouter;