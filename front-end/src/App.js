import React from 'react';
import Login from './components/Login';

import './app.css';

function App() {

  return (
    <div className="main_div">
      <div className="banner">
        <h1>Meatlocker</h1>
        <img src="https://img.icons8.com/plasticine/100/000000/steak.png"/>
      </div>
      <Login />
    </div>
  );
}

export default App;
