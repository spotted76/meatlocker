const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Config = require('../util/configs');
const User = require('../models/user');

const config = new Config();

/*
  route for /api/login

  //Hanldes a user login.  Successful login should return a 

*/
loginRouter.post('/', async (req, res) => {

  //pull the body
  const { body } = req;

  //first and foremost, attempt to find the user.
  const user = await User.findOne({ username: body.username });

  if ( !user ) {
    return res.status(401).json({ error: 'invalid username' });
  }

  //get a hash for the passord, and compare it to the stored user
  if (await bcrypt.compare(body.password, user.password)) {

    //Construct & return a JWT token
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      config.secret,
      {
        expiresIn: 60 * parseInt(config.sessionTimeout)
      }
    );
    
    res.status(200).json({
      token: token,
      username: user.username,
      name: user.name,
      isAdmin: user.isAdmin
    });

  }
  else {
    res.status(401).json({ error: 'invalid password' });
  }

});


module.exports = loginRouter;