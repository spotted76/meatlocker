
import React from 'react';
// import style from './styling/CategoryResult.module.css';

function CategoryResult( { catData, style }) {
  return(
    <div className={style.category_result}>
      {catData.categoryName}
    </div>
  );
}

export default CategoryResult;