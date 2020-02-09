
import style from './styling/CategoryView.module.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryService from '../services/categoryServices';
import { setTopLevelCat } from '../reducers/majorCategoryReducer';

import Category from './Category';
import CreateEdit from './CreateEdit';

import PropTypes from 'prop-types';

const CATEGORY_URI = '/api/category';

function populateCategoryView (categoryData) {

  if (categoryData) {
    console.log(categoryData);
    return categoryData.map(category => <Category key={category.id} data={category} />);
  }

}

function CategoryView(props) {

  //Retrieve an authenticated user if one exists
  const { 
    user, //Logged in user info
    setTopLevelCat, // dispatch for top level category data
    categoryData //Data stored in the top level category store 
  } = props;


  //Retrieves category data
  const [catService] = useState(() =>new CategoryService(CATEGORY_URI));
  catService.setAuthToken(user.token);

  //Determines visibility of modal create/edit dialogs
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  //Used to retrieve the initial top level categories
  useEffect(() => {

    console.log('CategoryView effect run');

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

  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (isEdit) => {
    console.log('isEdit ', isEdit);
    setIsEdit(isEdit);
    setCreateEditVisible(!createEditVisible);
  };

  return (
    <div className="category_view">
      <h2>Categories & Items</h2>
      <div className = {style.mainContainer}>
        {populateCategoryView(categoryData)}
      </div>
      <div className={style.buttonDiv}>
        <button onClick={() => toggleCreateEdit(false)} >Create</button>
        <button onClick={() => toggleCreateEdit(true)}>Edit</button>
      </div>
      <CreateEdit visible={createEditVisible} toggle={toggleCreateEdit} isEdit={isEdit} /> {/* Hidden by default, this is a modal view */}
    </div>
  );
}

CategoryView.propTypes = {
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


const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default connectedCategoryView;