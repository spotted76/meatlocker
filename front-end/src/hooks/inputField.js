
import { useState } from 'react';

/*
  Hook for a managed input form.  The hook takes the type of
  the form as the input argument, and makes the type, value, and 
  onChange (fields needed by an input) as return types
  */

export function useInputField(type) {

  const [value, setValue] = useState('');

  //Set the value when the change occurs
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };

}

// export a name field to reset 
export function resetField(inputField) {
  const evt = {
    target: {
      value : ''
    }
  };

  inputField.onChange(evt);
}
