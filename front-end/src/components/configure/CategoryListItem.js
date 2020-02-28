
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setConfigSel } from '../../reducers/configureSelected';

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

const mapStateToProps = (state) => {

  const { configureSelected } = state;
  return {
    selected: configureSelected
  }
}

const mapDispatchToProps = {
  configClicked : setConfigSel
}

// export default CategoryListItem;
const connectedCategoryListItem = connect(mapStateToProps, mapDispatchToProps)(CategoryListItem);
export default connectedCategoryListItem;