
import React from 'react';
import { useInputField, resetField } from '../hooks/inputField';

import LoginService from '../services/loginService';


function Login() {

  // const [username, setUsername] = useState('');
  const username = useInputField('text');
  const password = useInputField('password');

  //Function that gets executed by the form submitting
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(username.value);
    console.log(password.value);

    //Send the login info to the server
    LoginService.login( 
      username.value, password.value);

    //Empty the fields
    resetField(username);
    resetField(password);
  };

  return (
    <div>
      <div className="auth_form">
        <div className="authHeader">
          <h2>Login</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="auth_input">
            <label htmlFor="username">username: </label>
            <input name="username" {...username} required />
          </div>
          <div className="auth_input">
            <label htmlFor="password">password: </label>
            <input name="password" {...password} required />
          </div>
          <div className="auth_input">
            <button>Submit</button>
          </div>
          <div className="authFooter">
            <p>create an account</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;