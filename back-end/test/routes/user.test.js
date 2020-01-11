

const Config = require('../../src/util/configs');
const supertest = require('supertest');
const app = require('../../src/app');

const User = require('../../src/models/user');
const DbaseHelper = require('../dbaseHelper');

const request = supertest(app);
let dbaseHelper;


beforeAll( async () => {

  const config = new Config();
  dbaseHelper = new DbaseHelper(config.mongoURI);

  console.log('before all called');
  try {
    await dbaseHelper.setup();
  }
  catch(err) {
    console.log('Error when attempting to connect to ', config.mongoURI);
  }

});

afterAll( async () => {
  console.log('after all called');
  dbaseHelper.tearDown();
});

beforeEach( async () => {

  //Remove all user instances from the database
  await User.deleteMany({});

});


test('test create a new valid user', async done => {


  //Create a new user, and store it in the database
  const user = {
    username: 'unameTest',
    name: 'test user',
    password: 'test_password',
  };

  await request
  .post('/api/user')
  .send(user)
  .expect(201);

  done();

});

test('test invalid request - no username', async done => {


  //Create a new user, and store it in the database
  const user = {
    name: 'test user',
    password: 'test_password',
  };

  await request
  .post('/api/user')
  .send(user)
  .expect(400);

  done();

});


test('test invalid request - no password', async done => {


  //Create a new user, and store it in the database
  const user = {
    username: 'unameTest',
    name: 'test user',
  };

  await request
  .post('/api/user')
  .send(user)
  .expect(400);

  done();

});

test('test invalid request - duplicate user', async done => {


  //Create a new user, and store it in the database
  const user = {
    username: 'unameTest',
    name: 'test user',
    password: 'test_password',
  };

  await request
  .post('/api/user')
  .send(user)
  .expect(201);

  const res = await request
  .post('/api/user')
  .send(user)
  .expect(400);

  done();

});

