
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const Configs = require('./util/configs');


const config = new Configs();


const server = http.createServer(app);

server.listen(config.expressPort, () => {
  console.log(`server started on port:  ${config.expressPort}`);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.mongoURI).then(() => {
  console.log('successfully connected to mongo DB instance ', config.mongoURI);
}).catch(err => {
  console.log('failed to connected to mongodb instance', err);
});