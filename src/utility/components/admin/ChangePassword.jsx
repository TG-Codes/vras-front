import React, { useState } from "react";
import axios from "axios";
import { loaderStateTrue, loaderStateFalse } from "../../../actions/allActions";
import { connect } from "react-redux";

import TextInput from "../../../utility/components/TextInput";
import ModalDialog from "../ModalDialog";
//import Button from "../../../../utility/components/Button";

import { Modal, Button, Form } from "react-bootstrap";

const baseUrL = process.env.REACT_APP_BASE_URL;

const ChangePassword = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <>
      <ModalDialog open={showModal} onClose={closeModal}>
        <ModalDialog.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </ModalDialog.Header>
        <ModalDialog.Body>
          <Form>
            <div className="form_holder">
              <div className="row">
                <div className="col-md-12">
                  <TextInput
                    type="Password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    label="Current Password:"
                    error={formDataError.currentPassword}
                  />
                </div>
                <div className="col-md-12">
                  <TextInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    label="New Password:"
                    error={formDataError.password}
                  />
                </div>
                <div className="col-md-12">
                  <TextInput
                    type="Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    label="Confirm Password:"
                    error={formDataError.confirmPassword}
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
            Submit
          </Button>
        </ModalDialog.Footer>
      </ModalDialog>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {};
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  ChangePassword
);
