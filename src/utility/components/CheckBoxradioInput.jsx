import React from 'react';

const CheckBoxRadioInput = ({ value, checked, onChange, label }) => {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-custom"></span>
      {label}
    </label>
  );
};

export default CheckBoxRadioInput;
