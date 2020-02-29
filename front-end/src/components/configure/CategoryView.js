
import style from './styling/CategoryView.module.css';

import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setConfigSel, unsetSelCat } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';
import CreateEditCategory from './CreateEditCategory';

import useSWR, { mutate }  from 'swr';
import { postWithToken } from '../../services/categoryService';
import { DEFAULT_URI, retrieveWithToken } from '../../services/fetchService';

import PropTypes from 'prop-types';




//Also export this function (non-connected to assist with unit testing)
export function CategoryView(props) {

  const { 
    user, //Logged in user info
    setConfigSel, //Data to store what is current selected in the category view 
    unsetSelCat, //Clears the selected value from the category view
    catId,
  } = props;

  //Compare current URL vs previous, clear the details if it changes
  const prevUriId = useRef();
  if ( prevUriId.current !== catId) {
    prevUriId.current = catId;
    unsetSelCat();
  }

  //Retrieve Major category data, only if there is no user selection
  const { data: allCategories, error: allCategoriesError } = 
    useSWR( catId ? null :  [DEFAULT_URI, user.token], retrieveWithToken);

  //retrieve a user selected category from the detail pane if selected
  const selectedURI = `${DEFAULT_URI}/${catId}`;
  const { data: selectedData, error: selectedError} = 
    useSWR( catId ?  [selectedURI, user.token] : null, retrieveWithToken);

  //Show child categories from the selected sub-catory, otherwise, if nothing selected, show only Major Categories
  const dataToDisplay = selectedData ? selectedData.childCategories : allCategories;


  //Determines visibility of modal create/edit dialogs
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  const categoryBanner = selectedData ? selectedData.categoryName : 'Main Categories';


  //Called from the hidden modal Create/Edit
  const handleCreate = async (type, newObj) => {

    //Ok, data returned, now fill in the rest of the object with 
    //details known to the Category View
    newObj.parent = catId ? catId : null;
    newObj.isMajor = catId ? false : true;

    if ( type === 'category' ) {
      const result = await postWithToken(DEFAULT_URI, newObj, user.token)

      let URIToMutate;
      let dataToMutate;
      //Now update the local SWR store
      if ( catId ) {
        URIToMutate = selectedURI;
        dataToMutate = {
          ...selectedData,
          childCategories: selectedData.childCategories.concat(result)
        }
      }
      else {
        URIToMutate = DEFAULT_URI;
        dataToMutate = allCategories.concat(result);
      }

      mutate([URIToMutate, user.token], dataToMutate);
    }

  };


  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (isEdit) => {

    setIsEdit(isEdit);
    setCreateEditVisible(!createEditVisible);
  };

  /**
 * Helper function, maps cateogry data to a CategoryListItem component
 */
const populateCategoryView = (categoryData) =>  {

  if (categoryData && categoryData.length > 0) {
    console.log(categoryData);
    return categoryData.map(category => 
      <CategoryListItem 
        key={category.id} 
        data={category} 
      />);
  }
  else {
    return (
      <div>
        <p>No Categories or Items</p>
        <p>Select create to create a new Category or Item</p>
      </div>
    );
  }

}

  if ( allCategoriesError || selectedError ) {
    console.log('retrieves failed');
    //TODO:  Probably return null, and display an alert
  }

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
      <h2>{categoryBanner}</h2>
      <div className = {style.mainContainer}>
         <ul>
          {populateCategoryView(dataToDisplay)}
        </ul>
      </div>
      <div className={style.buttonDiv}>
        <button onClick={() => toggleCreateEdit(false)} >New Category</button>
        <button onClick={() => toggleCreateEdit(true)} >Edit Category</button>
      </div>
      <CreateEditCategory
        visible={createEditVisible}
        toggle={toggleCreateEdit}
        isEdit={isEdit}
        performAction={handleCreate}
      /> {/* Hidden by default, this is a modal view */}
    </div>
  );
}

CategoryView.propTypes = {
  user: PropTypes.object, 
  categoryData: PropTypes.array
};

//Get the required state data out of the props
function mapStateToProps(state) {
  const { userReducer, configureSelected } = state;
  return {
    user: userReducer, //User Auth info, including token
    selected: configureSelected, //Sets a react store for the category or item selected
  };
}

const mapDispatchToProps = {
  setConfigSel, //Dispatch function to change the store of what is selected from the CategoryView
  unsetSelCat, //Dispatch function to unset or deselct, clearing the detail view
};


const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView);
export default connectedCategoryView;