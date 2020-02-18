

import style from './styling/CreateEdit.module.css';
import React from 'react';

import { useInputField } from '../../hooks/inputField';


function CreateEdit(props) {

  //Pull variables out of props
  const { 
    visible,
    toggle,
    isEdit 
  } = props;
  
  //Show or hide the dialog
  const mainDiv = visible ? `${style.mainDiv}` :  `${style.mainDiv} ${style.hide}`;

  const onCreate = (evt) => {
    toggle();
  };

  const onCancel = (evt) => {
    toggle();
  };


  return (
    <div className={ `${ mainDiv }`}>
      <div className={style.inputForm}>
        <div className={style.formElements}>
        <h2>Create / Edit Category</h2>
        <input placeholder='category name' />
        <textarea placeholder='enter category description' />
        <div className={style.buttonPanel}>
          <button onClick={onCreate}>Create</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
        </div>
      </div>
    </div>
  );

}

export default CreateEdit;