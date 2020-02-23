

import './styling/configure.css';

import React from 'react';
import CategoryView from './configure/CategoryView';
import DetailView from './configure/DetailView';

import { useParams, useLocation } from 'react-router-dom';

const catURL = 'category';
const itemURL = 'item';


function Configure() {

  let catId = null;
  let itemId = null;

  //Determine category or item, also pull the ID if applicable
  const { id } = useParams();
  const path = useLocation();
  if ( path.pathname.includes(catURL) && id) {
    catId = id;
  }
  if ( path.pathname.includes(itemURL) && id) {
    itemId = id;
  }

  return (
    <div>
      <h1>Configure Categories & Items</h1>
      <div className='configure_view'>
        <CategoryView catId={catId} itemId={itemId} />
        <DetailView />
      </div>
    </div>
  );
}

export default Configure;