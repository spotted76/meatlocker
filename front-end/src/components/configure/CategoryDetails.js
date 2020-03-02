
import React from 'react';

import CategoryLinkItem from './CategoryLinkItem';
import style from './styling/CategoryDetails.module.css';

function DetailItem(props) {

  const { detailDesc, detailData } = props;

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

function CategoryDetails(props) {

  const { catData } = props;

  console.log(catData);


  // Convert sub-categories information into react component
  const generateSubCategories = () => {
    if ( catData.childCategories.length ) {
      // return catData.childCategories.map(category => <CategoryLinkItem key={`dc_${category.id}`} data={category} />);
      return catData.childCategories.map(category => <li key={`dc_${category.id}`}>{category.categoryName}</li>);
    }
  };

  const generateItemData = () => {
    if ( catData.items.length ) {
      return catData.items.map(item => <li key={`item_${item.id}`}>{item.name}</li>);
    }
  };

  return (
    <div>

      <DetailItem detailDesc={'Name:'} detailData={catData.categoryName} />
      <DetailItem detailDesc={'Description:'} detailData={catData.description} />
      <DetailItem detailDesc={'Sub Categories:'} detailData={generateSubCategories()} />
      <DetailItem detailDesc={'Items:'} detailData={generateItemData()} />
{/* 
      <h3>name:  </h3>
      <div className={style.freeText}>
        {catData.categoryName}
      </div> */}
      {/* <h3>description:  </h3>
        <div className={style.freeText}>
      {catData.description}
      </div> */}
      {/* <h3>sub categories:  </h3>
      <ul>
        {generateSubCategories()}
      </ul> */}
      {/* <h3>items:  </h3>
      <ul>
        {generateItemData()}
      </ul> */}
    </div>
  );

}

export default CategoryDetails;