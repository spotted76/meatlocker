
import React from 'react';
import { Link } from 'react-router-dom';


function CategoryListItem(props) {

  const { data } = props;

  const selectCategory = (evt, id) => {

    // Make sure the click event goes no further
    evt.stopPropagation();
    console.log('blah', id);
  };

  return (
    <li id={data.id}>
      {/* {data.categoryName} <button onClick={(evt) => selectCategory(evt, data.id)}>select category</button> */}
      {data.categoryName} <div><Link to={`/configure/category/${data.id}`}>select category</Link></div>
    </li>
  );

}

export default CategoryListItem;