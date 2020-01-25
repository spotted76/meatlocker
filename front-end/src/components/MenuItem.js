
import React from 'react';

/* This is The main menu item, the children element to populate
   it with eis a type MenuGlyph.
*/

function MenuItem( props ) {


  return (
    <div className='menu_item'>
        {props.children}
    </div>
  );

};


/*  This is the "user facing icon / text that the user will interact
    with.  The child elements to be passed to it are what is used to poulate
    this item.  Styling for the glyph is to be passed in under props
*/
function MenuGlyph(props) {

  const { userStyle } = props;

  return (
    <div className={userStyle}>
      <div className='glyph'>
        {props.children}
      </div>
    </div>
  )
}

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



export {
  MenuItem,
  MenuGlyph,
  HiddenMenu
};