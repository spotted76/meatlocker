
import style from './styling/CategoryView.module.css';

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setConfigSel } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';
import CreateEdit from './CreateEdit';
import CategoryStoreHelper from '../../utils/categoryStoreHelper';
import { addSubCat } from '../../reducers/categoryReducer';



import PropTypes from 'prop-types';


function populateCategoryView (categoryData) {

  /**
   * Helper function, maps cateogry data to a CategoryListItem component
   */
  if (categoryData) {
    return categoryData.map(category => <CategoryListItem key={category.id} data={category} />);
  }

}

function CategoryView(props) {

  //Retrieve an authenticated user if one exists
  const { 
    user, //Logged in user info
    categoryData, //Data stored in the top level category store
    setConfigSel, //Data to store what is current selected in the category view 
    detailSelected, //Category or Element data that has been selected by the user
    addSubCat //Used to update the store with freshly retrieved subcategory data
  } = props;

  //This is used to Show sub-category, or item detail.  If it's set, the top category
  //Data is not displayed.
  const [subDataItem, setSubDataItem] = useState(null);

  //Use the cateogry helper to get only Major category data
  const catStoreRef = useRef();
  catStoreRef.current = [...categoryData];


  //Helper used to retrieve major/top level category information
  const catHelper = new CategoryStoreHelper(catStoreRef.current, user.token);
  const majorCategories = catHelper.retrieveMajorCategories();


  //Show child categories from the selected sub-catory, otherwise, if nothing selected, show only Major Categories
  const dataToDisplay = subDataItem ? subDataItem.childCategories : majorCategories;

  useEffect(() => {

    if ( detailSelected ) {
      //Request the detailed information that the user selected
      let fullDetailSelected = {};
      const subCatHelper = new CategoryStoreHelper(catStoreRef.current, user.token);

      const asyncEffect = async() => {
        fullDetailSelected =  await subCatHelper.retrieveFullPopulatedCategory(detailSelected.id, addSubCat);

        setSubDataItem(fullDetailSelected);
      }; asyncEffect();
      
    }

  }, [detailSelected, addSubCat, user.token]);


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
  setTopLevelCat: PropTypes.func,
  categoryData: PropTypes.array
};

//Get the required state data out of the props
function mapStateToProps(state) {
  const { majorCategories, userReducer, configureSelected,detailSelected } = state;
  return {
    user: userReducer,
    categoryData: majorCategories,
    selected: configureSelected,
    detailSelected
  };
}

const mapDispatchToProps = {
  setConfigSel,
  addSubCat
};


const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default connectedCategoryView;