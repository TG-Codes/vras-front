import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActiveInactive from "./ActiveInactive";
const RejectModal = ({
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
    selectedValue,
    setSelectedValue,
    value1,
    value2
}) => {
    


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                 Are you sure you want to reject the client?
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{handleSubmit();closeModal()}}>
                    {submitButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RejectModal;
