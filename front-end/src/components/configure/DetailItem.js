
import React from 'react';
import style from './styling/DetailItem.module.css';


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

export default DetailItem;