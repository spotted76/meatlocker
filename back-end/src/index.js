
const dotenv = require('dotenv').config();
const http = require('http');
const app = require('./app');



const serverPort = process.env.EXPRESS_PORT ? process.env.EXPRESS_PORT : 3000;

const server = http.createServer(app);

server.listen(serverPort, () => {
  console.log(`server started on port:  ${serverPort}`);
});