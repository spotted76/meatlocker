

const checkPrivs = require('../../src/middleware/checkPrivs');


//Create a mock res object
const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};


//Test against whitelisted urls..  req does not require authentication
test('it tests a whitelisted req', () => {

  const req = { 
    url: '/api/user'
  };

  //Create mocks
  const next = jest.fn();
  const res = mockResponse();

  checkPrivs(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();


});

//Test against request that is not whitelisted, and has not authorized user
test('it makes a request with an invalid user', () => {


  const req = { 
    url: '/api/something'
  };

  const next = jest.fn();
  const res = mockResponse();

  checkPrivs(req, res, next);

  expect(next).toHaveBeenCalledTimes(0);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ error: 'unauthenticated user' });

});

//Test against a request that is not whitelisted, with a valid user.
test('it makes a request with a valid user', () => {

  const req = { 
    url: '/api/user',
    authUser: 'user'
  };

  //Create mocks
  const next = jest.fn();
  const res = mockResponse();

  checkPrivs(req, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
});