
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});


const serverPort = process.env.EXPRESS_PORT ? process.env.EXPRESS_PORT : 3000;

app.listen(serverPort, () => {
  console.log('express server started on ', serverPort);
});