import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";

// import Dropdown from "./Dropdown";

const TargetAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  subscriptionData,
  submitButtonText,
  formType,
  editObjWeapon,
  handleChangeSubscription,
}) => {
  // console.log("formData.subscriptionId", formData.subscriptionId);

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
                  name="targetType"
                  label="Type of the target:"
                  value={formData.targetType}
                  onChange={handleInputChange}
                  error={formDataError.targetType}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Name of the target:"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="description"
                  label="Description of the target:"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={formDataError.description}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="location"
                  label="Location of the target:"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={formDataError.location}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="longitude"
                  label="Longitude:"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  error={formDataError.longitude}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="heightAboveGround"
                  label="Height above ground:"
                  value={formData.heightAboveGround}
                  onChange={handleInputChange}
                  error={formDataError.heightAboveGround}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="difficulty"
                  label="Difficulty level:"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  error={formDataError.difficulty}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="health"
                  label="Health of the target:"
                  value={formData.health}
                  onChange={handleInputChange}
                  error={formDataError.health}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="size"
                  label="Size of the target:"
                  value={formData.size}
                  onChange={handleInputChange}
                  error={formDataError.size}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="behavior"
                  label="Behavior of the target:"
                  value={formData.behavior}
                  onChange={handleInputChange}
                  error={formDataError.behavior}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="weaknesses"
                  label="Weaknesses of the target:"
                  value={formData.weaknesses}
                  onChange={handleInputChange}
                  error={formDataError.weaknesses}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="armament"
                  label="Armament of the target:"
                  value={formData.armament}
                  onChange={handleInputChange}
                  error={formDataError.armament}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="armor"
                  label="Armor of the target:"
                  value={formData.armor}
                  onChange={handleInputChange}
                  error={formDataError.armor}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="vulnerability"
                  label="Vulnerability of the target:"
                  value={formData.vulnerability}
                  onChange={handleInputChange}
                  error={formDataError.vulnerability}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="movementPattern"
                  label="Movement pattern of the target:"
                  value={formData.movementPattern}
                  onChange={handleInputChange}
                  error={formDataError.movementPattern}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="visualAppearance"
                  label="Visual appearance of the target:"
                  value={formData.visualAppearance}
                  onChange={handleInputChange}
                  error={formDataError.visualAppearance}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="soundAppearance"
                  label="Sound appearance of the target:"
                  value={formData.soundAppearance}
                  onChange={handleInputChange}
                  error={formDataError.soundAppearance}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="threatLevel"
                  label="Threat level of the target:"
                  value={formData.threatLevel}
                  onChange={handleInputChange}
                  error={formDataError.threatLevel}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="notes"
                  label="Additional notes about the target:"
                  value={formData.notes}
                  onChange={handleInputChange}
                  error={formDataError.notes}
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

export default TargetAddEdit;
