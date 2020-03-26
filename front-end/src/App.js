import React from 'react';
import Login from './components/Login';
import Banner from './components/Banner';
import Configure from './components/Configure';
import Search from './components/Search';
import PropTypes from 'prop-types';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
            <Redirect to='/search'></Redirect>
          </Route>
          <Route exact path='/configure'>
            <Configure />
          </Route>
          <Route path='/configure/category/:id'>
            <Configure />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
        </Switch>

      </div>
    </Router>
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
