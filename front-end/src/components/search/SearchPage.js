
import React, { useState } from 'react';
import useSWR from 'swr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



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

  //Category Search Data
  const { data: catResults, error: catSearchErrors } = 
  useSWR( !searchString ? null :  [`${DEFAULT_CAT_URI}/search/?categoryName=${searchString}`, user.token], retrieveWithToken);

  //Item Search Data
  const { data: itemResults, error: itemSearchErrors } = 
  useSWR( !searchString ? null :  [`${DEFAULT_ITEM_URI}/search/?name=${searchString}`, user.token], retrieveWithToken);

  /*
    kicks off a search for category & items based on user typing
  */
  const searchChanged = (evt) => {
    
    const typedValue = evt.target.value;

    if (!(typedValue.length < inputString.length && inputString.includes(typedValue) )) {
      //Kick off the searches
      setSearchString(typedValue);
    }
    else {
      console.log('this is a deletion');
    }

    setinputString(evt.target.value);
  };

  const displayCategories = () => {
    if ( catResults )
    {
      return catResults.map(category => <li key={category.id}>{category.categoryName}</li>);
    }
  };

  const displayItems = () => {
    if ( itemResults ) {
      return itemResults.map(item => <li key={item.id}>{item.name}</li>);
    }
  };

  return (
    <div>
      <input  value={inputString} onChange={searchChanged} />
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          {displayCategories()}
        </ul>

      </div>
      <div className="items">
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