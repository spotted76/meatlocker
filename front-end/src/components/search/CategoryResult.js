
import React from 'react';
// import style from './styling/CategoryResult.module.css';

function CategoryResult( { catData, style, onClick }) {

  if ( onClick ) {
    return(
      <div className={style.category_result} onClick={ () => onClick(catData.id) }>
        {catData.categoryName}
      </div>
    );
  }
  else {
    return(
      <div className={style.category_result }>
        {catData.categoryName}
      </div>
    );
  }

  
}

export default CategoryResult;