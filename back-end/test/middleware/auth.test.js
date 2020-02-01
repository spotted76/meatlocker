
const authUser = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

/*
Clear out everything between tests
*/
beforeEach(() => {
  jest.clearAllMocks();
});


/*
Basic Test case.  Tests the case where no token is supplied at all
*/
it('tests auth no token', () => {

  const req = {};
  const res = {};
  const mockNext = jest.fn();

  authUser(req, res, mockNext);

  expect(mockNext).toHaveBeenCalledTimes(1);
  expect(req.authUser).toBeUndefined();

});

/*
Test case where a token has been supplied, but it fails validation
*/
it('tests invalid token', () => {

  const req = { token: 'atoken' };
  const res = {};
  const mockNext = jest.fn();

  //Mock out the call to verify
  jwt.verify.mockImplementation(() => {
    throw new Error('token does not match');
  });

  authUser(req, res, mockNext);

  expect(mockNext).toHaveBeenCalledTimes(1);
  expect(req.authUser).toBeUndefined();

});

/*
  Tests a valid user login & verification.  In this case, the authorized user
  is added to the req object, creating a context for future calls.
*/
it('tests valid token', () => {

  const req = { token: 'atoken' };
  const res = {};
  const mockNext = jest.fn();
  const result = {
    username: 'logged_in_user',
    id: 1234567
  };

  //Mock out the call to verify
  jwt.verify.mockImplementation(() => {
    return result;
  });

  authUser(req, res, mockNext);

  expect(mockNext).toHaveBeenCalledTimes(1);
  expect(req.authUser).toBeDefined();
  expect(req.authUser).toEqual(result);
});