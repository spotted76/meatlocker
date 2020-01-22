import React from 'react';
import Login from './components/Login';
import Banner from './components/Banner';

import './app.css';

function App() {

  return (
    <div className="main_div">
      <Banner />
      <Login />
    </div>
  );
}

export default App;
