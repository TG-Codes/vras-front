import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaInput from "../TextAreaInput";
import ReadWriteCheckbox from "../ReadWriteCheckbox";
import Dropdown from "../Dropdown";
import RadioInput from "../RadioInput";
import PhoneNumberInput from "../PhoneNumberInput";
// import Button from '../Button';

const ProUserAddEdit = ({
  formData,
  roleData,
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
  handleChangeRole,
  selectedValue,
  setSelectedValue,
  outcomeValue,
  handleChange,
  selectedItem,
  handleCheckboxChange,
  handleGenderChange,

  department,
  genderOptions,
  primaryHandOptions,
  handlePrimaryHandChange,
  selectedGender,
  setSelectedGender,
  genderValue,
  selectedHand,
  setSelectedHand,
  handValue,
  handleHandChange,
  userData,
  handlePhoneNumberChange,
}) => {
  return (
    <ModalDialog open={showModal} onClose={closeModal} size="lg">
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
                  label="First Name*"
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
                  label="Last Name*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formDataError.lastName}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="username"
                  label="Username*"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formDataError.username}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="address"
                  label="Select Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={formDataError.address}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="email"
                  label="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formDataError.email}
                  placeholder=""
                />
              </div>
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="mobile"
                  label="Mobile *"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  error={formDataError.mobile}
                  placeholder=""
                />
              </div> */}

              <div className="col-md-6">
                <PhoneNumberInput
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handlePhoneNumberChange}
                  label="Mobile:*"
                  error={formDataError.mobile}
                  placeholder=""
                // maxLength={10}
                // handlePhoneNumberChange={handleContactPhoneNumberChange}
                />
              </div>

              <div className="col-md-12">
                <Dropdown
                  label=" Role:*"
                  value={formData.role}
                  options={roleData}
                  onChange={handleChangeRole}
                  error={formDataError.role}
                />
              </div>
              <div className="col-md-12">
                <label>Allocate To A Department</label>
                <CheckBoxRadioInput
                  data={department}
                  checkedValues={formData.department}
                  handleCheckboxChange={handleCheckboxChange}
                  getItemValue={(item) => item.id}
                  formatLabel={(item) => `${item.name}`}
                  error={formDataError.department}
                />
              </div>

              <div className="col-md-6">
                <label>Gender</label>
                <ActiveInactive
                  selectedValue={selectedGender}
                  setSelectedValue={setSelectedGender}
                  handleChange={handleGenderChange}
                  value={genderValue}
                // value1={value1}
                // value2={value2}
                />
              </div>

              <div className="col-md-6">
                <label>Select Primary Hand</label>
                <ActiveInactive
                  selectedValue={selectedHand}
                  setSelectedValue={setSelectedHand}
                  handleChange={handleHandChange}
                  value={handValue}
                // value1={value1}
                // value2={value2}
                />
              </div>

              {/* <div className="col-md-6">
              
                <TextInput
                  type="text"
                  name="dateOfBirth"
                  label="Select Date Of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={formDataError.dateOfBirth}
                  placeholder=""
                />
              </div> */}

              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="city"
                  label="Select City"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={formDataError.city}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="postalCode"
                  label="Select Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  error={formDataError.postalCode}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="country"
                  label="Select Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={formDataError.country}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="emergencyContactName"
                  label="Select Emergency Contact Name"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  error={formDataError.emergencyContactName}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="number"
                  name="emergencyContactPhone"
                  label="Select Emergency Contact Phone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  error={formDataError.emergencyContactPhone}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="medicalConditions"
                  label="Select Medical Conditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  error={formDataError.medicalConditions}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="allergies"
                  label="Select Allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  error={formDataError.allergies}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="experienceLevel"
                  label="Select Experience Level"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  error={formDataError.experienceLevel}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="stressLevel"
                  label="Select Stress Level"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                  error={formDataError.stressLevel}
                  placeholder=""
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

export default ProUserAddEdit;
const CheckBoxRadioInput = ({
  data,
  checkedValues,
  handleCheckboxChange,
  formatLabel,
  getItemValue,
  error
}) => {
  return (
    <div className="row">
      {data.map((item, index) => {
        const itemValue = getItemValue ? getItemValue(item) : item.value;
        return (
          <div className="col-md-6">
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={itemValue}
                checked={checkedValues?.includes(itemValue)}
                onChange={() => handleCheckboxChange(itemValue)}
              />
              <span className="checkbox-custom"></span>
              {formatLabel ? formatLabel(item) : item.label}
            </label>
          </div>
        );
      })}
      {error && (
        <div style={{ color: "red" }}>{error}</div>
      )}
    </div>
  );
};
