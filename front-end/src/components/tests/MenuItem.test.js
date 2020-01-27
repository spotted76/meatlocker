
import React from 'react';
import { 
  MenuItem,
  MenuGlyph,
  HiddenMenu 
} from '../MenuItem';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



test('Menu item is visible', () => {

  const component = render( 
    <MenuItem visible={true} >
      <p>testing component</p>
      <p>another element</p>
    </MenuItem> );

  const { queryByText } = component;

  //pull dom elements out of the component & verify
  expect(queryByText('testing component')).toBeInTheDocument();

});

test('MenuItem is not visible', () => {
  const component = render( 
    <MenuItem visible={false} >
      <p>testing component</p>
      <p>another element</p>
    </MenuItem> );

  const { queryByText } = component;

  //pull dom elements out of the component & verify
  expect(queryByText('testing component')).not.toBeInTheDocument();
});

test('MenuGlyph can be rendered', () => {


  const { container, queryByText } = render(
    <MenuGlyph glyphClass={'test_class'}>
      Child Data
      <div>
        <p>Child Div</p>
      </div>
    </MenuGlyph>
  );

  expect(container.querySelector('.test_class')).toBeTruthy();
  expect(container.querySelector('.glyph')).toBeTruthy();
  expect(queryByText('Child Div')).toBeInTheDocument();

});


test('Hidden Menu can be rendered', () => {


  const { container, queryByText } = render(
    <HiddenMenu>
      <li>Item one</li>
      <li>Item two</li>
    </HiddenMenu>
    );

  expect(container.querySelector('.hidden_menu')).toBeTruthy();
  expect(queryByText('Item two')).toBeInTheDocument();


});