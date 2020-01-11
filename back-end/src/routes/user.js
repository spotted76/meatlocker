const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');


/*
  /api/user

  //Creates a new user, stores the user in the database

*/
router.post('/', async (req, res) => {

  //Get the payload from the body, and try saving it in the database
  const { body } = req;

  //generate a new salt for the user
  try {
    const hashedPasswd = await bcrypt.hash(body.password, 1);

    //Create a user, and store it off
    const user = new User({
      username: body.username,
      name: body.name,
      password: hashedPasswd
    });

    await user.save();

    res.status(201).end();

  }
  catch(err) {
    res.status(400).json({ error: 'Invalid User Creation Request' });
  }


});


module.exports = router;