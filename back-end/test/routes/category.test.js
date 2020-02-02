
const Config = require('../../src/util/configs');
const supertest = require('supertest');
const app = require('../../src/app');
const DbaseHelper = require('../dbaseHelper');

const Category = require('../../src/models/category');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');


const request = supertest(app);
let dbaseHelper;

beforeAll( async () => {

  const config = new Config();
  dbaseHelper = new DbaseHelper(config.mongoURI);

  try {
    await dbaseHelper.setup();
  }
  catch(err) {
    console.log('Error when attempting to connect to ', config.mongoURI);
  }

});

afterAll( async () => {
  dbaseHelper.tearDown();
});

beforeEach( async() => {
  
  try {
    await Category.deleteMany();
  }
  catch(err) {
    console.log(err);
    console.log('failed to delete all categories prior to test execution');
  }

});

/*
  This test fails to create a new category due to the lack of any
  passed token 
*/
test('it fails category creation with no token', async () => {

  const testCat = {
    categoryName: 'Prime Test Name',
    description: 'This is a primary category',
    isMajor: true,
  };

  let res = await request.post('/api/category')
    .send(testCat)
    .expect(401);

  res = JSON.parse(res.error.text);
  expect(res.error).toEqual('unauthenticated user');

});

test('it creates a new primary category', async () => {

  const testCat = {
    categoryName: 'Prime Test Name',
    description: 'This is a primary category',
    isMajor: true,
  };


   //Mock out the call to verify
   jwt.verify.mockImplementation(() => {
     return {
       username: 'testing_user',
       id: 123456
     };
  });

  let res = await request.post('/api/category')
    .set('Authorization', 'Bearer abcdef')
    .send(testCat)
    .expect(201);

  expect(res.body.categoryName).toBe(testCat.categoryName);

});

test('it creates a new secondary category', async () => {

  const testCat = {
    categoryName: 'Prime Test Name',
    description: 'This is a primary category',
    isMajor: true,
  };


   //Mock out the call to verify
   jwt.verify.mockImplementation(() => {
     return {
       username: 'testing_user',
       id: 123456
     };
  });

  let res = await request.post('/api/category')
    .set('Authorization', 'Bearer abcdef')
    .send(testCat)
    .expect(201);

  //Now create a new category, a sub category 
  const testSub = {
    categoryName: 'Sub Test Name',
    description: 'This is a sub category',
    isMajor: false,
    parent: res.body.id
  };

  const res2 = await request.post('/api/category')
  .set('Authorization', 'Bearer abcdef')
  .send(testSub)
  .expect(201);

  expect(res2.body.categoryName).toBe(testSub.categoryName);


  //Now create a new category, a sub category 
  // const testSub2 = {
  //   categoryName: 'Sub Test 2 Name',
  //   description: 'This is another sub category',
  //   isMajor: false,
  //   parent: res.body.id
  // };

  // const res3 = await request.post('/api/category')
  // .set('Authorization', 'Bearer abcdef')
  // .send(testSub2)
  // .expect(201);


});