
import React from 'react';

function Category(props) {

  const { data } = props;

  return (
    <li>
      {data.categoryName}
    </li>
  );

}

export default Category;