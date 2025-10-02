import React, { useState } from 'react';
import CheckBoxRadioInput from '../CheckBoxradioInput';

const ActiveInactive = ({ selectedValue, setSelectedValue, value, handleChange }) => {
  
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <div className="checkbox-container">
      {value.map((val, index) => (
        <CheckBoxRadioInput
          key={index}
          value={val}
          checked={selectedValue === val}
          onChange={handleChange}
          label={val}
        />
      ))}
    </div>
  );
}

export default ActiveInactive;
