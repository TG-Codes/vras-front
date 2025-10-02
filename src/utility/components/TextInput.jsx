import React from "react";

const TextInput = ({
  value,
  onChange,
  type = "text",
  name,
  label,
  error,
  placeholder,
  className,
  classNameError,
  isDisabled = false,
  labelType = "upper",
  maxLength,
}) => {
  return (
    <div className="inp_block">
      {labelType === "lower" && label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isDisabled}
        className={`${className} text-input ${
          error && error !== "" ? "errorborder" : ""
        }`}
      />
      {labelType === "upper" && label && <label>{label}</label>}
      {error && error !== "" && (
        <span className={`${classNameError} text-input-error`}>{error}</span>
      )}
    </div>
  );
};

export default TextInput;
