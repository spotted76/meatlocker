
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MenuItem, MenuGlyph, HiddenMenu } from './MenuItem';

import './styling/banner.css';

function Banner(props) {

  const { userData } = props;
  const [userStyle, setUserStyle] = useState('user_status_invisible');

  //If there is a logged in user, display the name
  useEffect(() => {

    console.log('Banner Effect');

    //set the css styling to apply to the className div
    setUserStyle( !userData ? 'user_status_invisible' : 'user_status_visible');


  }, [userData, userStyle]);

  return (
    <div>
      <div className='header'>
        <ul>
          <li>
            <MenuItem >
              <MenuGlyph userStyle={userStyle}>
                {userData?.name}
                <i className='fas fa-user-circle fa-2x'></i>
              </MenuGlyph>
              <HiddenMenu>
                <li>Admin Console</li>
                <li>Logout</li>
              </HiddenMenu>
            </MenuItem>
          </li>
        </ul>
      </div>
      <div className="banner">
        <h1>Meatlocker</h1>
        <img src="https://img.icons8.com/plasticine/100/000000/steak.png" alt="steak" />
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

const ConnectedBanner = connect(mapStateToProps)(Banner);
export default ConnectedBanner;