import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ImageUpload from "../ImageUpload";

const LogoAddEdit = ({
showAddEditModal,
  closeModal,
  formData,
  formDataError,
  handleInputChange,
  handleContentChange,
  content,
  handleSubmit,
  selectedImage,
  imageLabel,
  handleImageChange,
  removeImage,
  handleImageClick,
  headerText,
  submitButtonText
}) => {
  return (
    <ModalDialog open={showAddEditModal} onClose={closeModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <div className="form_holder">
            <div className="row">
              <div className="col-sm-12">
                <ImageUpload
                selectedImage={selectedImage}
                label={imageLabel}
                handleImageChange={handleImageChange}
                removeImage={removeImage}
                handleClick={handleImageClick}
                defaultImage={formData.image}
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
            handleSubmit()
          }}
        >
          {submitButtonText}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  )
}

export default LogoAddEdit