import React from "react";
import CheckBoxRadioInput from "./CheckBoxradioInput";

const CheckboxInput = ({
  data,
  handleCheckboxChange,
  checkedValues,
  paramsData,
}) => {
  const checkedValuesSet = checkedValues.map((item) => item.value);
  const allItemValues = data?.map((item) => item.value);
  const allValuesPresent = data.every((item) =>
    allItemValues.includes(item.value)
  );

  return (
    <div className="permission_check_holder">
      console.log(data,'data==');
      {data?.map((item) => {
        console.log(item,'item==>');
        return (
          <div key={item.value}>
            <CheckBoxRadioInput
              type="checkbox"
              value={item.value}
              onChange={handleCheckboxChange}
              label={item.label}
              checked={
                paramsData.role === "client"
                  ? allValuesPresent
                  : checkedValuesSet.includes(item.value)
              }
              // checked={allValuesPresent || checkedValuesSet.includes(item.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxInput;
