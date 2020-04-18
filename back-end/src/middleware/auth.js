
const jwt = require('jsonwebtoken');
const Config = require('../util/configs');

const config = new Config();

function authUser(req, res, next) {

  //pull the web token out of the request
  let { token } = req;

  if ( token ) {
    //A token was sent, determine if the user is authorized
    try {
      const decoded = jwt.verify(token, config.secret);
      req.authUser = {
        username: decoded.username,
        id: decoded.id
      };
    }
    catch(err) {
      console.log(`invalid token:  ${err}`);
      //PSF - put a return statement here
    }
  }

  next();

}


module.exports = authUser;