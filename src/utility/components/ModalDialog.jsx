import React from "react";
import { Modal } from "react-bootstrap";

const ModalDialog = ({ open, onClose,size="md", children }) => {
  return (
    <Modal 
    size={size}
    show={open} 
    onHide={onClose} 
    centered
    animation
    scrollable
    >
    {children}
    </Modal>
  );
};

const ModalHeader = ({ children }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{children}</Modal.Title>
    </Modal.Header>
  );
};

const ModalBody = ({ children, scrollable=true}) => {
  return <Modal.Body className={scrollable? "modal-dialog-scrollable" : ""}>{children}</Modal.Body>;
};

const ModalFooter = ({ children }) => {
  return <Modal.Footer>{children}</Modal.Footer>;
};

ModalDialog.Header = ModalHeader;
ModalDialog.Body = ModalBody;
ModalDialog.Footer = ModalFooter;

export default ModalDialog;
