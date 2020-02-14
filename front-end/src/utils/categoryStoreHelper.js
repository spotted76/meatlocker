
import CategoryService, { DEFAULT_URI } from '../services/categoryServices';


class CategoryStoreHelper {

  constructor(store, authToken, baseURI = DEFAULT_URI) {
    console.log("CONSTRUCTOR CALLED");
    this.store = store;
    this.baseURI = baseURI;
    this.service = new CategoryService(this.baseURI);
    this.service.setAuthToken(authToken);
  }

  async retrieveDetailedCategory(id) {

    //First, check the store, see if the details of the category exist
    let result = this.store.filter( category => category.id === id);
    if ( result.length > 0) {

      console.log('result found:  ', result[0]);

      //the detailed category exists, return the contents
      return result[0];
    }
    else {

      console.log('no result found, retreiving');

      //Ok, There's an ID, but no actual content, retrieve the data
      await this.service.getDetailedCategory(id);
      if ( !this.service.error )
      {
        console.log('found the detailed data');
        return this.service.data;
      }
      else {
        console.log('uh oh, something bad happened retriving detailed cateogyr');
        return null;
      }
    } 

  }
}

export default CategoryStoreHelper;