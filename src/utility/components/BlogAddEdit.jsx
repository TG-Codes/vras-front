import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "./ModalDialog";
import TextInput from "./TextInput";
import ImageUpload from "./ImageUpload";
// import RichTextEditor from './RichTextEditor';

const BlogAddEdit = ({
  showAddModal,
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
    <ModalDialog open={showAddModal} onClose={closeModal}>
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
                  label="Name:"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                />
              </div>
              <div className="col-sm-12">
                <TextInput
                  type="text"
                  name="description"
                  label="Description:"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={formDataError.description}
                />
              </div>
              {/* <RichTextEditor value={content} onChange={handleContentChange} /> */}
              <div className="col-sm-12">
                <TextInput
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  label="Slug:"
                  error={formDataError.slug}
                  placeholder=""
                  isDisabled={true}
                />
              </div>
              <div className="col-sm-12">
                <TextInput
                  type="text"
                  name="categories"
                  label="Categories:"
                  value={formData.categories}
                  onChange={handleInputChange}
                  error={formDataError.categories}
                />
              </div>
              <div className="col-sm-12">
                <TextInput
                  type="text"
                  name="tags"
                  label="Tags:"
                  value={formData.tags}
                  onChange={handleInputChange}
                  error={formDataError.tags}
                />
              </div>
              <div className="col-sm-12">
                <ImageUpload
                selectedImage={selectedImage}
                label={imageLabel}
                handleImageChange={handleImageChange}
                removeImage={removeImage}
                handleClick={handleImageClick}
                defaultImage={formData.avatar}
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
  );
};

export default BlogAddEdit;
