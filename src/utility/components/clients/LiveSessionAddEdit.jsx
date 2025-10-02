import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaInput from "../TextAreaInput";
import Dropdown from "../Dropdown";
import MultiSelectDropdown from "../MultiSelectDropdown";
// import Button from '../Button';

const LiveSessionAddEdit = ({
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
  endDate,
  setEndDate,
  formType,
  editObjWeapon,
  handleChangeSubscription,
  selectedValue,
  setSelectedValue,
  outcomeValue,
  scenarioOptions,
  handleChangeScenario,
  usersOption,
  handleMultiDropDownChange,
  statusOptions,
  handleChangeStatus
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
                  label="Name:*"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="sessionRecording"
                  label="Session Recording:*"
                  value={formData.sessionRecording}
                  onChange={handleInputChange}
                  error={formDataError.sessionRecording}
                  placeholder=""
                />
              </div>
              <div className="col-md-12">
              <Dropdown
                  label=" Scenario:*"
                  value={formData.scenario}
                  options={scenarioOptions}
                  onChange={handleChangeScenario}
                  error={formDataError.scenario}
                />
              </div>
              <div className="col-md-12">
              <MultiSelectDropdown
                  label="Users:*"
                  options={usersOption}
                  value={formData.users}
                  onChange={handleMultiDropDownChange}
                  error={formDataError.users}
                  isDisabled={false}
                />
              </div>
             
              <div className="col-md-12">
                {/* <TextInput
                  type="text"
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                  error={formDataError.status}
                  placeholder=""
                /> */}
                <Dropdown
                  label=" Status:*"
                  value={formData.status}
                  options={statusOptions}
                  onChange={handleChangeStatus}
                  error={formDataError.status}
                />
              </div>
              <div className="col-md-12">
                <TextAreaInput
                  type="text"
                  name="notes"
                  label="Notes"
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

export default LiveSessionAddEdit;
