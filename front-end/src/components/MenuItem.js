
import React from 'react';
import PropTypes from 'prop-types';

import './styling/menuitem.css';

/* This is The main menu item, the children element to populate
   it with eis a type MenuGlyph.
*/

function MenuItem( props ) {

  if ( !props.visible ) {
    return null;
  }

  return (
    <div className='menu_item'>
        {props.children}
    </div>
  );

}

MenuItem.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};


/*  This is the "user facing icon / text that the user will interact
    with.  The child elements to be passed to it are what is used to poulate
    this item.  Styling for the glyph is to be passed in under props
*/
function MenuGlyph(props) {

  const { glyphClass } = props;

  return (
    <div className={glyphClass}>
      <div className='glyph'>
        {props.children}
      </div>
    </div>
  );
}

MenuGlyph.propTypes = {
  glyphClass: PropTypes.string,
  children: PropTypes.array,
};

/*
  This is the hidden menu under the MenuGlyph.  This menu will be displayed when the 
  user interacts with the MenuGlyph
*/
function HiddenMenu(props) {
  return (
    <div className='hidden_menu'>
        <ul>
          {props.children}
        </ul>
    </div>
  );
}

HiddenMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};



export {
  MenuItem,
  MenuGlyph,
  HiddenMenu
};