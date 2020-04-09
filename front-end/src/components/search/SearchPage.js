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
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Category Search Data
  const { data: catResults, error: catSearchErrors } = 
  useSWR( !inputString ? null :  [`${DEFAULT_CAT_URI}/search/?categoryName=${inputString}`, user.token], retrieveWithToken);

  //Item Search Data
  const { data: itemResults, error: itemSearchErrors } = 
  useSWR( !inputString ? null :  [`${DEFAULT_ITEM_URI}/search/?name=${inputString}`, user.token], retrieveWithToken);

  //Search for all items that are part of a specific category
  const { data: itemsByCategory, error: itemsByCategoryErrors } = 
  useSWR( !selectedCategory ? null :  [`${DEFAULT_ITEM_URI}/search/?memberCategories=${selectedCategory}`, user.token], retrieveWithToken);
  

  let filteredItems = itemsByCategory ? itemsByCategory : itemResults;

  const catHeader = catResults ? 'Matching Category Filter' : '';
  const itemHeader = (filteredItems && filteredItems.length) ? 'Items' : '';

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