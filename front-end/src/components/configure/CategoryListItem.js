
import React from 'react';

function CategoryListItem(props) {

  const { data } = props;

  return (
    <li id={data.id}>
      {data.categoryName}
    </li>
  );

}

export default CategoryListItem;