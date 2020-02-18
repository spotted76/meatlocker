
import style from './styling/DetailView.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { addSubCat } from '../../reducers/categoryReducer';
import CategoryStoreHelper from '../../utils/categoryStoreHelper';
import DetailConfigure from './DetailConfigure';

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, categoryData, user, addSubCat } = props;
  const [detailedObj, setDetailedObj] = useState(null);

  //Grab a snapshot off the current category store, and use it to populate the store helper
  const currStoreState = useRef();
  currStoreState.current = [...categoryData];
  
  useEffect(() => {

    if (configureSelected) {
      // const catHelper = new CategoryStoreHelper(categoryData, user.token);
      const catHelper = new CategoryStoreHelper(currStoreState.current, user.token);
      console.log('Detail View Effect');

      const detailRetrieve = async () => {

        const detailedCategory = await catHelper.retrieveFullPopulatedCategory(configureSelected.id, addSubCat);
        setDetailedObj(detailedCategory);

      };detailRetrieve();

    }

  }, [configureSelected, user.token, addSubCat]);

  const formatDetails = () => {

    if (detailedObj) {

      if (configureSelected?.type === 'category') {
        //Return a category view
        return <DetailConfigure catData={detailedObj} />
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

//Map connected dipatch functions 
const mapDispatchToProps = {
  addSubCat
};



const connectedDetailView = connect(mapStateToProps,mapDispatchToProps)(DetailView);
export default connectedDetailView;