import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from './ModalDialog'
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput"
import RichTextEditor from "./RichTextEditor";

const TestimonialAddEdit = ({
  showAddModal,
  closeAddModal,
  formData,
  formDataError,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <ModalDialog open={showAddModal} onClose={closeAddModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>Add Testimonial</Modal.Title>
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
            <TextAreaInput
            type="text"
            name="message"
            label="Message:*"
            placeholder=""
            value={formData.message}
            onChange={handleInputChange}
            error={formDataError.message}
            />
            </div>
          </div>
        </div>
      </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="secondary" onClick={closeAddModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            closeAddModal();
          }}
        >
          Submit
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default TestimonialAddEdit;
