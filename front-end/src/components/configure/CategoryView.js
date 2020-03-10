
import style from './styling/CategoryView.module.css';

import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setConfigSel, unsetSelCat } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';
import CreateEditCategory from './CreateEditCategory';

import useSWR, { mutate }  from 'swr';
import { postWithToken, patchWithToken } from '../../services/genericServices';
import { DEFAULT_URI, retrieveWithToken, DEFAULT_CAT_URI } from '../../services/fetchService';

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
  const { data: selectedData, error: selectedError } = 
    useSWR( catId ?  [selectedURI, user.token] : null, retrieveWithToken);

  //Show child categories from the selected sub-catory, otherwise, if nothing selected, show only Major Categories
  const dataToDisplay = selectedData ? selectedData.childCategories : allCategories;


  //Determines visibility of modal create/edit dialogs
  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [itemForEdit, setItemForEdit] = useState(null); //Determines if modal dialog is edit or create


  const categoryBanner = selectedData ? selectedData.categoryName : 'Category Browser';


  //Called from the hidden modal Create/Edit
  const createNewCategory = async (newObj) => {

    //Ok, data returned, now fill in the rest of the object with 
    //details known to the Category View
    newObj.parent = catId ? catId : null;
    newObj.isMajor = catId ? false : true;

    const result = await postWithToken(DEFAULT_URI, newObj, user.token);

    let URIToMutate;
    let dataToMutate;
    //Now update the local SWR store
    if (catId) {
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


  };

  //Edit/patch details on an existing category object
  const editExistingCategory = async (categoryObj) => {

    //Patch the category with the update information
    let categoryId = categoryObj.id;
    const URIToMutate = `${DEFAULT_CAT_URI}/${categoryObj.id}`;
    delete categoryObj.id; //delete for the patch call

    await patchWithToken(URIToMutate, categoryObj, user.token);

    //Re-fetch the data for the category, since it may not be selected
    mutate([URIToMutate, user.token]);

    //Replace the updated category with the new category information
    const categoryData = dataToDisplay.map(category => {
      if ( category.id !== categoryId) {
        return category;
      }
      else {
        return {
          ...category,
          categoryName : categoryObj.categoryName,
          description : categoryObj.description
        };
      }
    });


    //Also update the local category that is currently displaying all category cards

    if ( catId ) {
      //Need to update the child category data
      const updatedSelection = {
        ...selectedData,
        childCategories: [...categoryData]
      };

      mutate([selectedURI, user.token], updatedSelection, false);
    
    }
    else {
      //Update the main category data
      mutate([DEFAULT_URI, user.token], categoryData, false);
    }


  };

  //When user clicks ok on create/edit dialog, this is called
  const performAction = (categoryObj) => {

    if ( !itemForEdit ) {
      createNewCategory(categoryObj);
    }
    else {
      editExistingCategory(categoryObj);
    }

  };


  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (evt, itemForEdit = null) => {

    if ( evt ) { //This allows the user to edit a category w/out selecting it
      evt.stopPropagation();
    }

    if ( itemForEdit ) {
      setItemForEdit({ ...itemForEdit });
    }
    else {
      setItemForEdit(null);
    }

    setCreateEditVisible(!createEditVisible);
  };

  /**
 * Helper function, maps cateogry data to a CategoryListItem component
 */
const populateCategoryView = (categoryData) =>  {

  if (categoryData && categoryData.length > 0) {
    return categoryData.map(category => 
      <CategoryListItem 
        key={category.id} 
        data={category}
        handleEdit={toggleCreateEdit}
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
        <button onClick={(evt) => toggleCreateEdit(evt)} >New Category</button>
      </div>
      <CreateEditCategory
        visible={createEditVisible}
        toggle={toggleCreateEdit}
        itemForEdit={itemForEdit}
        performAction={performAction}
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