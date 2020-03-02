
import style from './styling/DetailView.module.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import useSWR, { mutate } from 'swr';


import CategoryDetails from './CategoryDetails';
import CreateEditItem from './CreateEditItem';
import { postWithToken, patchWithToken } from '../../services/genericServices';
import { DEFAULT_CAT_URI, DEFAULT_ITEM_URI, retrieveWithToken } from '../../services/fetchService';
 

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, user } = props;

  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  //Retrieve the data selected in the main category view
  const selectedURI = `${DEFAULT_CAT_URI}/${configureSelected?.id}`;
  const { data: selectedData, error: selectedError} = useSWR( configureSelected ?  [selectedURI, user.token] : null, retrieveWithToken);

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
        return <CategoryDetails catData={selectedData} />
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
  const toggleCreateEdit = (isEdit) => {

    setIsEdit(isEdit);
    setCreateEditVisible(!createEditVisible);
  };

  //Helper function to create a new sub-category
  const createNewItem = async (newObj) => {

    //Post the new object, and update the store
    const result = await postWithToken(DEFAULT_ITEM_URI, newObj, user.token);

    //New object created, now update the associated category, need to patch the parent category
    const patchURI = `${DEFAULT_CAT_URI}/${selectedData.id}`;
    let itemIdList = selectedData.items.map(item => item.id);
    itemIdList = itemIdList.concat(result.id);
    await patchWithToken(patchURI, {items: itemIdList}, user.token);

    //Add the new item to the existing category
    const dataToMutate = {
      ...selectedData,
      items: selectedData.items.concat(result)
    }
    mutate([selectedURI, user.token], dataToMutate);

  }

  //Called from the hidden modal Create/Edit
  const handleSubmit = async (newObj) => {

    //Ok, data returned, now fill in the rest of the object with 
    //details known to the Detail View
    newObj.category = configureSelected.id;

    if (!isEdit) {
      //Create new
      createNewItem(newObj);
    }
    else {
      //Edit an item
      CreateEditItem(newObj);
    }

  };

  return (
    <div className='detail_view'>
      <h2>Category Details</h2>
      <div className={style.mainContainer}>
        {formatDetails()}
      </div>
      <div className={style.buttonDiv}>
        <button onClick={() => toggleCreateEdit(false)} >New Item</button>
        <button>Edit Item</button>
      </div>
      <CreateEditItem
        visible={createEditVisible}
        toggle={toggleCreateEdit}
        isEdit={isEdit}
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