
const mongoose = require('mongoose');
const categoryRouter = require('express').Router();
const Category = require('../models/category');
const Item = require('../models/Item');



//REST API /api/category/
/*
Adds a new category object
*/
categoryRouter.post('/', async (req, res) => {

  //Determine if the user is authenticated
  if ( !req.user ) {
    res.status(401).json({ error: 'unauthenticated user' });
  }

  //Ok, user has been authenticated, allow the post to be created
  const { body } = req;

  //Create the category
  const category = new Category({
    categoryName: body.categoryName,
    description: body.description
  });

  let newCategory;
  try {
    newCategory = await category.save();
  }
  catch(err) {
    console.log(err);
    console.log(`error occurred creating new category ${body.categoryName}`);
    res.status(500).json({ error: `error encountered attempting to create category ${body.categoryName} ` });
  }

  //There are also 
  if ( body.item ) {
    //Create a new item
    const item = new Item({
      name: body.item.name,
      count: 0,
      description: body.item.description,
      category: newCategory._id
    });

    let newItem;
    try {

      //Create the new item, and update the associated category.
      newItem = await item.save();
      newCategory.items.push(newItem._id);
      newCategory.save();
    }
    catch(err) {
      console.log(err);
      console.log(`failed to create new item ${body.item.name} for category ${body.categoryName}`);
      res.status(500).json({ error: `failed to create new item ${body.item.name} for category ${body.categoryName}`})
    }
  }

  //All good englewood!
  res.status(201).end();


});


module.exports = categoryRouter;