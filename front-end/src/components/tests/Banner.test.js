

import React from 'react';
import store from '../../store';
import Banner from '../Banner';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

beforeEach(() => {

});

test('it has no logged in user', () => {

  const component = render(<Banner store={store} />);
  const { container } = component;

  const menuItem = container.querySelector('.menu_item');

  expect(menuItem).toBeNull();
  
});


test('it has a logged in user', () => {

  //Force some data into the store, so that there is a valid user
  store.getState().userReducer = {
    name: 'Test User'
  };


  const component = render(<Banner store={store} />);
  const { getByText, container } = component;

  const menuItem = container.querySelector('.menu_item');

  expect(getByText('Meatlocker')).toBeDefined();
  expect(menuItem).not.toBeNull();
  expect(getByText('Test User')).toBeDefined();
  
});

test('it logs you out', () => {

    //Force some data into the store, so that there is a valid user
    store.getState().userReducer = {
      name: 'Test User'
    };
  
  
    const component = render(<Banner store={store} />);
    const { getByText, container } = component;
  
    //Verify the user is logged in by Test User being visible
    let menuItem = container.querySelector('.menu_item');
  
    expect(getByText('Meatlocker')).toBeDefined();
    expect(menuItem).not.toBeNull();
    expect(getByText('Test User')).toBeDefined();

    //Initiate a logout condition by selecting & clicking logout
    const logout = getByText('Sign Out');
    fireEvent.click(logout);

    //obtain the same .menu_item, and verify that is is not defined
    menuItem = container.querySelector('.menu_item');
    expect(menuItem).toBeNull();

});