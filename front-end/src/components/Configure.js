
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import CategoryService from '../services/categoryServices';

import PropTypes from 'prop-types';

const CONFIGURE_REQUEST = '/api/category';


function Configure(props) {

  console.log('Confgure Object created');

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

  const [catService, setCatService] = 
    useState(new CategoryService(CONFIGURE_REQUEST, config));


  //Use custom hook to retrieve config data
  // const [{ loading, error, data }, fetch] = useFetch(CONFIGURE_REQUEST, config);
  const [actualData, setActualData] = useState(null);


  useEffect(() => {

    if (user.isAdmin) {

      console.log('in the admin effect');

      const fetchPrimary = async () => {
        // await fetch();
        await catService.fetchMajorCategories();
        setActualData(catService.data);
      };
      fetchPrimary();
    }

  }, [user.isAdmin, catService]);

  //If the user doesn't have permission, bounce them
  if (!user.isAdmin) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  if (catService.loading) {
    return (
      <div>
        {console.log("!!!!!!!!!!!LOADING")}
      <h1>Loading...</h1>
      </div>
    );
  }

  if (catService.error) {
    //Not sure, maybe a re-direct
    console.log('Error encoutered....');
    return null;
  }

  if (actualData) {
    console.log('WTF', catService.data);
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