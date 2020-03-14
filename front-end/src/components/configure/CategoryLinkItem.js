
import React from 'react';
import { Link } from 'react-router-dom';

function CategoryLinkItem(props) {

  const { data } = props;

  return (
    <li>{data.categoryName}</li>
  );

}

export default CategoryLinkItem;