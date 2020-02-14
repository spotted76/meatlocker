
import axios from 'axios';

export const DEFAULT_URI = '/api/category';

class CategoryService {

  constructor(baseURI) {
    this.baseURI = baseURI;
    this.configs = {};
    this.error = false;
    this.loading = false;
    this.data = null;
  }

  async fetchMajorCategories() {

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

  async getDetailedCategory(id) {
    this.loading = true;

    const requestURI = `${this.baseURI}/${id}`;

    try {
      const result = await axios.get(requestURI, this.configs);
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


