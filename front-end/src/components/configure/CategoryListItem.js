
import React from 'react';
import { Link } from 'react-router-dom';

import style from './styling/CategoryListItem.module.css';

function CategoryListItem(props) {

  const { data, configClicked, selected } = props;

  const liClassName = selected?.id === data.id ? `${style.mainLI} ${style.mainLI_selected}` : `${style.mainLI}`; 


  return (
    <li className={liClassName} onClick={() => configClicked(data.id, 'category')}>
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