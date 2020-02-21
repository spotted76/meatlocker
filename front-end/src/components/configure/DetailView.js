
import style from './styling/DetailView.module.css';

import React, { useRef } from 'react';
import { connect } from 'react-redux';

import useSWR from 'swr';
import { DEFAULT_URI, retrieveWithToken } from '../../services/fetchService';


import DetailConfigure from './DetailConfigure';

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, categoryData, user } = props;

  //Grab a snapshot off the current category store, and use it to populate the store helper
  const currStoreState = useRef();
  currStoreState.current = [...categoryData];


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

  };

  return (
    <div className='detail_view'>
      <h2>Details</h2>
      <div className={style.mainContainer}>
        {formatDetails()}
      </div>
    </div>
  );
}

//Get the redux state information
const mapStateToProps = ((state) => {

  const { configureSelected, userReducer, majorCategories } = state;

  return {
    configureSelected,
    categoryData: majorCategories,
    user: userReducer
  };

});


const connectedDetailView = connect(mapStateToProps,null)(DetailView);
export default connectedDetailView;