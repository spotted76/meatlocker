
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Config from '../utils/config'
import { userRemove } from '../reducers/userReducer';

import { MenuItem, MenuGlyph, HiddenMenu } from './MenuItem';

import './styling/banner.css';


function Banner(props) {

  const { userData } = props;
  const visible = userData ? true : false;

  //Logs the user out of an active session
  const logout = () => {
    //Delete the cookie, and  log the user out of the  state
    Cookies.remove(Config.sessionName);
    props.userRemove();
  }
  
  //Customizes the user menu based on privs
  const buildUserMenu = (isAdmin) => {
    let menuItems = [];
    if ( isAdmin )
    {
      menuItems.push(<li key="admin" >AdminConsole</li>);
    }
    menuItems.push(<li key="logout" onClick={logout}>Sign Out</li>);
    return menuItems;
  }
  
  //Only display the banner if the user is logged in
  if ( !visible ) 
  {
    return null;
  }
  
  return (
    <div>
      <div className='header'>
        <div className='header_text'>
          <p>Meatlocker</p>
        </div>
        <ul>
          <li>
            <MenuItem visible={visible}>
              <MenuGlyph glyphClass={'menu_glyph_style'}>
                {userData?.name}
                <i className='fas fa-user-circle fa-2x'></i>
              </MenuGlyph>
              <HiddenMenu>
                {buildUserMenu(userData.isAdmin)}
              </HiddenMenu>
            </MenuItem>
          </li>
        </ul>
      </div>
    </div>
  );
}

//Set the different types expected
Banner.propTypes = {
  userData: PropTypes.object
}

//Get the user data out of the redux store
const mapStateToProps = (state) => {
  return {
    userData: state.userReducer
  };
};

//Get the dispatch functions and map them to props
const mapDispatchToProps = {
  userRemove,
}

const ConnectedBanner = connect(mapStateToProps, mapDispatchToProps)(Banner);
export default ConnectedBanner;