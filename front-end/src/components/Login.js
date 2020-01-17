
import React, { useEffect, useState } from 'react';
import { useInputField, resetField } from '../hooks/inputField';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginService from '../services/loginService';
import Config from '../utils/config';
import { userAdd } from '../reducers/userReducer';


import  './dialogs.css';

function Login(props) {

  //Custom hooks, used for input fields & validation
  const username = useInputField('text');
  const password = useInputField('password');

  //Get the ability to add the logged in user to the state
  const { userAdd : addUserToken } = props;

  //Used to determine if the effect has even run, should remove flicker
  const [effectHasRun, setEffectHasRun] = useState(false);

  useEffect(() => {

    //Look at the cookies to see if the session can be retrieved
    const sessionData = Cookies.get(Config.sessionName);
    if ( sessionData ) {

      //ToDo:  Place the session data in a redux store
      // setUserToken(sessionData);
      addUserToken(sessionData);

    }
    else {
      console.log('no cookie data');
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

      //ToDo:  Place this in a redux data store
      // setUserToken(session);
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
  if ( props.tokenData || !effectHasRun ) {
    return null;
  }

  return (
    <div>
      <div className="auth_form">
        <div className="authHeader">
          <h2>Login</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="inputs">
            <div className="auth_input">
              <label htmlFor="username">username: </label>
              <input name="username" id="username" data-testid="username_input" {...username} required />
            </div>
            <div className="auth_input">
              <label htmlFor="password">password: </label>
              <input name="password" id="password" data-testid="password_input" {...password} required />
            </div>
            <div className="auth_input">
              <button>Submit</button>
            </div>
          </div>
        </form>
        <div className="authFooter">
          <p>create an account</p>
        </div>
      </div>
    </div>
  );
}

//Grab the user data from the store, add it to props
function mapStateToProps(state) {
  const { userReducer } = state;

  return {
    tokenData: userReducer,
  };

}

//Map dispatch calls to the properties
const mapDispatchToProps = {
  userAdd,
};

Login.propTypes = {
  userAdd: PropTypes.func,
};


const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connectedLogin;