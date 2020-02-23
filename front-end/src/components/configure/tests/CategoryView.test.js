

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import useSWR from 'swr';

import CategoryView from '../CategoryView';
import { CategoryView as CatViewTest }from '../CategoryView';

import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';

jest.mock('swr');
jest.mock('../../../reducers/configureSelected');

const mockStore = configureStore([]);
let majorCategoryData;
let subCategoryData;

beforeEach(() => {

  //Array of category objects
  majorCategoryData = [
    {
      categoryName: 'Major Category',
      description: 'description',
      isMajor: true,
      parent: null,
      childCategories: [],
      items: [],
      id: 1234
    }
  ];

  //single category object
  subCategoryData =
  {
    categoryName: 'Sub Category',
    description: 'description',
    isMajor: false,
    parent: 1234,
    childCategories: [
      {
        categoryName: 'Sub Category 2',
        description: 'description 2',
        isMajor: false,
        parent: 4567,
        childCategories: [],
        items: [],
        id: 8910
      }
    ],
    items: [],
    id: 4567
  };


});

/**
 * This test is expected to re-direct to / if the user is not authorized to
 * view the /configure page
 */
test('is redirects when not logged authorized', () => {

  let store = mockStore({
    userReducer: {
      token: 'empty_token',
    }
  });

  useSWR.mockReturnValue({
    data: null
  });


  const history = createMemoryHistory();
  history.push('/configure');

  render(
    <Router history={history} >
      <Provider store={store}>
        <CategoryView />
      </Provider>
    </Router>
  );

  expect(history.location.pathname).toBe('/');

});

/**
 * This test should show major category data, as the second call to 
 * useSWR should not fetch a sub category
 */
test('it displays major category data', () => {


  let store = mockStore({
    userReducer: {
      token: 'empty_token',
      isAdmin: true
    }
  });

  useSWR
  .mockReturnValueOnce({
    data: majorCategoryData
  })
  .mockReturnValue({
    data: null
  });

  const history = createMemoryHistory();
  history.push('/configure');

  const component = render(
    <Router history={history} >
      <Provider store={store}>
        <CategoryView />
      </Provider>
    </Router>
  );

  const { queryByText } = component;
  expect(queryByText(majorCategoryData[0].categoryName)).toBeDefined();

});

/**
 * This test should show sub category data, as the second call to 
 * useSWR will return sub category data
 */
test('it displays sub category data', () => {


  let store = mockStore({
    userReducer: {
      token: 'empty_token',
      isAdmin: true
    }
  });

  useSWR
  .mockReturnValueOnce({ //Should display sub-category even if major category available
    data: majorCategoryData
  })
  .mockReturnValueOnce({
    data: subCategoryData
  })
  .mockReturnValue({
    data: null
  });

  const history = createMemoryHistory();
  history.push('/configure');

  const component = render(
    <Router history={history} >
      <Provider store={store}>
        <CategoryView />
      </Provider>
    </Router>
  );

  const { queryByText } = component;
  expect(queryByText(subCategoryData.childCategories[0].categoryName)).toBeDefined();

});


test('it selects an item from the category view', () => {


  //Define props to manually pass in
  const user = {
    token: 'empty_token',
    isAdmin: true
  };
  const setConfigSel = jest.fn();
  const unsetSelCat = jest.fn();
  const catId = undefined;

  useSWR
  .mockReturnValueOnce({
    data: majorCategoryData
  })
  .mockReturnValue({
    data: null
  });

  const history = createMemoryHistory();
  history.push('/configure');

  const component = render(
    <Router history={history} >
      <CatViewTest user={user} setConfigSel={setConfigSel} unsetSelCat={unsetSelCat} catId={catId} />
    </Router>
  );

  const { queryByText } = component;
  fireEvent.click(queryByText(majorCategoryData[0].categoryName));
  expect(setConfigSel.mock.calls.length).toBe(1);


});
