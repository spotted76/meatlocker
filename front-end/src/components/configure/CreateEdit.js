

import style from './styling/CreateEdit.module.css';
import React, { useState, useRef } from 'react';
import Select from 'react-select';



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
  const [type, setType] = useState(null);
 

  const createEdit = isEdit ? 'Edit' : 'Create New';
  
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

    if ( !type ) {
      //Do something, like flash the input type, or generate alert
      createAndClose = false;
    }

    if ( !descriptionRef.current.value ) {
      //Do something, like flash the input type, or generate alert
      createAndClose = false;
    }
    
    //Retrieve all values, and construct an object
    if ( type.value === 'category' && createAndClose )
    {
      //Create a new category
      retObj = {
        categoryName: titleRef.current.value,
        description: descriptionRef.current.value
      };

      performAction(type.value, retObj);
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
    setType('');
  };


  return (
    <div className={ `${ mainDiv }`}>
      <div className={style.inputForm}>
        <div className={style.formElements}>
        <h2>{createEdit}</h2>
        <input ref={titleRef} placeholder='Enter a name' />
        <Select
          value={type}
          onChange={(newValue) => setType(newValue)}
          options={options}
        />
        <textarea ref={descriptionRef}  placeholder='Enter a description' />
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