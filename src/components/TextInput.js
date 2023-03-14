import { useState } from "react";
import { validate } from 'email-validator';

import './TextInput.css';

const TextInput = ({ fieldName, isEmailField, inputValue, updateValueHandler }) => {
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    updateValueHandler(e.target.value);
  };

  const handleBlur = (e) => {
    const currentValue = e.target.value;
    if (currentValue.trim().length < 1) {
      setError({
        status: true,
        message: `${fieldName} cannot be blank.`
      });
    } else if (isEmailField && !validate(currentValue)){
      setError({
        status: true,
        message: "Please enter a valid Email."
      });
    } else {
      setError({
        status: false,
        message: ""
      });
    }
  };

  return (
    <div>
      <label className='bold-text'>{fieldName}</label>
      <input 
        type={isEmailField && 'email'} 
        className={error?.status ? 'error-field input-width' : 'input-width'}
        value={inputValue} 
        onChange={handleChange} 
        onBlur={handleBlur}
      />
      <p className={error?.status ? 'error-message' : ''}>
        {error?.status && error.message}
      </p>
    </div>
  );
};

export default TextInput;
