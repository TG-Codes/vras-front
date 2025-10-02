import React from 'react';
import CheckBoxRadioInput from './CheckBoxradioInput';
import { Form } from 'react-bootstrap';

function ReadWriteCheckbox({ label, selectedItem,classNameError, handleChange, error }) {
  return (
    <Form.Group className='checkbox-container' isInvalid={error && error !== ""}>
      {label.map((item, index) => (
        <CheckBoxRadioInput
          key={index}
          value={item.value}
          checked={selectedItem === 'write' || selectedItem === item.value}
          onChange={() => handleChange(item)}
          label={item.value}
        />
      ))}
      {error && error !== "" && (<>
        <span className={`${classNameError} text-input-error`}>{error}</span></>
      )}
    </Form.Group>
  );
}

export default ReadWriteCheckbox;
