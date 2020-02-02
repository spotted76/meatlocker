
import React, { useEffect, useState } from 'react';
import { useInputField, resetField } from '../hooks/inputField';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginService from '../services/loginService';
import Config from '../utils/config';
import { userAdd } from '../reducers/userReducer';


import  './styling/dialogs.css';

function Login(props) {

  //Custom hooks, used for input fields & validation
  const username = useInputField('text');
  const password = useInputField('password');

  //Get the ability to add the logged in user to the state
  const { userAdd : addUserToken } = props;

  //Used to determine if the effect has even run, should remove flicker
  const [effectHasRun, setEffectHasRun] = useState(false);

  useEffect(() => {

    console.log('Login effect');

    //Look at the cookies to see if the session can be retrieved
    let sessionData = Cookies.get(Config.sessionName);
    if ( sessionData ) {

      //Place the session data in a redux store
      sessionData = JSON.parse(sessionData);
      addUserToken(sessionData);

    }

    setEffectHasRun(true);

  },[addUserToken]);


  //Function that gets executed by the form submitting
  const onSubmit = async (evt) => {
    evt.preventDefault();

    // This should not ever happen, required fields should cover it
    if ( !username.value || !password.value) {
      return;
    }

    //Send the login info to the server
    const session = await LoginService.login( 
      username.value, password.value);

    if ( session ) {
      Cookies.set(Config.sessionName, session, { expires: Config.sessionDuration });

      //Place this in a redux data store
      addUserToken(session);
    }
    else {
      //TODO:  Put up an error message here
    }

    //Empty the fields
    resetField(username);
    resetField(password);
  };

  //User is logged in, no need to render
  if ( props.userData || !effectHasRun ) {
    return null;
  }

  return (
    <div>
      <div className="input_form">

        <div id="input_banner">
          <p>Meatlocker</p>
        </div>

        <form onSubmit={onSubmit} className="if_form">
          <input name="username" id="username" data-testid="username_input" placeholder="username" {...username} required />
          <input name="password" id="password" data-testid="password_input" placeholder="password" {...password} required />
          <button className="login_submit">Submit</button>
        </form>

      </div> {/* input_form */}
    </div>
  );
}

//Grab the user data from the store, add it to props
function mapStateToProps(state) {
  const { userReducer } = state;

  return {
    userData: userReducer,
  };

}

//Map dispatch calls to the properties
const mapDispatchToProps = {
  userAdd,
};

Login.propTypes = {
  userAdd: PropTypes.func,
  userData: PropTypes.object
};


const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connectedLogin;