
import React from 'react';
import { connect } from 'react-redux';

import { setDetailSelection } from '../../reducers/detailSelected';
import { unsetSelCat } from '../../reducers/configureSelected';

import CategoryLinkItem from './CategoryLinkItem';

function DetailConfigure(props) {

  const { catData } = props;

  // Convert sub-categories information into react component
  const generateSubCategories = () => {
    if ( catData.childCategories.length ) {
      return catData.childCategories.map(category => <CategoryLinkItem key={`dc_${category.id}`} data={category} />);
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
      <ul>
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

// const connectedDetailConfigure = connect(null, mapDispatchToProps)(DetailConfigure);

// export default connectedDetailConfigure;
export default DetailConfigure;