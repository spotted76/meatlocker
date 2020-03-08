
import React from 'react';

import style from './styling/CategoryDetails.module.css';

function DetailItem(props) {

  const { detailDesc, detailData, handleDelete } = props;

  return (
    <div className={style.detailItem}>
      <div className={style.detailDescription}>
        <div className={style.descriptionContent}>
          {detailDesc}
        </div>
      </div>
      <div className={style.detailData}>
        <div className={style.detailDataContent}>
          { detailData }
        </div>
      </div>
    </div>
  );
}

function Item(props) {

  const { item, handleEdit, handleDelete } = props;
  const count = item.count;


  return (
    <li className={style.itemProper}>
      <div>
        ({count}) : {item.name}
      </div>
      <div className={style.item_icons}>
        <i onClick={() => handleEdit(item)} className='far fa-edit' ></i>
        <i onClick={() => handleDelete(item.id)} className='fas fa-times-circle'></i>
      </div> 
    </li>
  );
}

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