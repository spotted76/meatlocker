
/**
 * Middleware function.  Certain routes do not require validation, for those
 * that do, an authenticated user must be present in the request.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkPrivs(req, res, next) {

  //Add any whitelisted APIs here
  if ( req.url === '/api/login' ||
       req.url === '/api/user') {
    return next();
  }

  //Validate against an authenticated user
  //Determine if the user is authenticated
  if ( !req.authUser ) {
    return res.status(401).json({ error: 'unauthenticated user' });
  }

  //Made it here, must be authenticated.
  next();

}


module.exports  = checkPrivs;