
import reducer, { userAdd, userRemove, ADD_USER, REMOVE_USER } from './userReducer';


test('test userAdd creator', () => {

  const userData = {
    payload: 'userData',
  };

  const result = userAdd(userData);

  expect (result.type).toEqual(ADD_USER);
  expect (result.data.payload).toEqual(userData.payload);

});


test('test userRemove creator', () => {

  const result = userRemove();
  expect (result.type).toEqual(REMOVE_USER);

});


test('test null Reducer', () => {

  const result = reducer(null, {});
  expect(result).toBeNull();

});

test('test addUser Reducer', () => {

  const payload = {
    type: ADD_USER,
    data: 'payload data'
  };
  const result = reducer(null, payload);
  expect(result).toEqual(payload.data);

});

test('test default Reducer', () => {

  const payload = {
    type: REMOVE_USER,
    data: 'payload data'
  };
  const result = reducer(null, payload);
  expect(result).toBeNull();

});