

import './styling/configure.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CategoryView from './configure/CategoryView';
import DetailView from './configure/DetailView';
import CategoryService from '../services/categoryServices';
import { setTopLevelCat } from '../reducers/categoryReducer';


function Configure(props) {

  //URL to get category data
  const CATEGORY_URI = '/api/category';
  
  //All variables required from props
  const {
    user,
    categoryData,
    setTopLevelCat
  } = props;

  //Retrieves category data
  const [catService] = useState(() => new CategoryService(CATEGORY_URI));
  catService.setAuthToken(user.token);


    //Used to retrieve the initial top level categories
    useEffect(() => {

      console.log('Configure effect run');
 
      if (user.isAdmin && (categoryData.length === 0)) { //Only do this population when necessary
  
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


  return (
    <div>
      <h1>Configure Categories & Items</h1>
      <div className='configure_view'>
        <CategoryView />
        <DetailView />
      </div>
    </div>
  );
}

//Get the required state data out of the props
function mapStateToProps(state) {
  const { majorCategories, userReducer } = state;
  return {
    user: userReducer,
    categoryData: majorCategories,
  };
}

//Any data that needs to be 'set in the store goes here
const mapDispatchToProps = {
  setTopLevelCat,
};


const connectedConfigure = connect(mapStateToProps, mapDispatchToProps)(Configure);
export default connectedConfigure;