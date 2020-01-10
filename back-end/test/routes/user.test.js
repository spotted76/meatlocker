

const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);


test('test successful post for new user', async done => {

  const res = await request.post('/api/user');

  expect(res.status).toEqual(200);

  console.log(res);

  done();

});

