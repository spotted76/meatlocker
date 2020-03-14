
import React from 'react';

import Item from './Item';
import DetailItem from './DetailItem';


function CategoryDetails(props) {

  const { catData, handleEdit, handleDelete } = props;


  // Convert sub-categories information into react component
  const generateSubCategories = () => {
    if ( catData.childCategories.length ) {
      // return catData.childCategories.map(category => <CategoryLinkItem key={`dc_${category.id}`} data={category} />);
      return catData.childCategories.map(category => <li key={`dc_${category.id}`}>{category.categoryName}</li>);
    }
    else {
      return 'None';
    }
  };

  const generateItemData = () => {
    if ( catData.items.length ) {
      // return catData.items.map(item => <li key={`item_${item.id}`}>{item.name}</li>);
      return catData.items.map(item => <Item key={`item_${item.id}`} item={item} handleEdit={handleEdit} handleDelete={handleDelete} />);

    }
    else {
      return 'None';
    }
  };

  return (
    <div>

      <DetailItem detailDesc={'Name:'} detailData={catData.categoryName} />
      <DetailItem detailDesc={'Description:'} detailData={catData.description} />
      <DetailItem detailDesc={'Sub Categories:'} detailData={generateSubCategories()} />
      <DetailItem detailDesc={'Items:'} detailData={generateItemData()} />

    </div>
  );

}

export default CategoryDetails;