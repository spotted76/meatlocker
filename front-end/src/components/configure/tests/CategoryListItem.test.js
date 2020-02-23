

import React from 'react';
import CategoryListItem from '../CategoryListItem';
import { render } from '@testing-library/react';

describe('Testing the CategoryListItem', () => {

  test('it can display the list item', () => {

    const data = {
      id: 1234,
      categoryName: 'Testing Category Name'
    };

    const component = render(
      <CategoryListItem data={data} />
    );

    const { getByText } = component;
    expect( getByText(data.categoryName)).toBeDefined();

  });


});