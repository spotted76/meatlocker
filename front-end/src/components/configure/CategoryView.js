
import style from './styling/CategoryView.module.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setSelCat } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';
import CreateEdit from './CreateEdit';

import PropTypes from 'prop-types';


function populateCategoryView (categoryData) {

  if (categoryData) {
    console.log(categoryData);
    return categoryData.map(category => <CategoryListItem key={category.id} data={category} />);
  }

}

function CategoryView(props) {

  //Retrieve an authenticated user if one exists
  const { 
    user, //Logged in user info
    categoryData, //Data stored in the top level category store
    setSelCat //Data to store what is current selected in the category view 
  } = props;


  //Determines visibility of modal create/edit dialogs
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (isEdit) => {
    console.log('isEdit ', isEdit);
    setIsEdit(isEdit);
    setCreateEditVisible(!createEditVisible);
  };

  //Method used to handle a category selection
  const categoryClicked = (evt) => {
    evt.stopPropagation();
    console.log('clickety click ', evt.target.id);
    console.log(setSelCat);
    setSelCat(evt.target.id);
  };

    //If the user doesn't have permission, bounce them
  if (!user.isAdmin) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }

  return (
    <div className="category_view">
      <h2>Categories & Items</h2>
      <div className = {style.mainContainer}>
        <ul onClick={categoryClicked}>
          {populateCategoryView(categoryData)}
        </ul>
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
  const { majorCategories, userReducer, configureSelected } = state;
  return {
    user: userReducer,
    categoryData: majorCategories,
    selected: configureSelected
  };
}

const mapDispatchToProps = {
  setSelCat
};


const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default connectedCategoryView;