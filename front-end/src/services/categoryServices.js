
import axios from 'axios';

class CategoryService {

  constructor(baseURI) {
    console.log('CategoryService constructor called');
    this.baseURI = baseURI;
    this.configs = {};
    this.error = false;
    this.loading = false;
    this.data = null;
  }

  async fetchMajorCategories() {

    console.log('did fetchMajor get called?', this);

    this.loading = true;

    try {
      const result = await axios.get(this.baseURI, this.configs);
      this.data = result.data;
      this.loading = false;
      this.error = false;
    }
    catch(err) {
      this.loading = false;
      this.error = err;
    }

  }

  setAuthToken(token) {

    const bearer = `Bearer ${token}`;

    if ( ! this.configs.headers) {
      this.configs.headers = {};
    }

    this.configs.headers = {
      Authorization: bearer
    };
  }

}

export default CategoryService;


