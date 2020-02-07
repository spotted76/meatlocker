
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import PropTypes from 'prop-types';

const CONFIGURE_REQUEST = '/api/category';


function Configure(props) {

  console.log('ok, but how');

  //Retrieve an authenticated user if one exists
  const { user } = props;

  //Construct a config option for the fetch object
  let config = undefined;
  if ( user ) {
    const bearer = `Bearer ${user.token}`;
    config = {
      headers: {
        Authorization: bearer
      }
    };
  }

  //Use custom hook to retrieve config data
  const [{ loading, error, data }, fetch] = useFetch(CONFIGURE_REQUEST, config);


  useEffect(() => {

    if (user.isAdmin) {

      const fetchPrimary = async () => {
        fetch();
      };
      fetchPrimary();
    }

  }, [fetch, user.token, user.isAdmin]);

  //If the user doesn't have permission, bounce them
  if (!user.isAdmin) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        {console.log("!!!!!!!!!!!LOADING")}
      <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    //Not sure, maybe a re-direct
    console.log('Error encoutered....');
    return null;
  }

  if (data) {
    console.log('WTF', data);
  }

  return (
    <div>
      <h1>Configure Page</h1>
    </div>
  );
}

Configure.propTypes = {
  user: PropTypes.object
};

//Get the required state data out of the props
function mapStateToProps(state) {
  const { majorCategories, userReducer } = state;
  return {
    user: userReducer,
    majorCategories
  };
}


const connectedConfigure = connect(mapStateToProps)(Configure);

export default connectedConfigure;