

import React from 'react';
import store from '../../store';
import Banner from '../Banner';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

beforeEach(() => {

});

test('it has no logged in user', () => {

  const component = render(<Banner store={store} />);
  const { getByText, container } = component;

  const invisibleDiv = container.querySelector('.user_status_invisible');
  const visibleDiv = container.querySelector('.user_status_visible');

  expect(getByText('Meatlocker')).toBeDefined();
  expect(invisibleDiv).toBeDefined();
  expect(visibleDiv).toBeNull();
  
});


test('it has a logged in user', () => {

  //Force some data into the store, so that there is a valid user
  store.getState().userReducer = {
    name: 'Test User'
  };


  const component = render(<Banner store={store} />);
  const { getByText, container } = component;

  const invisibleDiv = container.querySelector('.user_status_invisible');
  const visibleDiv = container.querySelector('.user_status_visible');

  expect(getByText('Meatlocker')).toBeDefined();
  expect(invisibleDiv).toBeNull();
  expect(visibleDiv).toBeDefined();
  
});