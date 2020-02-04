import React from 'react';
import Login from './components/Login';
import Banner from './components/Banner';
import Configure from './components/Configure';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

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


export default App;
