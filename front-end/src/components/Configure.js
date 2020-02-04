
import React from 'react';
import { connect } from 'react-redux';



function Configure(props) {

  return (
    <div>
      <h1>Configure Page</h1>
    </div>
  );
}

//Get the required state data out of the props
function mapStateToProps(state) {
  const { majorCategories } = state;
  return {
    majorCategories
  };
}


const connectedConfigure = connect(mapStateToProps)(Configure);

export default connectedConfigure;