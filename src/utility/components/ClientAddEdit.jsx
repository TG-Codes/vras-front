import React, { useState } from "react";
import ModalDialog from "./ModalDialog";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "./TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "./Dropdown";
import ActiveInactive from "./admin/ActiveInactive";
import MultiSelectDropdown from "./MultiSelectDropdown";
import PhoneNumberInput from "./PhoneNumberInput";

const ClientAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  subscriptionData,
  environmentData,
  submitButtonText,
  formType,
  editObjClient,
  handleChangeSubscription,
  handleChangeEnvironment,
  value1,
  value2,
  genderValue,
  selectedGender,
  setSelectedGender,
  selectedPrimaryHand,
  setSelectedPrimaryHand,
  hand1,
  hand2,
  handValue,
  dateOfBirth,
  setDateOfBirth,
  scenarioData,
  selectedOptions,
  handleMultiDropDownChange,
  environmentStatus,
  handlePhoneNumberChange,
  handleContactPhoneNumberChange,
}) => {
  const [showPersonalInformation, setShowPersonalInformation] = useState(false)
  console.log("formData=> ", formData)
  return (
    <ModalDialog open={showModal} onClose={closeModal} size="lg">
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {formType === "register" && (
          <>
            {/* <div>Number of Users: {formData.subscriptionId.numberOfUsers}</div> */}
            <div>Price: {formData.subscriptionId.price}</div>
          </>
        )}
        <Form>
          <div className="form_holder">
            <div className="row">
              {/* {formType !== "register" && (
                <div className="col-md-6">
                  <Dropdown
                    label="Subscription:*"
                    value={formData.subscriptionId}
                    options={subscriptionData}
                    onChange={handleChangeSubscription}
                    error={formDataError.subscriptionId}
                  />
                </div>
              )} */}
              {formType !== "register" && (
                <>
                  <div className="col-md-6">
                    <Dropdown
                      label="Subscription:*"
                      value={formData.subscriptionId}
                      options={subscriptionData}
                      onChange={handleChangeSubscription}
                      error={formDataError.subscriptionId}
                    />
                  </div>
                  <div className="col-md-6">
                    <Dropdown
                      label="Environment:*"
                      value={formData.environmentId}
                      options={environmentData}
                      onChange={handleChangeEnvironment}
                      error={formDataError.environmentId}
                    />
                  </div>


                  <div className="col-md-12">
                    <MultiSelectDropdown
                      label="Scenarios:*"
                      options={scenarioData}
                      value={formData.scenarioId}
                      onChange={handleMultiDropDownChange}
                      error={formDataError.scenarioId}
                      isDisabled={environmentStatus}
                    />
                  </div>
                </>
              )}
              <div className="col-md-6">
                <div className="inp_block" onClick={() => setShowPersonalInformation(!showPersonalInformation)}>
                  {/* {labelType === "lower" && label && <label>{label}</label>} */}
                  <div className={`text-input `} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <span>Contact Person Information</span>
                    <div>
                      {showPersonalInformation ? <i className="fa-solid fa-minus"></i>
                        : <i className="fa-solid fa-plus"></i>}
                    </div>
                  </div>
                  {/* {labelType === "upper" && label && <label>{label}</label>}
                  {error && error !== "" && (
                    <span className={`${classNameError} text-input-error`}>{error}</span>
                  )} */}
                </div>
              </div>
              {showPersonalInformation &&
                <>
                  <div className="col-md-6">
                    <TextInput
                      type="text"
                      name="contactName"
                      label="Contact Person Name:"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      error={formDataError.contactName}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      type="text"
                      name="contactEmail"
                      label="Contact Person Email:"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      error={formDataError.contactEmail}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-6">
                <PhoneNumberInput
                  type="text"
                  name="contactPhoneNumber"
                  value={formData.contactPhoneNumber}
                  onChange={handleContactPhoneNumberChange}
                  label="Phone Number:*"
                  error={formDataError.contactPhoneNumber}
                  placeholder=""
                  // maxLength={10}
                  // handlePhoneNumberChange={handleContactPhoneNumberChange}
                />
              </div>
                </>}
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Name:*"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
                />
              </div>
              {(formType === "add" || formType === "register") && (
                <div className="col-md-6">
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
              )}
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
                <PhoneNumberInput
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  label="Phone Number:*"
                  error={formDataError.phoneNumber}
                  placeholder=""
                  // maxLength={10}
                  // handlePhoneNumberChange={handlePhoneNumberChange}
                />
              </div>

              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="numberOfUsers"
                  value={formData.numberOfUsers}
                  onChange={handleInputChange}
                  label="Parallel Users:*"
                  error={formDataError.numberOfUsers}
                  placeholder=""
                // maxLength={10}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="numberOfProUsers"
                  value={formData.numberOfProUsers}
                  onChange={handleInputChange}
                  label="Pro Users:*"
                  error={formDataError.numberOfProUsers}
                  placeholder=""
                // maxLength={10}
                />
              </div>
              <div className="col-md-12">
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
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  label="Allergies:"
                  error={formDataError.allergies}
                  placeholder=""
                />
              </div> */}
              {formType !== "edit" && (
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
              )}
              {/* {formType === "add" && (
                <>
                  
                  <div className="col-md-6">
                    <label>Gender</label>
                    <ActiveInactive
                      selectedValue={selectedGender}
                      setSelectedValue={setSelectedGender}
                      value={genderValue}
                      value1={value1}
                      value2={value2}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Primary Hand</label>
                    <ActiveInactive
                      selectedValue={selectedPrimaryHand}
                      setSelectedValue={setSelectedPrimaryHand}
                      value={handValue}
                      value1={hand1}
                      value2={hand2}
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
                  <div className="col-md-6"></div>
                  
                  <div className="col-md-6">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <DatePicker
                      id="dateOfBirth"
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="yyyy-MM-dd"
                      // maxDate={maxDate}
                    />
                  </div>
                </>
              )} */}
              {formType === "register" && (
                <>
                  <div className="col-md-6">
                    <TextInput
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      label="Password:*"
                      error={formDataError.password}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      label="Confirm Password:*"
                      error={formDataError.confirmPassword}
                      placeholder=""
                    />
                  </div>
                </>
              )}
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
              {/*formType !== "register" && (
                <div className="col-md-6">
                  <label htmlFor="startDate">Start Date:</label>
                  <DatePicker
                    id="startDate"
                    selected={startDate || new Date()}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                  />
                </div>
              )*/}
              {/* {formType === "edit" && (
                <div className="col-md-6">
                  <label htmlFor="endDate">End Date:</label>
                  <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                  />
                </div>
              )} */}
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

export default ClientAddEdit;
