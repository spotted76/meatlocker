
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const userRouter = require('./routes/user');

//Instantiate main express app
const app = express();

//Use morgan for debug
app.use(morgan('dev'));

//Setup the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup routes
app.use('/api/user', userRouter);


module.exports = app;