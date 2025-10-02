import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "../TextInput";
import ModalDialog from "../ModalDialog";
import Dropdown from "../Dropdown";

const ScenarioAdminAddEdit = ({
    formData,
    formDataError,
    showModal,
    handleInputChange,
    handleSubmit,
    closeModal,
    headerText,
    submitButtonText,
    formType,
    options,
    handleChangeEnv,
    handleScrollToBottom
}) => {
    return (
        <ModalDialog open={showModal} onClose={closeModal} >
            <ModalDialog.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </ModalDialog.Header>
            <ModalDialog.Body>
                <Form>
                    <div className="form_holder">
                        <div className="row">
                            <div className="col-md-6">
                                <Dropdown
                                    label="Environment:*"
                                    value={formData.envValues}
                                    options={options}
                                    onChange={handleChangeEnv}
                                    error={formDataError.envValues}
                                    onMenuScrollToBottom={handleScrollToBottom}
                                />
                            </div>
                            <div className="col-sm-12">
                                <TextInput
                                    type="text"
                                    name="name"
                                    placeholder=""
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    label="Name:*"
                                    error={formDataError.name}
                                />
                            </div>
                            <div className="col-sm-12">
                                <TextInput
                                    type="text"
                                    name="description"
                                    placeholder=""
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    label="Description"
                                    error={formDataError.description}
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
                    {/* <Button variant="primary" onClick={()=>{handleSubmit(); closeModal()}}> */}
                    {submitButtonText}
                </Button>
            </ModalDialog.Footer>
        </ModalDialog>
    );
};

export default ScenarioAdminAddEdit;
