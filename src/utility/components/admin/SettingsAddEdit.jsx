import React from "react";
import TextInput from "../TextInput";
import ModalDialog from "../ModalDialog";
import { Modal, Button, Form } from "react-bootstrap";

const SettingsAddEdit = ({
  showModal,
  closeModal,
  headerText,
  submitButtonText,
  formData,
  formDataError,
  handleInputChange,
  handleSubmit,
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
                  name="key"
                  label="Key:*"
                  placeholder=""
                  value={formData.key}
                  onChange={handleInputChange}
                  error={formDataError.key}
                />
              </div>
              <div className="col-sm-12">
                <TextInput
                  type="text"
                  name="value"
                  label="Value:*"
                  placeholder=""
                  value={formData.value}
                  onChange={handleInputChange}
                  error={formDataError.value}
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
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          {submitButtonText}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default SettingsAddEdit;
