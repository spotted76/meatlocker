
import style from './styling/ItemCard.module.css';

import React from 'react';
import CategoryResult from './CategoryResult';

import itemResultStyle from './styling/CategoryResult_Item.module.css';


function ItemCard({ item }) {

  const displayCategories = () => {
    console.log(item.memberCategories);
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
      <div className={style.count}>
        {item.count}
      </div>
    </div>
  );
}

export default ItemCard;