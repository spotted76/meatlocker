
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setConfigSel } from '../../reducers/configureSelected';

import style from './styling/CategoryListItem.module.css';

function CategoryListItem(props) {

  const { data,
          configClicked,
          handleEdit, 
          selected,
          deleteCategory } = props;

  const liClassName = selected?.id === data.id ? `${style.mainLI} ${style.mainLI_selected}` : `${style.mainLI}`; 


  return (
    <li className={liClassName} onClick={() => configClicked(data.id, 'category')}>
      <div className={style.content}>
        {data.categoryName}
      </div>
      <div className={style.item_icons}>
          <Link to={`/configure/category/${data.id}`}><i className="fas fa-sort-amount-down"></i></Link>
          <i className='far fa-edit' onClick={(evt) => handleEdit(evt, data)}></i>
          <i className='fas fa-times-circle' onClick={(evt) => deleteCategory(evt, data.id)}></i>
      </div>
      {/* <div className={style.selectButton}>
        <Link to={`/configure/category/${data.id}`}>subcategories</Link>
      </div> */}
       
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