

import React from 'react';
import CategoryLinkItem from '../CategoryLinkItem';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('Testing the CategoryLinkItem', () => {

  test('it can display the link item', () => {

    const data = {
      id: 1234,
      categoryName: 'Testing Category Name'
    };

    const component = render(
      <Router >
        <CategoryLinkItem data={data} />
      </Router>
    );

    const { getByText } = component;
    expect( getByText(data.categoryName)).toBeDefined();

  });


});