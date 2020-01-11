
const dotenv = require('dotenv').config();

class Configs {

  constructor() {
    this.env = process.env.NODE_ENV;
  }

  get mongoURI() {

    if ( this.env === 'development' ) {
      return process.env.DEV_MONGO_URI;
    }
    else if ( this.env === 'test') {
      return process.env.TEST_MONGO_URI;
    }
    else {
      return process.env.REL_MONGO_URI;
    }
  }

  get expressPort() {
    if ( this.env === 'development' ) {
      return process.env.DEV_EXPRESS_PORT;
    }
    else {
      return process.env.REL_EXPRESS_PORT;
    }
  }

}

module.exports = Configs;