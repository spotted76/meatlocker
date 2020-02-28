
import style from './styling/DetailView.module.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import useSWR, { mutate } from 'swr';
import { DEFAULT_URI, retrieveWithToken } from '../../services/fetchService';


import DetailConfigure from './DetailConfigure';
import CreateEdit from './CreateEdit';
import { postWithToken } from '../../services/categoryService';

 

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, user } = props;

  const [createEditVisible, setCreateEditVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false); //Determines if modal dialog is edit or create


  //Retrieve the data selected in the main category view
  const selectedURI = `${DEFAULT_URI}/${configureSelected?.id}`;
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
        return <DetailConfigure catData={selectedData} />
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
  const createSubCategory = async (newObj) => {

    //Post the new object, and update the store
    const result = await postWithToken(DEFAULT_URI, newObj, user.token);
    const dataToMutate = {
      ...selectedData,
      childCategories: selectedData.childCategories.concat(result)
    }
    mutate([selectedURI, user.token], dataToMutate);

  }

  //Called from the hidden modal Create/Edit
  const handleSubmit = async (type, newObj) => {

    //Ok, data returned, now fill in the rest of the object with 
    //details known to the Category View
    newObj.parent = configureSelected.id;
    newObj.isMajor = false;

    if (type === 'category') {
      if (!isEdit) {
        createSubCategory(newObj);
      }
      else {
        console.log('This is an edit operation')
      }
    }
  };

  return (
    <div className='detail_view'>
      <h2>Details</h2>
      <div className={style.mainContainer}>
        {formatDetails()}
      </div>
      <div>
        <button onClick={() => toggleCreateEdit(false)} >New Item</button>
        <button>Edit Item</button>
      </div>
      <CreateEdit
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