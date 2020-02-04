
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

});

test('it creates two secondary categories', async () => {

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


  // Now create a new category, a sub category 
  const testSub2 = {
    categoryName: 'Sub Test 2 Name',
    description: 'This is another sub category',
    isMajor: false,
    parent: res.body.id
  };

  await request.post('/api/category')
  .set('Authorization', 'Bearer abcdef')
  .send(testSub2)
  .expect(201);

  //Finally, attempt to retrieve the primary category, and verify the length of 
  const primGet = await request.get(`/api/category/${res.body.id}`);

  expect(primGet.body.childCategories.length).toBe(2);

});

test('it creates two levels of sub categories', async () => {

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


  // Now create a sub category, and add it to the first sub-category
  const testSub2 = {
    categoryName: 'Sub Test 2 Name',
    description: 'This is another sub category',
    isMajor: false,
    parent: res2.body.id
  };

  const res3 = await request.post('/api/category')
  .set('Authorization', 'Bearer abcdef')
  .send(testSub2)
  .expect(201);

  //Retrieve the secondary category, and verify the 3rd as a sub
  const subCat = await request.get(`/api/category/${res2.body.id}`);

  expect(subCat.body.childCategories[0]).toBe(res3.body.id);

});

test('it fails to retrieve a bogus id', async() => {

  await request.get('/api/category/5a364020d16bc5458fa90879')
  .expect(400);

});

test('it retrieves all top level categories', async () => {

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

  await request.post('/api/category')
  .set('Authorization', 'Bearer abcdef')
  .send(testSub)
  .expect(201);

  //Lastly, create a third, also a primary
  const anotherPrimary = {
    categoryName: 'Second Prime Test Name',
    description: 'This is another primary category',
    isMajor: true,
  };

  await request.post('/api/category')
  .set('Authorization', 'Bearer abcdef')
  .send(anotherPrimary)
  .expect(201);

  //Ok, now try to retrieve "all" major categories
  const res4 = await request.get('/api/category')
  .expect(200);

  expect(res4.body.length).toBe(2);

});