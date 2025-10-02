import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import DatePicker from "react-datepicker";
import ActiveInactive from "../admin/ActiveInactive";
import ImageUpload from "../ImageUpload";
// import Dropdown from "../Dropdown";
// import Button from '../Button';

const ProfileAddEdit = ({
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
  genderValue,
  handValue,
  handValue1,
  handValue2,
  selectedGender,
  selectedHand,
  setSelectedGender,
  setSelectedHand,
  selectedImage,
  imageLabel,
  handleImageChange,
  removeImage,
  handleImageClick,
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
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Name:"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="lastName"
                  label="Last Name:"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formDataError.lastName}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="number"
                  name="mobile"
                  label="Mobile:"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  error={formDataError.mobile}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="email"
                  label="Email:"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formDataError.email}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="userName"
                  label="Username:"
                  value={formData.userName}
                  onChange={handleInputChange}
                  error={formDataError.userName}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="allergies"
                  label="Allergies:"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  error={formDataError.allergies}
                />
              </div>
              <div className="col-md-6">
                <ActiveInactive
                  selectedValue={selectedGender}
                  setSelectedValue={setSelectedGender}
                  value={genderValue}
                />
              </div>
              <div className="col-md-6">
                <ActiveInactive
                  selectedValue={selectedHand}
                  setSelectedValue={setSelectedHand}
                  value={handValue}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="address"
                  label="Address:"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={formDataError.address}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="city"
                  label="City:"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={formDataError.city}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="country"
                  label="Country:"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={formDataError.country}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="number"
                  name="postalCode"
                  label="Postal Code:"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  error={formDataError.postalCode}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="number"
                  name="emergencyContactPhone"
                  label="Emergency Contact Phone:"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  error={formDataError.emergencyContactPhone}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="medicalConditions"
                  label="Medical Conditions:"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  error={formDataError.medicalConditions}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="startDate">Start Date:</label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                />
              </div>
              {/* <div className="col-md-6">
                <ImageUpload
                  selectedImage={selectedImage}
                  label={imageLabel}
                  handleImageChange={handleImageChange}
                  removeImage={removeImage}
                  handleClick={handleImageClick}
                  defaultImage={formData.avatar}
                />
              </div> */}
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

export default ProfileAddEdit;
