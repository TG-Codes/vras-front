import React, { useState } from "react";
import ModalDialog from "../ModalDialog";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "../TextInput";
import "react-datepicker/dist/react-datepicker.css";


const AdminAddEdit = ({
    showAddModal,
    formType,
    closeModal,
    formData,
    formDataError,
    handleInputChange,
    handleContentChange,
    content,
    handleSubmit,
    headerText,
    submitButtonText
}) => {

    return (
        <ModalDialog open={showAddModal} onClose={closeModal} size="lg">
            <ModalDialog.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </ModalDialog.Header>
            <ModalDialog.Body>
                <Form>
                    <div className="form_holder">
                        <div className="row">
                            <div className="col-sm-12">
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
                            <div className="col-sm-12">
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
                            <div className="col-sm-12">
                                <TextInput
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    label="Phone Number:*"
                                    error={formDataError.mobile}
                                    placeholder=""
                                // maxLength={10}
                                />
                            </div>
                            <div className="col-sm-12">
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
                            {formType != 'edit' &&
                                <>
                                    <div className="col-sm-12">
                                        <TextInput
                                            type="text"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            label="Password:*"
                                            error={formDataError.password}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-sm-12">
                                        <TextInput
                                            type="text"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            label="Confirm Password:*"
                                            error={formDataError.confirmPassword}
                                            placeholder=""
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Form>
            </ModalDialog.Body>
            <ModalDialog.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    {submitButtonText}
                </Button>
            </ModalDialog.Footer>
        </ModalDialog>
    );
};

export default AdminAddEdit;
