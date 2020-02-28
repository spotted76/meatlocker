
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
      count: 0
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

module.exports = itemRouter;