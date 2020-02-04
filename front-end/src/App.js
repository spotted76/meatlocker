import React from 'react';
import Login from './components/Login';
import Banner from './components/Banner';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './app.css';

function App() {

  return (
    <Router>

      <div className="main_div">
        {/* Banner Should always be visible */}
        <Banner /> 
        
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/configure'>
            <Configure />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

function Configure() {
  return (
    <div>
    {console.log('Configure is visible' )}
    <h1>Configure</h1>
    </div>
  );
}

export default App;
