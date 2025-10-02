import React from "react";
import ModalDialog from "../ModalDialog";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "../TextInput";
import Dropdown from "../Dropdown";
import { useState } from "react";
import ReadWriteCheckbox from "../ReadWriteCheckbox";

const RoleAddEdit = ({
  showModal,
  closeModal,
  formData,
  formDataError,
  handleInputChange,
  handleSubmit,
  headerText,
  submitButtonText,
  dropDownValue,
  dropDownOnchange,
  options,
  selectedItem,
  handleChange,
}) => {

  return (
    <ModalDialog open={showModal} onClose={closeModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
        <div className="form_holder">
            <div className="row">
              <div className="col-sm-12">
              <TextInput
            type="text"
            name="name"
            label="Name:*"
            placeholder=""
            value={formData.name}
            onChange={handleInputChange}
            error={formDataError.name}
          />
              </div>
              <div className="col-sm-12">
          <TextInput
            type="text"
            name="description"
            label="Description:*"
            placeholder=""
            value={formData.description}
            onChange={handleInputChange}
            error={formDataError.description}
          />
          </div>
          <div className="col-sm-12">
          <Dropdown
            label="Choose Module:*"
            value={dropDownValue}
            // selectedOption={setSelectedOption}
            onChange={dropDownOnchange}
            options={options}
            error={formDataError.module}
            // handleDropdownChange={handleDropdownChange}
          />
         </div>
         <div className="col-sm-12">
         <ReadWriteCheckbox
            label={[{ value: "read" }, { value: "write" }]}
            value={formData.type}
            handleChange={handleChange}
            // handleCheckboxChange={handleCheckboxChange}
            selectedItem={selectedItem ? selectedItem : formData.type}
            error={formDataError.type}
          />
         </div>
          </div>
          </div>
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default RoleAddEdit;
