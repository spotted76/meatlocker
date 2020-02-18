
import CategoryService, { DEFAULT_URI } from '../services/categoryServices';

class CategoryStoreHelper {

  /**
   * Constructor function for the CategoryStoreHelper
   * 
   * @param {*} store - Store used to retrieve Category Data 
   * @param {*} authToken - Authentication token
   * @param {*} baseURI  - URI for backend to get/set category data
   */
  constructor(store, authToken, baseURI = DEFAULT_URI) {
    this.store = store;
    this.baseURI = baseURI;
    this.service = new CategoryService(this.baseURI);
    this.service.setAuthToken(authToken);
  }

  /**
   * Retrieves a cateogry data based on the passed ID.  If the category
   * already exists in the store, it is retrieved. If it does NOT exist in
   * the store, and is a number, then the category data is retrieved from the
   * server, and placed in the store.
   * 
   * @param {*} id The ID of the category 
   */
  async retrieveCategoryById(id, updateStore) {

    //First, check the store, see if the details of the category exist
    let result = this.store.find( category => category.id === id);
    if ( result ) {

      console.log('Detailed result found in store:  ', result.id);

      //the detailed category exists, return the contents
      return result;
    }
    else {

      //Ok, There's an ID, but no actual content, retrieve the data
      console.log('No result found in store, retrieving:  ', id);
      await this.service.getDetailedCategory(id);
      if ( !this.service.error )
      {
        updateStore(this.service.data);
        return this.service.data;
      }
      else {
        console.log('uh oh, something bad happened retriving detailed cateogyr');
        console.log(this.service.error);
        return null;
      }
    } 

  }

  async retrieveFullPopulatedCategory(id, updateStore) {

    let result = {};

    //Make a deep copy of all resulting data
    let catResults = await this.retrieveCategoryById(id, updateStore);
    if ( catResults ) {
      result = { ...catResults };
    }

    //Ok, now loop through all subcatogories ID's, and convert them to an object
    const promises = result.childCategories.map(async (catNum) => {
      const detailedCat = await this.retrieveCategoryById(catNum, updateStore);
      return { ...detailedCat };
    });

    //Assign the mapped results as the new child categories
    result.childCategories = await Promise.all(promises);

    //TODO:  Now Loop through all the items, make a deep copy of child items

    return result;
  }

  /**
   * Retrieve only major categories
   */
  retrieveMajorCategories() {

    console.log('The store looks like:  ', this.store);
    return this.store.filter(category => category.isMajor);

  }

}


export default CategoryStoreHelper;