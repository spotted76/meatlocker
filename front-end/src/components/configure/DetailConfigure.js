
import React from 'react';
import { connect } from 'react-redux';

import { setDetailSelection } from '../../reducers/detailSelected';
import { unsetSelCat } from '../../reducers/configureSelected';

import CategoryListItem from './CategoryListItem';

function DetailConfigure(props) {

  const { catData, setDetailSelection, unsetSelCat } = props;

  //
  const categoryClicked = (evt) => {
    //Sub-category clicked, so now, change the main configure view
    //Set the item selected from the detail panel
    setDetailSelection(evt.target.id, 'category');
    unsetSelCat();
  };

  // Convert sub-categories information into react component
  const generateSubCategories = () => {
    if ( catData.childCategories.length ) {
      return catData.childCategories.map(category => <CategoryListItem key={`dc_${category.id}`} data={category} />);
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

const mapDispatchToProps = {
  setDetailSelection,
  unsetSelCat
};

const connectedDetailConfigure = connect(null, mapDispatchToProps)(DetailConfigure);

export default connectedDetailConfigure;