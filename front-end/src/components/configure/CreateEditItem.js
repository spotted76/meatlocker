

import style from './styling/CreateEditItem.module.css';
import React, { useState, useRef } from 'react';



const options = [
  { value: 'category', label: 'Category' },
  { value: 'item', label: 'Item' }
];


function CreateEdit(props) {

  //Pull variables out of props
  const {
    visible, //determines if panel is visible or not
    toggle, //method used to toggle that visibility
    isEdit, //If this is an edit function, or a create/new
    performAction //Callback to perform creation or modification
  } = props;


  //Values used to store the field contents of the window
  const titleRef = useRef();
  const descriptionRef = useRef();
  const count = useRef();
 

  const createEdit = isEdit ? 'Edit Item' : 'Create New Item';
  
  //Show or hide the dialog
  const mainDiv = visible ? `${style.mainDiv}` :  `${style.mainDiv} ${style.hide}`;

  const onOk = async (evt) => {

    let createAndClose = true;
    let retObj = {};

    if (!titleRef.current.value)
    {
      //Do something, like flash the input type, or generate alert
      createAndClose = false;
    }

    if ( !descriptionRef.current.value ) {
      //Do something, like flash the input type, or generate alert
      createAndClose = false;
    }
    
    //Retrieve all values, and construct an object
    if (createAndClose )
    {
      
      retObj = {
        name: titleRef.current.value,
        count: !count.current.value ? 0 : count.current.value,
        description: descriptionRef.current.value
      };

      performAction(retObj);
    }
    
    if ( createAndClose ) {
      clear();
      toggle();
    }
  };

  const onCancel = (evt) => {
    toggle();
    clear();
  };

  const clear = () => {
    //Reset all fields
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    count.current.value = '';
  };


  return (
    <div className={ `${ mainDiv }`}>
      <div className={style.inputForm}>
        <div className={style.formElements}>
          <div className={style.title}>
            <h2>{createEdit}</h2>
          </div>
          <input ref={titleRef} placeholder='Item name' />
          <input ref={count} type="number" placeholder='number of items'></input>
          <textarea ref={descriptionRef} placeholder='Item description' />
          <div className={style.buttonPanel}>
            <button onClick={onOk}>Ok</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CreateEdit;