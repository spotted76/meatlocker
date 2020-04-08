
import style from './styling/ItemCard.module.css';

import React from 'react';
import CategoryResult from './CategoryResult';

import itemResultStyle from './styling/CategoryResult_Item.module.css';
import { stripVowels } from '../../utils/helpers';

import useSWR from 'swr';
import { patchWithToken, DEFAULT_ITEM_URI } from '../../services/genericServices';
import { connect } from 'react-redux';

function ItemCard({ item, user }) {

  const displayCategories = () => {
    return item.memberCategories.map(category => <CategoryResult key={category.id} catData={category} style={itemResultStyle} />);
  };

  //Patch to increment
  const increment = async () => {

    console.log('incrementing');

    const newCount = {
      count: item.count + 1
    };

    try {
      const URI = `${DEFAULT_ITEM_URI}/${item.id}`;
      await patchWithToken(URI, newCount, user.token);
    }
    catch(err) {
      console.log('error encountered incrementing item count:  ', err);
    }


    //Now log a transaction
  };

  //Patch to decrement if > 0
  const decrement = async () => {

    if ( item.count > 0 )
    {
      const newCount = {
        count: item.count + -1
      };

      try {
        const URI = `${DEFAULT_ITEM_URI}/${item.id}`;
        await patchWithToken(URI, newCount, user.token);
      }
      catch(err) {
        console.log('error encountered decrementing item count:  ', err);
      }

      //Log a transaction
    }

    

  };

  return (
    <div className={style.item_card}>
      <div className={style.name}>
        {item.name}
      </div>
      <div className={style.cat_list}>
        {displayCategories()}
      </div>
      <div className={style.plus_minus}>
        <div className={style.minus} onClick={decrement}>
          <i className="fas fa-minus"></i>
        </div>
        <div className={style.plus} onClick={increment}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div className={style.subtle_category}>
        { stripVowels(item.memberCategories[0].categoryName) }
      </div>
      <div className={style.count}>
        {item.count}
      </div>
    </div>
  );
}

//From the connected object, this will insert state data into props
const mapStateToProps = (state) => {
  const { userReducer } = state;

  return {
    user: userReducer
  };

};

const connectedItemCard = connect(mapStateToProps, null)(ItemCard);
export default connectedItemCard;