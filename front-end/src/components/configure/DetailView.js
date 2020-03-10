
import style from './styling/DetailView.module.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import useSWR, { mutate } from 'swr';


import CategoryDetails from './CategoryDetails';
import CreateEditItem from './CreateEditItem';
import * as restServices from '../../services/genericServices';
import { DEFAULT_CAT_URI, DEFAULT_ITEM_URI, retrieveWithToken } from '../../services/fetchService';
 

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, user } = props;

  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [itemForEdit, setItemForEdit] = useState(null); //Data stored if user is editing


  //Retrieve the data selected in the main category view
  const selectedURI = `${DEFAULT_CAT_URI}/${configureSelected?.id}`;
  const { data: selectedData, error: selectedError} = 
    useSWR( configureSelected ?  [selectedURI, user.token] : null, retrieveWithToken);

  if ( selectedError ) {
    console.log('error retrieving detailed data from DetailView');
    //TODO:  Return null, generate an alert
  }
  
  /**
   * Helper function, converts data to its proper component
   */
  const formatDetails = () => {

    if (selectedData) {

      if (configureSelected?.type === 'category') {
        //Return a category view
        return <CategoryDetails catData={selectedData} handleEdit={toggleCreateEdit} handleDelete={handleDelete} />
      }
      else if (configureSelected?.type === 'item') {
        //Return an item view
      }
      else {
        return null;
      }
    }
    else{

      //Nothing yet selected
      return(
        <div>
          <p>Nothing Selected</p>
          <p>Please select a category or item</p>
        </div>
      );
    }

  };

  //Method used to toggle the modal create/edit dialog
  const toggleCreateEdit = (args = null) => {

    //Store off the object for edit
    if ( args ) {
      setItemForEdit( { ...args } );
    }
    else {
      setItemForEdit(null); //Or nothing, if no arguments passed
    }

    setCreateEditVisible(!createEditVisible);
  };

  //Helper function to create a new sub-category
  const createNewItem = async (newObj) => {

    //Post the new object, and update the store
    const result = await restServices.postWithToken(DEFAULT_ITEM_URI, newObj, user.token);

    //New object created, now update the associated category, need to patch the parent category
    const patchURI = `${DEFAULT_CAT_URI}/${selectedData.id}`;
    let itemIdList = selectedData.items.map(item => item.id);
    itemIdList = itemIdList.concat(result.id);
    await restServices.patchWithToken(patchURI, {items: itemIdList}, user.token);

    //Add the new item to the existing category
    const dataToMutate = {
      ...selectedData,
      items: selectedData.items.concat(result)
    }
    mutate([selectedURI, user.token], dataToMutate, false);

  }

  //Edits an existing item
  const editExistingItem = async (itemDetails) => {

    try {
      const putURI = `${DEFAULT_ITEM_URI}/${itemDetails.id}`;
      const editedItem = await restServices.putWithToken(putURI, itemDetails, user.token);

      //Replace the data in the selected category to reflect the changed item
      const dataToMutate = {
        ...selectedData,
        items: selectedData.items.map(item => item.id !== editedItem.id ? item : editedItem)
      }
      mutate([selectedURI, user.token], dataToMutate, false);
      

    }
    catch(err) {
      console.log('Error occurred updating item');
    }
    
  }

  //Called from the hidden modal Create/Edit
  const handleSubmit = async (newObj) => {

    //This is a brand new item
    if (!itemForEdit) {
      //Create new
      newObj.category = configureSelected.id;
      createNewItem(newObj);
    }
    else {
      //Populate with original data
      newObj.category = itemForEdit.category
      newObj.id = itemForEdit.id
      editExistingItem(newObj);
    }

  };

  //Deletes a single item from the Detail View
  const handleDelete = async(deleteId) => {
    const delURI = `${DEFAULT_ITEM_URI}/${deleteId}`;

    if ( !window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await restServices.deleteWithToken(delURI, user.token);

      //New object created, now update the associated category, need to patch the parent category
      const patchURI = `${DEFAULT_CAT_URI}/${selectedData.id}`;

      //Translate items into item ids, excluding the deleted item id
      let itemIdList = selectedData.items
        .map(item => item.id)
        .filter(item => item !== deleteId);
      await restServices.patchWithToken(patchURI, {items: itemIdList}, user.token);

      //Remove the item from the cached selected category to reflect the removed item
      const dataToMutate = {
        ...selectedData,
        items: selectedData.items.filter(item => {
          if ( item.id !== deleteId) {
            return item;
          }
        })
      }
      mutate([selectedURI, user.token], dataToMutate, false);

    }
    catch(err) {
      console.log(`Error occurred deleting item ${deleteId}`);
    }
  };

  return (
    <div className='detail_view'>
      <h2>Category Details</h2>
      <div className={style.mainContainer}>
        {formatDetails()}
      </div>
      <div className={style.buttonDiv}>
        <button className={style.newItem} disabled={configureSelected ? false : true} onClick={() => toggleCreateEdit()} >Add Item</button>
      </div>
      <CreateEditItem
        visible={createEditVisible}
        toggle={toggleCreateEdit}
        itemForEdit={itemForEdit}
        performAction={handleSubmit}
      /> {/* Hidden by default, this is a modal view */}
    </div>
  );
}

//Get the redux state information
const mapStateToProps = ((state) => {

  const { configureSelected, userReducer } = state;

  return {
    configureSelected,
    user: userReducer
  };

});


const connectedDetailView = connect(mapStateToProps,null)(DetailView);
export default connectedDetailView;