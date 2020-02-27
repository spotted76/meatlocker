
import React from 'react';
import { Link } from 'react-router-dom';

import style from './styling/CategoryListItem.module.css';

function CategoryListItem(props) {

  const { data, configClicked } = props;

  const selectCategory = (evt, id) => {

    // Make sure the click event goes no further
    evt.stopPropagation();
    console.log('blah', id);
  };

  return (
    <li className={style.mainLI} onClick={() => configClicked(data.id, 'category')}>
      <div className={style.content}>
        {data.categoryName}
      </div>
      <div className={style.selectButton}>
        <Link to={`/configure/category/${data.id}`}>select</Link>
      </div>
       
    </li>
  );

}

export default CategoryListItem;