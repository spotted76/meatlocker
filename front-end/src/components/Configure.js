
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryService from '../services/categoryServices';
import { setTopLevelCat } from '../reducers/majorCategoryReducer';

import PropTypes from 'prop-types';

const CONFIGURE_REQUEST = '/api/category';


function Configure(props) {

  //Retrieve an authenticated user if one exists
  const { 
    user, //Logged in user info
    setTopLevelCat, // dispatch for top level category data
    categoryData //Data stored in the top level category store 
  } = props;


  //Retrieves category data
  const [catService] = useState(new CategoryService(CONFIGURE_REQUEST));
  catService.setAuthToken(user.token);


  useEffect(() => {

    console.log('configure effect run');

    if (user.isAdmin && !categoryData) {

      const fetchPrimary = async () => {
        await catService.fetchMajorCategories();
        if ( !catService.error ) {
          setTopLevelCat(catService.data);
        }
        else {
          //Need to add an alert here about loading & errors
          console.log('An error occurred loading Category data');
        }
      };
      fetchPrimary();
    }
  }, [user.isAdmin, catService, setTopLevelCat, categoryData]);

  //If the user doesn't have permission, bounce them
  if (!user.isAdmin) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  return (
    <div>
      <h1>Configure Page</h1>
    </div>
  );
}

Configure.propTypes = {
  user: PropTypes.object,
  setTopLevelCat: PropTypes.func,
  categoryData: PropTypes.array
};

//Get the required state data out of the props
function mapStateToProps(state) {
  const { majorCategories, userReducer } = state;
  return {
    user: userReducer,
    categoryData: majorCategories
  };
}

const mapDispatchToProps = {
  setTopLevelCat
};


const connectedConfigure = connect(mapStateToProps, mapDispatchToProps)(Configure);

export default connectedConfigure;