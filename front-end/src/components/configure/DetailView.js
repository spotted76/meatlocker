
import style from './styling/DetailView.module.css';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { addSubCat } from '../../reducers/categoryReducer';
import CategoryStoreHelper from '../../utils/categoryStoreHelper';

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const { configureSelected, categoryData, user } = props;

  useEffect(() => {

    if (configureSelected) {

      const catHelper = new CategoryStoreHelper(categoryData, user.token);

      // console.log(configureSelected);

      const detailRetrieve = async () => {

        //First things first, retrieve the selected category/item
        const detailedCategory = await catHelper.retrieveDetailedCategory(configureSelected.id);

        console.log('Heres the deets', detailedCategory);

        // Now retrieve all sub-category data associated with it
        for( const subCat of detailedCategory.childCategories) {
          console.log('retrieving sub-category data');
          const subCatData = await catHelper.retrieveDetailedCategory(subCat);
          console.log('subcatoegory data:  ', subCatData);
        }

      };detailRetrieve();

    }

  }, [configureSelected, categoryData, user.token]);

  const formatDetails = () => {

    if ( configureSelected.type === 'category') {
      //Return a category view
    }
    else {
      //Return an item view
    }

  };

  return (
    <div className='detail_view'>
      <h2>Details</h2>
      <div className={style.mainContainer}>

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