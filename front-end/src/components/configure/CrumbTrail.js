import React from 'react';
import { Link } from 'react-router-dom';
import style from './styling/CrumbTrail.module.css';

function CrumbTrail(props) {

  const { categoryId, categoryData } = props;

  //Determine if this is a sub category
  if ( categoryId  && categoryData ) {
    
    //Is there a parent ID?
    if ( categoryData.parent ) {
      return (
        <div className={style.crumbTrail}>
          <h2>
            <Link to={`/configure/category/${categoryData.parent.id}`}>
              {`... ${categoryData.parent.categoryName} > `}
            </Link>
            {categoryData.categoryName}
          </h2>
        </div>
      );
    }
    else {
      //Sub category, but still a high level
      return (
        <div className={style.crumbTrail}>
          <h2>
            <Link to={'/configure'}>
              {'... Primary > '}
            </Link>
            {categoryData.categoryName}
          </h2>
        </div>
      );
    }

  }
  else {
    //Top level, 
    return (
      <div className={style.crumbTrail}>
        <h2>Primary Categories</h2>
      </div>
    );
  }
}

export default CrumbTrail;