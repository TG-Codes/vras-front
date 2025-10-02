import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import Dropdown from "../Dropdown";
// import Button from '../Button';

const ScenarioAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  subscriptionData,
  submitButtonText,
  sessionData,
  handleChangeSession,
  handleChangeSubscription,
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
                  name="scenarioType"
                  label="Scenario Type:*"
                  value={formData.scenarioType}
                  onChange={handleInputChange}
                  error={formDataError.scenarioType}
                  placeholder=""
                />
              </div>

              {/* <TextInput
            type="number"
            name="sessionId"
            label="sessionId"
            value={formData.sessionId}
            onChange={handleInputChange}
            error={formDataError.sessionId}
          /> */}

              {/* <TextInput
            type="number"
            name="clientId"
            label="clientId"
            value={formData.clientId}
            onChange={handleInputChange}
            error={formDataError.clientId}
          /> */}
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="environment"
                  label="Environment"
                  value={formData.environment}
                  onChange={handleInputChange}
                  error={formDataError.environment}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={formDataError.location}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="timeLimit"
                  label="Time Limit"
                  value={formData.timeLimit}
                  onChange={handleInputChange}
                  error={formDataError.timeLimit}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="difficulty"
                  label="Difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  error={formDataError.difficulty}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="objective"
                  label="Objective:"
                  value={formData.objective}
                  onChange={handleInputChange}
                  error={formDataError.objective}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="description"
                  label="Description:"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={formDataError.description}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="hazards"
                  label="Hazards:"
                  value={formData.hazards}
                  onChange={handleInputChange}
                  error={formDataError.hazards}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="challenges"
                  label="Challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  error={formDataError.challenges}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="requiredSkills"
                  label="Required Skills"
                  value={formData.requiredSkills}
                  onChange={handleInputChange}
                  error={formDataError.requiredSkills}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="rewards"
                  label="Rewards"
                  value={formData.rewards}
                  onChange={handleInputChange}
                  error={formDataError.rewards}
                  placeholder=""
                />
              </div>
              <div className="col-md-6">
                <Dropdown
                  label="Session Id:*"
                  value={formData.sessionId}
                  options={sessionData}
                  onChange={handleChangeSession}
                  error={formDataError.sessionId}
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

export default ScenarioAddEdit;
