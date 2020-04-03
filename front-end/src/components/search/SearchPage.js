import style from './styling/SearchPage.module.css';
import React, { useState } from 'react';
import useSWR from 'swr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryResult from './CategoryResult';
import ItemCard from './ItemCard';
import categoryResultStyle from './styling/CategoryResult.module.css';




import {
  retrieveWithToken, 
  DEFAULT_ITEM_URI,
  DEFAULT_CAT_URI
 } from '../../services/fetchService';


function SearchPage(props) {

  //User w/auth info
  const { user } = props;

  //Whatever user types into the search box
  const [inputString, setinputString] = useState('');
  const [searchString, setSearchString] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Category Search Data
  const { data: catResults, error: catSearchErrors } = 
  useSWR( !searchString ? null :  [`${DEFAULT_CAT_URI}/search/?categoryName=${searchString}`, user.token], retrieveWithToken);

  //Item Search Data
  const { data: itemResults, error: itemSearchErrors } = 
  useSWR( !searchString ? null :  [`${DEFAULT_ITEM_URI}/search/?name=${searchString}`, user.token], retrieveWithToken);

  //Search for all items that are part of a specific category
  const { data: itemsByCategory, error: itemsByCategoryErrors } = 
  useSWR( !selectedCategory ? null :  [`${DEFAULT_ITEM_URI}/search/?memberCategories=${selectedCategory}`, user.token], retrieveWithToken);
  

  let filteredItems = itemsByCategory ? itemsByCategory : itemResults;

  /*
    kicks off a search for category & items based on user typing
  */
  const searchChanged = (evt) => {
    
    const typedValue = evt.target.value;

    // if (!(typedValue.length < inputString.length && inputString.includes(typedValue) )) {
    //   //Kick off the searches
    //   setSearchString(typedValue);
    //   setSelectedCategory(null);
    // }
    // else {
    //   console.log('this is a deletion');
    // }

    //Clean this up, I believe there can be one less state variable used.

    setSelectedCategory(null);
    setinputString(evt.target.value);
    setSearchString(typedValue);

  };

  const categoryClicked = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const displayCategories = () => {
    if ( catResults )
    {
      return catResults.map(category => <li key={category.id}><CategoryResult catData={category} style={categoryResultStyle} onClick={categoryClicked} /></li>);
    }
  };

  const displayItems = () => {
    if ( filteredItems ) {
      return filteredItems.map(item => <li key={item.id}><ItemCard item={item} /></li>);
    }
  };

  return (
    <div className={style.user_search}>
      <div className={style.query}>
        <input value={inputString} onChange={searchChanged} placeholder='Search for items or categories' />
        <div className={style.categories}>
          <h3>Categories</h3>
          <ul>
            {displayCategories()}
          </ul>
        </div>
      </div>
      <div className={style.items}>
        <h3>Items</h3>
        <ul>
          {displayItems()}
        </ul>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  user: PropTypes.object
};

//From the connected object, this will insert state data into props
const mapStateToProps = (state) => {
  const { userReducer } = state;

  return {
    user: userReducer
  };

};

const connectedSearchPage = connect(mapStateToProps, null)(SearchPage);

export default connectedSearchPage;