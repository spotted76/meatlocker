
import React from 'react';
import style from './styling/Item.module.css';

import PropTypes from 'prop-types';



function Item(props) {

  const { item, handleEdit, handleDelete } = props;
  const count = item.count;


  return (
    <li className={style.itemProper}>
      <div>
        ({count}) : {item.name}
      </div>
      <div className={style.item_icons}>
        <i onClick={() => handleEdit(item)} className='far fa-edit' ></i>
        <i onClick={() => handleDelete(item.id)} className='fas fa-times-circle'></i>
      </div> 
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
};

export default Item;