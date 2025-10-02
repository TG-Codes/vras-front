
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaInput from "../TextAreaInput";
import ReadWriteCheckbox from "../ReadWriteCheckbox";
// import Button from '../Button';

const DepartmentAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  submitButtonText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  formType,
  editObjWeapon,
  handleChangeSubscription,
  selectedValue,
  setSelectedValue,
  outcomeValue,
  handleChange,
  selectedItem
}) => {
  console.log(formData, "formData===>");
  return (
    <ModalDialog open={showModal} onClose={closeModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <div className="form_holder">
            <div className="row">
            <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
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

export default DepartmentAddEdit;

