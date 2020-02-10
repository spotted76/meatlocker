

import style from './styling/CreateEdit.module.css'

import React from 'react';

function CreateEdit(props) {

  //Pull variables out of props
  const { 
    visible,
    toggle,
    isEdit 
  } = props;
  
  //Show or hide the dialog
  const classList = visible ? `${style.mainDiv}` :  `${style.mainDiv} ${style.hide}`;

  console.log(style);

  return (
    <div className={ `${ classList }`}>

    </div>
  );

}

export default CreateEdit;