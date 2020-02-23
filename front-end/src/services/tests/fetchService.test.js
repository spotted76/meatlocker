
import { addBearerToken } from '../fetchService';

test('it creates a bearer token', () => {


  console.log("MY RETRIEVE GOT CALLED");

  const config = {};
  const expectation = 'Bearer token_text';
  addBearerToken(config, 'token_text');


  expect(config.headers).toBeDefined();
  expect(config?.headers?.Authorization).toBeDefined();
  expect(config?.headers?.Authorization).toBe(expectation);

});