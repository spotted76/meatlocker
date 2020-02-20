

import './styling/configure.css';

import React from 'react';
import { connect } from 'react-redux';
import CategoryView from './configure/CategoryView';
import DetailView from './configure/DetailView';
import CategoryService from '../services/categoryServices';
import { setTopLevelCat } from '../reducers/categoryReducer';


function Configure() {

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