
import axios from 'axios';

class CategoryService {

  constructor(baseURI, configs = null) {
    this.baseURI = baseURI;
    this.configs = configs ? configs : undefined;
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

}

export default CategoryService;


