import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Button from '../Button';

const SessionsAddEdit = ({
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
  statusValue
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
           
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="sessionType"
                  label="Session Type:"
                  value={formData.sessionType}
                  onChange={handleInputChange}
                  error={formDataError.sessionType}
                  placeholder=""
                />
              </div> */}
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Session Name:"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                  placeholder=""
                />
              </div>

             
              <div className="col-md-6">
                  <label htmlFor="startDate">Start Date:</label>
                  <DatePicker
                    id="startDate"
                    selected={startDate || new Date()}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                  />
              </div>
              <div className="col-md-6">
                  <label htmlFor="endDate">End Date:</label>
                  <DatePicker
                    id="endDate"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                  />
              </div>
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="score"
                  label="Score:"
                  value={formData.score}
                  onChange={handleInputChange}
                  error={formDataError.score}
                  placeholder=""
                />
              </div> */}
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="timeOfDay"
                  label="Time of Day:"
                  value={formData.timeOfDay}
                  onChange={handleInputChange}
                  error={formDataError.timeOfDay}
                  placeholder=""
                />
              </div> */}
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="location"
                  label="Location:"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={formDataError.location}
                  placeholder=""
                />
              </div> */}
              {/* <div className="col-md-6">
                <TextInput
                  type="text"
                  name="participants"
                  label="Participants:"
                  value={formData.participants}
                  onChange={handleInputChange}
                  error={formDataError.participants}
                  placeholder=""
                />
              </div> */}
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="notes"
                  label="Notes:"
                  value={formData.notes}
                  onChange={handleInputChange}
                  error={formDataError.notes}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="sessionRecording"
                  label="Session Recording:"
                  value={formData.sessionRecording}
                  onChange={handleInputChange}
                  error={formDataError.sessionRecording}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <label>Status:</label>
                <ActiveInactive
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  value={statusValue}
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

export default SessionsAddEdit;
