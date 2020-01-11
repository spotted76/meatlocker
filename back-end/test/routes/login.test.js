
const Config = require('../../src/util/configs');
const DbaseHelper = require('../dbaseHelper');
const User = require('../../src/models/user');
const app = require('../../src/app');
const supertest = require('supertest');

//Create the objects needed for testing
let dbaseHelper;
const request = supertest(app);

//Establish a connection to the testing database
beforeAll( async () => {

  const config = new Config();
  dbaseHelper = new DbaseHelper(config.mongoURI);
  await dbaseHelper.setup();


  //Remove all users
  await User.deleteMany({});

  //Now create a user for testing auth purposes, just use login route
  const user = {
    username: 'unameLogin',
    name: 'test user',
    password: 'test_password',
  };

  await request
  .post('/api/user')
  .send(user)
  .expect(201);

});

//Tear down the connection
afterAll( async () => {

  await dbaseHelper.tearDown();

});


test('Success - Can authenticate user', async done => {

  //Test the authentication route, by logging in.
  const loginReq = {
    username: 'unameLogin',
    password: 'test_password',
  };

  const result = await request
    .post('/api/login')
    .send(loginReq)
    .expect(200);

  expect(result.body.username).toBe(loginReq.username);
  
  done();
});

test('Login fails, invalid username', async done => {

  //Test the authentication route, by logging in.
  const loginReq = {
    username: 'invalid',
    password: 'test_password',
  };

  const result = await request
    .post('/api/login')
    .send(loginReq)
    .expect(401);

  expect(result.body.error).toBe('invalid username');
  
  done();
});

test('Login fails, invalid password', async done => {

  //Test the authentication route, by logging in.
  const loginReq = {
    username: 'unameLogin',
    password: 'bad_password',
  };

  const result = await request
    .post('/api/login')
    .send(loginReq)
    .expect(401);

  expect(result.body.error).toBe('invalid password');
  
  done();
});