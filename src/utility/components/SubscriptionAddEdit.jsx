import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "./TextInput";
import ModalDialog from "./ModalDialog";

const SubscriptionAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  submitButtonText,
  formType,
}) => {
  return (
    <ModalDialog open={showModal} onClose={closeModal} >
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
            placeholder=""
            value={formData.name}
            onChange={handleInputChange}
            label="Name:*"
            error={formDataError.name}
          />
              </div>
              <div className="col-sm-12">
          <TextInput
            type="text"
            name="price"
            placeholder=""
            value={formData.price}
            onChange={handleInputChange}
            label="Price:*"
            error={formDataError.price}
          />
          </div>
          {/* <div className="col-sm-12">
          <TextInput
            type="text"
            name="numberOfUsers"
            placeholder=""
            value={formData.numberOfUsers}
            onChange={handleInputChange}
            label="Number Of Users:*"
            error={formDataError.numberOfUsers}
          />
          </div>
          <div className="col-sm-12">
          <TextInput
            type="text"
            name="numberOfDays"
            placeholder=""
            value={formData.numberOfDays}
            onChange={handleInputChange}
            label="Number of Days:*"
            error={formDataError.numberOfDays}
          />
          </div> */}
          <div className="col-sm-12">
          <TextInput
            type="text"
            name="description"
            placeholder=""
            value={formData.description}
            onChange={handleInputChange}
            label="Description"
            error={formDataError.description}
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
          {/* <Button variant="primary" onClick={()=>{handleSubmit(); closeModal()}}> */}
          {submitButtonText}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default SubscriptionAddEdit;
