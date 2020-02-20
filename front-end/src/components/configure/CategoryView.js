
import style from './styling/CategoryView.module.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setConfigSel } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';
import CreateEdit from './CreateEdit';

import useSWR from 'swr';
import { DEFAULT_URI, retrieveWithToken } from '../../services/fetchService';

import PropTypes from 'prop-types';


  /**
   * Helper function, maps cateogry data to a CategoryListItem component
   */
function populateCategoryView (categoryData) {

  if (categoryData) {
    return categoryData.map(category => <CategoryListItem key={category.id} data={category} />);
  }

}

function CategoryView(props) {

  const { 
    user, //Logged in user info
    setConfigSel, //Data to store what is current selected in the category view 
    detailSelected, //Category or Element data that has been selected by the user
  } = props;


  //Retrieve Major category data, only if there is no user selection
  const { data: allCategories, error: allCategoriesError } = 
    useSWR( detailSelected ? null :  [DEFAULT_URI, user.token], retrieveWithToken);

  //retrieve a user selected category from the detail pane if selected
  const selectedURI = `${DEFAULT_URI}/${detailSelected?.id}`;
  const { data: selectedData, error: selectedError} = 
    useSWR( detailSelected ?  [selectedURI, user.token] : null, retrieveWithToken);

  //Show child categories from the selected sub-catory, otherwise, if nothing selected, show only Major Categories
  const dataToDisplay = selectedData ? selectedData.childCategories : allCategories;


  //Determines visibility of modal create/edit dialogs
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (isEdit) => {
    setIsEdit(isEdit);
    setCreateEditVisible(!createEditVisible);
  };

  //Method used to handle a category selection
  const categoryClicked = (evt) => {
    evt.stopPropagation();
    setConfigSel(evt.target.id, 'category');
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
          {populateCategoryView(dataToDisplay)}
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
  categoryData: PropTypes.array
};

//Get the required state data out of the props
function mapStateToProps(state) {
  const { userReducer, configureSelected,detailSelected } = state;
  return {
    user: userReducer, //User Auth info, including token
    selected: configureSelected, //Sets a react store for the category or item selected
    detailSelected //Sets the react store for the category or item selected from the detail panel
  };
}

const mapDispatchToProps = {
  setConfigSel, //Dispatch function to change the store of what is selected from the CategoryView
};


const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView);
export default connectedCategoryView;