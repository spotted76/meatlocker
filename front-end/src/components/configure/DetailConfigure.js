
import React from 'react';

import CategoryListItem from './CategoryListItem';

function DetailConfigure(props) {

  const { catData } = props;

  //
  const categoryClicked = () => {
    console.log('sub-category clicked');
  };

  // Convert sub-categories information into react component
  const generateSubCategories = () => {
    if ( catData.childCategories.length ) {
      return catData.childCategories.map(category => <CategoryListItem data={category} />);
    }
  };

  return (
    <div>
      <h3>type:  </h3>
      Category
      <h3>name:  </h3>
      {catData.categoryName}
      <h3>description:  </h3>
      {catData.description}
      <h3>sub categories:  </h3>
      <ul onClick={categoryClicked}>
        {generateSubCategories()}
      </ul>
      <h3>items:  </h3>
      <ul>

      </ul>
    </div>
  );

}

export default DetailConfigure;