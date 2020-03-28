
const categoryRouter = require('express').Router();
const Category = require('../models/category');


//REST API /api/category/
/*
Adds a new category object
*/
categoryRouter.post('/', async (req, res) => {

  //Determine if the user is authenticated
  if (!req.authUser) {
    return res.status(401).json({ error: 'unauthenticated user' });
  }

  //Ok, user has been authenticated, allow the post to be created
  const { body } = req;

  //Create the category
  const category = new Category({
    categoryName: body.categoryName,
    description: body.description,
    isMajor: body.isMajor,
    parent: body.parent,
    memberCategories: body.memberCategories
  });

  let newCategory;
  try {
    newCategory = await category.save();
  }
  catch (err) {
    console.log(err);
    console.log(`error occurred creating new category ${body.categoryName}`);
    return res.status(500).json({ error: `error encountered attempting to create category ${body.categoryName} ` });
  }

  //If there is a parent category, make sure to update the parent
  if (body.parent) {
    try {
      const parent = await Category.findById(body.parent);
      parent.childCategories.push(newCategory._id);
      await parent.save();
    }
    catch (err) {
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
categoryRouter.get('/', async (req, res) => {

  try {
    const result = await Category.find({ isMajor: true });
    return res.status(200).json(result);
  }
  catch (err) {
    console.log('error encountered retrieving all top-level categories');
    console.log(err);
    return res.status(500).json({ error: 'error encountered retrieving all top level categories ' });
  }

});

//REST API /api/category/
/*
  Request to get a specific category based on the passed ID
*/
categoryRouter.get('/:id', async (req, res) => {

  //Lookup the category based on the passed id
  try {
    const result = await Category.findById(req.params.id)
      .populate('childCategories')
      .populate('items')
      .populate('parent', 'categoryName');
    if (result) {
      return res.status(200).json(result);
    }

    res.status(400).json({ error: `unable to locate category @ id: ${req.params.id}` });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: `error encountered attempting to retrieve id: ${req.params.id}` });
  }

});

/*
  REST API /api/category/:id

  Patch, will replace a portion of the existing category data 
  at :id
*/
categoryRouter.patch('/:id', async (req, res) => {

  try {
    // const result = await Category.updateOne( { _id: req.params.id },  { items: req.body.items } );
    const result = await Category.updateOne({ _id: req.params.id }, req.body);
    const status = result.nModified > 0 ? 200 : 400;
    res.status(status).end();
  }
  catch (err) {
    console.log(err);
    console.log(`Error occured patching category ${req.params.id}`);
    res.status(500).json({ error: `Error occured patching category ${req.params.id}` });
  }

});

/*
  REST API /api/category/:id

  DELETE.  Will delete the category based on the passed ID.  WIll also 
  recursively find all subcategories and delete them.  Any items associated
  with the categories will be returned in an array
*/
categoryRouter.delete('/:id', async (req, res) => {

  /*
    Categories have sub categories, and categories have items.
    All items must be accounted for, and all sub-categories must
    be accounted for.
  */

  const retrieveAllDependencies = async (categoryId, delCategories, delItems) => {
    //Lookup the passed category
    const category = await Category.findById(categoryId);

    if (category) {

      //Recursively go through all categories
      for (const child of category.childCategories) {
        await retrieveAllDependencies(child, delCategories, delItems);
      }

      //Add all the child categories & items
      delCategories.push(...category.childCategories);
      delItems.push(...category.items);
    }

  };

  const itemList = [];
  const categoryList = [req.params.id]; //Seed deletion list with the initial id

  //Retrieve the category
  //Lookup the passed category
  const category = await Category.findById(req.params.id);

  await retrieveAllDependencies(req.params.id, categoryList, itemList);

  //Now delete all the categories, and return the item list
  try {
    await Category.deleteMany(
      {
        _id: {
          $in: categoryList
        }
      }
    );

    //Determine if the category has a parent, and update
    if ( category && category.parent ) {
      const parent = await Category.findById(category.parent);
      parent.childCategories = parent.childCategories.filter(catId => catId != category.id);
      await parent.save();
    }

    res.status(200).json(itemList);
  }
  catch (err) {
    console.log(err);
    console.log('Error attempting to delete multiple categories');
    res.status(500).json({ error:  'Failed to delete category & subcategories' });
  }


});


module.exports = categoryRouter;