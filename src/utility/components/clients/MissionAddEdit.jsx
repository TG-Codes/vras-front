import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
import TextInput from "../TextInput";
import ActiveInactive from "../admin/ActiveInactive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextAreaInput from "../TextAreaInput";
import Dropdown from "../Dropdown";
import { format } from "date-fns";

const MissionAddEdit = ({
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
  difficultyValue,
  handleDifficultyChange,
  statusOptions,
  handleChangeStatus,
  environmentOptions,
  handleChangeEnvironment,
  scenarioOptions,
  handleChangeScenario,
  departmentoptions,
  handleChangeDepartment,
}) => {

  const handleStartDateChange = (date) => {
    setStartDate(date);
    handleInputChange({
      target: {
        name: "startAt",
        value: format(date, "yyyy-MM-dd"),
      },
    });

    // If end date is before the new start date, update end date as well
    if (endDate && endDate < date) {
      setEndDate(date);
      handleInputChange({
        target: {
          name: "endAt",
          value: format(date, "yyyy-MM-dd"),
        },
      });
    }
  };

  // Handle end date change with validation
  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
      handleInputChange({
        target: {
          name: "endAt",
          value: format(date, "yyyy-MM-dd"),
        },
      });
    } else {
      alert("End date must be after start date.");
    }
  };


  return (
    <ModalDialog open={showModal} onClose={closeModal} size="lg">
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <div className="form_holder">
            <div className="row">
              <div className="col-md-12">
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
                <Dropdown
                  label=" Map:*"
                  value={formData.environment}
                  options={environmentOptions}
                  onChange={handleChangeEnvironment}
                  error={formDataError.environment}
                />
              </div>
              <div className="col-md-6">
                <Dropdown
                  label=" Scenario:*"
                  value={formData.scenario}
                  options={scenarioOptions}
                  onChange={handleChangeScenario}
                  error={formDataError.scenario}
                />
              </div>
              <div className="col-md-6">
                <Dropdown
                  label=" Department:*"
                  value={formData.department}
                  options={departmentoptions}
                  onChange={handleChangeDepartment}
                  error={formDataError.department}
                />
              </div>
              <div className="col-md-6">
                <Dropdown
                  label=" Status:*"
                  value={formData.status}
                  options={statusOptions}
                  onChange={handleChangeStatus}
                  error={formDataError.status}
                />
              </div>
              <div className="col-md-6">
                <label>Start Date:*</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="yyyy-MM-dd"
                  className={`form-control ${formDataError.startAt ? "is-invalid" : ""
                    }`}
                />
                {formDataError.startAt && (
                  <div className="invalid-feedback">{formDataError.startAt}</div>
                )}
              </div>
              <div className="col-md-6">
                <label>End Date:*</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="yyyy-MM-dd"
                  className={`form-control ${formDataError.endAt ? "is-invalid" : ""}`}
                  minDate={startDate}
                />
                {formDataError.endAt && (
                  <div className="invalid-feedback">{formDataError.endAt}</div>
                )}
              </div>
              <div className="col-md-12">
                <TextAreaInput
                  type="text"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={formDataError.description}
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

export default MissionAddEdit;
