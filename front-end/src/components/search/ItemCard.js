
import style from './styling/ItemCard.module.css';

import React from 'react';
import CategoryResult from './CategoryResult';

import itemResultStyle from './styling/CategoryResult_Item.module.css';
import { stripVowels } from '../../utils/helpers';


function ItemCard({ item }) {

  const displayCategories = () => {
    return item.memberCategories.map(category => <CategoryResult key={category.id} catData={category} style={itemResultStyle} />);
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
        <div className={style.minus}>
          <i className="fas fa-minus"></i>
        </div>
        <div className={style.plus}>
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

export default ItemCard;