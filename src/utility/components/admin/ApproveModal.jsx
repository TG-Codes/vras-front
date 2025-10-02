import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActiveInactive from "./ActiveInactive";
import TextInput from "../TextInput";
import ModalDialog from "../ModalDialog";
const ApproveModal = ({
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
  editObjClient,
  handleChangeSubscription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedValue,
  setSelectedValue,
  value1,
  value2,
  tomorrow,
  minimumEndDate
}) => {
  return (
    <ModalDialog open={showModal} onClose={closeModal}>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body scrollable={false}>
        <Form>
        <div className="form_holder">
        <div className="row">
        <div className="col-md-6">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            className="custom-datepicker"
          />
          </div>
          <div className="col-md-6">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={minimumEndDate}
            className="custom-datepicker"
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
          {/* <ActiveInactive
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    value1={value1}
                    value2={value2}
                    /> */}
                    </div>
                    </div>
        </Form>
      </ModalDialog.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </ModalDialog>
  );
};

export default ApproveModal;
