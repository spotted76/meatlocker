
import axios from 'axios';
import LoginService from '../loginService';

jest.mock('axios');

beforeEach(() => {

  jest.resetAllMocks();

});


//Tests the "good case", where the server post returns data
test('it returns data', async () => {

  //Define data to return
  const mockResult = {
    data: 'contains mocked data'
  };

  axios.post.mockImplementation(() => {
    return mockResult;
  });

  const result = await LoginService.login('uname', 'password');

  expect(result).toMatch(mockResult.data);

});

test('it fails to return data', async () => {
  
    const result = await LoginService.login('uname', 'password');
  
    expect(result).toBeNull();

});