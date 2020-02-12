
const categoryRouter = require('express').Router();
const Category = require('../models/category');


//REST API /api/category/
/*
Adds a new category object
*/
categoryRouter.post('/', async (req, res) => {

  //Determine if the user is authenticated
  if ( !req.authUser ) {
    return res.status(401).json({ error: 'unauthenticated user' });
  }

  //Ok, user has been authenticated, allow the post to be created
  const { body } = req;

  //Create the category
  const category = new Category({
    categoryName: body.categoryName,
    description: body.description,
    isMajor: body.isMajor,
    parent: body.parent
  });

  let newCategory;
  try {
    newCategory = await category.save();
  }
  catch(err) {
    console.log(err);
    console.log(`error occurred creating new category ${body.categoryName}`);
    return res.status(500).json({ error: `error encountered attempting to create category ${body.categoryName} ` });
  }

  //If there is a parent category, make sure to update the parent
  if ( body.parent ) {
    try {
      const parent = await Category.findById(body.parent);
      parent.childCategories.push(newCategory._id);
      await parent.save();
    }
    catch(err) {
      console.log(err);
      console.log('error occurred updating parent category with new child');
      return res.status(500).json({ error: 'error encountered updating parent category' });
    }
  }


  //All good englewood!
  res.status(201).json(newCategory);

});

//REST API /api/category

/**
 * Request retrieves all top level categories
 */
categoryRouter.get('/', async(req, res) => {

  try {
    const result = await Category.find({ isMajor: true });
    return res.status(200).json(result);
  }
  catch(err) {
    console.log('error encountered retrieving all top-level categories');
    console.log(err);
    return res.status(500).json({ error: 'error encountered retrieving all top level categories ' });
  }

});

//REST API /api/category/
/*
  Request to get a specific category based on the passed ID
*/
categoryRouter.get('/:id', async(req, res) => {

  //Lookup the category based on the passed id
  try {
    const result = await Category.findById(req.params.id)
      .populate('childCategories');
    if ( result )
    {
      return res.status(200).json(result);
    }

    res.status(400).json({ error: `unable to locate category @ id: ${req.params.id}` });

  }
  catch(err) {
    console.log(err);
    res.status(500).json({ error: `error encountered attempting to retrieve id: ${req.params.id}` });
  }

});

module.exports = categoryRouter;