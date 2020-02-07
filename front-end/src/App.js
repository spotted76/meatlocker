import React from 'react';
import Login from './components/Login';
import Banner from './components/Banner';
import Configure from './components/Configure';
import PropTypes from 'prop-types';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';


import './app.css';

function App(props) {

  //If the user is not logged in, show the Login component
  if ( !props.isLoggedIn ) {
    return (
      <Login />
    );
  }

  return (
    <Router>
      
      <div className="main_div">
        {/* Banner Should always be visible */}
        <Banner /> 
        
        <Switch>
          <Route exact path='/'>
            <Placeholder />
          </Route>
          <Route path='/configure'>
            <Configure />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

//For now, this is the "main" component page
function Placeholder() {
  return (
    <h1>...Placeholder...</h1>
  );
}

//Set the PropTypes for the App
App.propTypes = {
  isLoggedIn: PropTypes.object
};

//Need to get access to user reducer to determine if logged in
function mapStateToProps(state) {
  const { userReducer } = state;
  return {
    isLoggedIn: userReducer,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
