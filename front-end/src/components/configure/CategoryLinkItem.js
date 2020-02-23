
import React from 'react';
import { Link } from 'react-router-dom';

function CategoryLinkItem(props) {

  const { data } = props;

  return (
    <Link to={`/configure/category/${data.id}`}><p>{data.categoryName}</p></Link>
  );

}

export default CategoryLinkItem;