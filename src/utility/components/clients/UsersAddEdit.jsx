import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import Button from "../Button";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import ImageUpload from "../ImageUpload";
import Dropdown from "../Dropdown";
import MultiSelectDropdown from "../MultiSelectDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckBoxRadioInput from "../CheckBoxradioInput";
import CheckboxInput from "../CheckboxInput";

const UsersAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  submitButtonText,
  formType,
  editObjUser,
  selectedValue,
  setSelectedValue,
  genderValue,
  handValue,
  setHandValue,
  handArray,
  value1,
  value2,
  selectedImage,
  imageLabel,
  handleImageChange,
  removeImage,
  handleImageClick,
  getPermissions,
  handleCheckboxChange,
  checkedValues,
  paramsData,
  handleChangePermissions,
  dateOfBirth,
  setDateOfBirth,
  yesterday
}) => {
  console.log("formDatPermission ", formData.permissions)
  return (
    <ModalDialog open={showModal} onClose={closeModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <div className="form_holder">
            <div className="row">
              {/* {editObjUser.role !== "client" ? (
                <div className="col-md-6">
                  <MultiSelectDropdown
                    label="Permissions*"
                    value={formData.permissions}
                    options={getPermissions}
                    onChange={handleChangePermissions}
                    isDisabled={false}
                    error={formDataError.permissions}
                  />
                </div>
              ) : (
                <div className="col-md-6">
                  <MultiSelectDropdown
                    label="Permissions*"
                    value={formData.permissions}
                    options={getPermissions}
                    onChange={handleChangePermissions}
                    isDisabled={true}
                    // readOnly
                  />
                </div>
              )} */}
           <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="First Name:*"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="lastName"
                  label="Last Name:*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formDataError.lastName}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email:*"
                  error={formDataError.email}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  label="Username:*"
                  error={formDataError.username}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  label="Mobile Number:*"
                  error={formDataError.mobile}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  label="Address:"
                  error={formDataError.address}
                  placeholder=""
                />
              </div>
              <div className="col-md-12">
                <label>Permissions</label>
                  <CheckboxInput
                  data={getPermissions}
                  handleCheckboxChange={handleCheckboxChange}
                  checkedValues={checkedValues}
                  paramsData={paramsData}
                  />
                </div>
              <div className="col-md-6">
                <label>Gender:</label>
                <ActiveInactive
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  value={genderValue}
                  value1={value1}
                  value2={value2}
                />
              </div>
              <div className="col-md-6">
                <label>Primary hand:</label>
                <ActiveInactive
                  selectedValue={handValue}
                  setSelectedValue={setHandValue}
                  value={handArray}
                  value1={value1}
                  value2={value2}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  label="City:"
                  error={formDataError.city}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  label="Postal Code:"
                  error={formDataError.postalCode}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  label="Country:"
                  error={formDataError.country}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  label="Emergency Contact Name:"
                  error={formDataError.emergencyContactName}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  label="Emergency Contact Phone:"
                  error={formDataError.emergencyContactPhone}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  label="Medical Conditions:"
                  error={formDataError.medicalConditions}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  label="Allergies:"
                  error={formDataError.allergies}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  label="Notes:"
                  error={formDataError.notes}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  label="Experience Level:"
                  error={formDataError.experienceLevel}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                  label="Stress Level:"
                  error={formDataError.stressLevel}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <DatePicker
                  id="dateOfBirth"
                  selected={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  maxDate={yesterday()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="yyyy-MM-dd"
                  // maxDate={maxDate}
                />
              </div>
              {/* <ImageUpload
            selectedImage={selectedImage}
            label={imageLabel}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
            handleClick={handleImageClick}
          /> */}
            </div>
          </div>
        </Form>
      </ModalDialog.Body>
      <Modal.Footer>
        <Button className={`btn btn-secondary`} onClick={closeModal}>
          Close
        </Button>
        <Button className={`btn btn-primary`} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </ModalDialog>
  );
};

export default UsersAddEdit;
