import React from "react";
import Select from "react-select";

const Dropdown = ({ value, onChange, label, options, error, classNameError,onMenuScrollToBottom }) => {
  return (
    <div >
      <div className={`select_hold ${error && Object.keys(error).length > 0? 'errorborder-select' : ''}`}>
      {label && <label>{label}</label>}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        onMenuScrollToBottom={onMenuScrollToBottom}
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

export default Dropdown;







// import React from "react";
// import Select from "react-select";
// import { Form, Col } from "react-bootstrap";

// const Dropdown = ({ value, onChange, label, options, error }) => {
//   return (
//     <Form.Group as={Col} controlId="dropdown">
//       {label && <Form.Label>{label}</Form.Label>}
//       <Select
//         value={value}
//         onChange={onChange}
//         options={options}
//         isInvalid={error && error !== ""}
//       />
//       {error && error !== "" && (
//         <Form.Control.Feedback type="invalid">
//           {error}
//         </Form.Control.Feedback>
//       )}
//     </Form.Group>
//   );
// };

// export default Dropdown;
