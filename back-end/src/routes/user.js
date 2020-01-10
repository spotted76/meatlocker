const router = require('express').Router();


/*
  /api/user

  //Creates a new user, stores the user in the database

*/
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('hello from user');
});


module.exports = router;