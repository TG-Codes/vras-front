import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ value, onChange, label, options, isDisabled,classNameError, error }) => {
  return (
    <div>
      <div className={`select_hold ${error && Object.keys(error).length > 0? 'errorborder-select' : ''}`}>
      {label && <label>{label}</label>}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        isMulti={true} // This makes it a multi-select dropdown
        isDisabled={isDisabled}
      />
      </div>
      {error && Object.keys(error).length > 0 && (
        <span className={`${classNameError} text-input-error`}>
          {error}
        </span>
      )}
    </div>
  );
};
// PermissionDropDown.defaultProps = {
//     value: [] // Default value is an empty array
//   };
export default MultiSelectDropdown;
