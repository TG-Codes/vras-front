import React from "react";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import { Modal, Button, Form } from "react-bootstrap";

const VideosAddEdit = ({
  showModal,
  closeModal,
  formData,
  formDataError,
  handleInputChange,
  handleSubmit,
  headerText,
  submitButtonText,
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
                  name="url"
                  label="URL:*"
                  placeholder=""
                  value={formData.url}
                  onChange={handleInputChange}
                  error={formDataError.url}
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

export default VideosAddEdit;
