import React from "react";
import { Form, InputGroup, FormControl, Col } from "react-bootstrap";

const TextAreaInput = ({
  value,
  onChange,
  type = "text",
  name,
  label,
  error,
  placeholder,
  className,
  classNameError,
  checked,
}) => {
  return (
    <Form.Group as={Col} controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={className}
          isInvalid={error && error !== ""}
        />
        {error && error !== "" && (
          <Form.Control.Feedback type="invalid" className={classNameError}>
            {error}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default TextAreaInput;
