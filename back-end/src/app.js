
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const authUser = require('./middleware/auth');
const checkPrivs = require('./middleware/checkPrivs');


//Import all routes
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const categoryRouter = require('./routes/category');
const itemRouter = require('./routes/item');
const transactionRouter = require('./routes/transaction');

//Instantiate main express app
const app = express();

//Comment for deploy
app.use(cors());

//Use morgan for debug
app.use(morgan('dev'));

//Setup the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup any middleware
app.use(bearerToken());
app.use(authUser);
app.use(checkPrivs);

//Serve the front end

//Uncomment for deploy
//app.use(express.static('build'));

//Setup routes
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/category', categoryRouter);
app.use('/api/item', itemRouter);
app.use('/api/transaction', transactionRouter);

module.exports = app;