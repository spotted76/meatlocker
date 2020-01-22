
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');

//Instantiate main express app
const app = express();
app.use(cors());

//Use morgan for debug
app.use(morgan('dev'));

//Setup the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup routes
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);

module.exports = app;