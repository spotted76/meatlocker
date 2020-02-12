
import style from './styling/DetailView.module.css';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function DetailView (props) {

  //Stores what will be displayed by this detail view
  const [detailItem, setDetailItem] = useState(null);

  const value = detailItem ? detailItem : 'default';

  useEffect(() => {

    console.log('DetailView Effect');
    console.log(props.configureSelected);
    setDetailItem(props.configureSelected);


  }, [props.configureSelected])

  return (
    <div className='detail_view'>
      <h2>Details</h2>
      <div className={style.mainContainer}>
        <p>{value.id}</p>
      </div>
    </div>
  );
}

//Get the redux state information
const mapStateToProps = ((state) => {

  const { configureSelected, majorCategories } = state;

  return {
    configureSelected,
    majorCategories
  };

});



const connectedDetailView = connect(mapStateToProps,null)(DetailView);
export default connectedDetailView;