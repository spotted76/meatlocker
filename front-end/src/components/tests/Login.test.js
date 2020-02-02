
import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import LoginService from '../../services/loginService';
import Cookies from 'js-cookie';


//Import login & store (store needed for redux);
import Login from '../Login';
import store from '../../store';

jest.mock('../../services/loginService');
jest.mock('js-cookie');

beforeEach(() => {
  jest.clearAllMocks();
});

test('it can render the login dialog', () => {

  const component = render(<Login store={store} />);
  expect(component.container.querySelectorAll('input').length).toBe(2);
  expect(component.getByText('Submit')).toBeDefined();

});

test('it can deny submit - no username and password', () => {


  //Don't fill in username or password, it should not call the LoginService

  const { getByText } = render(<Login store={store} />);

  fireEvent.click(getByText('Submit'));

  expect (LoginService.login).toHaveBeenCalledTimes(0);

});

test('it can deny submit - no username', async () => {

  //Fill in a username & password, 

  const component = render(<Login store={store} />);
  const { getByText, getByTestId } = component;

  //Type any uname/pass into the fields
  userEvent.type(getByTestId('password_input'), 'ex_password');
  fireEvent.click(getByText('Submit'));

  //Calls to reset input fields will modify state, so wait for the component to re-render
  expect(LoginService.login).toHaveBeenCalledTimes(0);

});

test('it can deny submit - no password', async () => {

  //Fill in a username & password, 

  const component = render(<Login store={store} />);
  const { getByText, getByTestId } = component;

  //Type any uname/pass into the fields
  userEvent.type(getByTestId('username_input'), 'ex_username');
  fireEvent.click(getByText('Submit'));

  //Calls to reset input fields will modify state, so wait for the component to re-render
  expect(LoginService.login).toHaveBeenCalledTimes(0);

});

test('it can submit', async () => {

  //Fill in a username & password, 

  const component = render(<Login store={store} />);
  const { getByText, getByTestId } = component;

  //Type any uname/pass into the fields
  userEvent.type(getByTestId('username_input'), 'ex_username');
  userEvent.type(getByTestId('password_input'), 'ex_password');
  fireEvent.click(getByText('Submit'));

  //Calls to reset input fields will modify state, so wait for the component to re-render
  await waitForDomChange(component);
  expect(LoginService.login).toHaveBeenCalledTimes(1);

});

test('it sets a cookie', async () => {

  //Fill in a username & password, 

  const component = render(<Login store={store} />);
  const { getByText, getByTestId } = component;

  //Modify LoginService.login to return a "token"
  const mockToken = { data: 'mocked_token' };
  LoginService.login.mockImplementation(() => {
    return mockToken;
  });

  //Type any uname/pass into the fields
  userEvent.type(getByTestId('username_input'), 'ex_username');
  userEvent.type(getByTestId('password_input'), 'ex_password');
  fireEvent.click(getByText('Submit'));

  //Calls to reset input fields will modify state, so wait for the component to re-render
  await waitForDomChange(component);
  expect(LoginService.login).toHaveBeenCalledTimes(1);
  expect(Cookies.set).toHaveBeenCalledTimes(1);

});

test('it can retrieve a cookie',() => {

  
  //useEffect call within Login should retrieve the token
  const mockToken = JSON.stringify({ username: 'mocked_username' });
  Cookies.get.mockImplementation(() => {
    return mockToken;
  });

  const component = render(<Login store={store} />);
  const { getByText } = component;

  //Login should not be defined, so this should throw an error
  expect( () => getByText('Login')).toThrow();

});