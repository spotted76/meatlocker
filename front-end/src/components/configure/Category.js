
import React from 'react';

function Category(props) {

  const { data } = props;

  return (
    <div>
      <p>{data.categoryName}</p>
    </div>
  );

}

export default Category;