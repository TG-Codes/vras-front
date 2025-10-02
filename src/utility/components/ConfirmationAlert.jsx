import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmationAlert({ showAdminModal, closeConfirmationAlert ,confirm,confirmationText, headerText}) {
    
  return (
    <Modal show={showAdminModal} onHide={closeConfirmationAlert}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to{" "}{confirmationText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeConfirmationAlert}>Close</Button>
        <Button variant="primary" onClick={confirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationAlert;
