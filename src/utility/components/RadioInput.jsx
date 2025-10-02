import React from 'react';

const RadioInput = ({ name, label, options, value, onChange, error }) => {
  return (
    <div className="radio-input-group">
      <label>{label}</label>
      {options.map((option, index) => (
        <label key={index} className="radio-label">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e)}
          />
          {option.label}
        </label>
      ))}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default RadioInput;
