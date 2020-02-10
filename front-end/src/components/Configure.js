

import style from './styling/configure.css';

import React from 'react';
import CategoryView from './configure/CategoryView';
import DetailView from './configure/DetailView';



function Configure(props) {

  return (
    <div>
      <h1>Configure Categories & Items</h1>
      <div className='configure_view'>
        <CategoryView />
        <DetailView />
      </div>
    </div>
  );
}

export default Configure;