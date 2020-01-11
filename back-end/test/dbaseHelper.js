
const mongoose = require('mongoose');

class DbaseHelper {

  constructor(mongoURI) {
    this.URI = mongoURI;
  }

  //Setup & connect to the database
  async setup() {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(this.URI);
  }

  //Tear down the connection
  async tearDown() {
    await mongoose.disconnect();
  }

}

module.exports = DbaseHelper;