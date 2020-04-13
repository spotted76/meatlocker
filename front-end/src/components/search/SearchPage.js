import style from './styling/SearchPage.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryResult from './CategoryResult';
import ItemCard from './ItemCard';
import categoryResultStyle from './styling/CategoryResult.module.css';

import useFetch from '../../hooks/useFetch';




import {
  retrieveWithToken, 
  DEFAULT_ITEM_URI,
  DEFAULT_CAT_URI,
  DEFAULT_TRANS_URI
 } from '../../services/fetchService';


function SearchPage(props) {

  //User w/auth info
  const { user } = props;

  //Whatever user types into the search box
  const [inputString, setinputString] = useState('');

  //Filter based on user selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Retrieves items based on search
  const [itemResults, itemError] = useFetch(
    !inputString ? null : [`${DEFAULT_ITEM_URI}/search/?name=${inputString}`, user.token],
    retrieveWithToken 
  );

  //Retrieves categories based on search
  const [catResults, catResultsError] = useFetch(
    !inputString ? null : [`${DEFAULT_CAT_URI}/search/?categoryName=${inputString}`, user.token],
    retrieveWithToken
  );

  //Retrieves a subset of items based on selected categories
  const [filteredItemData, filteredItemErrors] = useFetch(
    !selectedCategory ? null : [`${DEFAULT_ITEM_URI}/search/?memberCategories=${selectedCategory}`, user.token],
    retrieveWithToken 
  );

  //Retrieves the most recently used / interacted items in 
  const [recentItems, recentItemsErrors] = useFetch(
    inputString ? null : [`${DEFAULT_TRANS_URI}/recents`, user.token],
    retrieveWithToken
  );


  if (itemError) {
    console.log('Error encountered fetching items');
  }

  if ( catResultsError) {
    console.log('Error encountered fetching category data');
  }

  if ( filteredItemErrors ) {
    console.log('Error encountered fetching category filtered item data');
  }

  if ( recentItemsErrors ) {
    console.log('Error encountered fetcing recent items');
  }
  

  let filteredItems = filteredItemData ? filteredItemData : itemResults;
  let itemHeader = (filteredItems && filteredItems.length) ? 'Items' : '';

  //If there are no filtered items, check recents, there is no active search
  itemHeader = (!itemHeader && recentItems) ? 'Recent Items' : itemHeader;
  filteredItems = filteredItems ? filteredItems : recentItems;

  const catHeader = catResults ? 'Matching Category Filter' : '';

  /*
    kicks off a search for category & items based on user typing
  */
  const searchChanged = (evt) => {
    
    setSelectedCategory(null);
    setinputString(evt.target.value);

  };

  /*
    Filter item search results based on the clicked category
  */
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
        <input type='search' value={inputString} onChange={searchChanged} placeholder='Search for items or categories' />
        <div className={style.categories}>
          <h3>{catHeader}</h3>
          <ul>
            {displayCategories()}
          </ul>
        </div>
      </div>
      <div className={style.items}>
        <h3>{itemHeader}</h3>
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