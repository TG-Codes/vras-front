import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalDialog from "../ModalDialog";
// import Dropdown from "./Dropdown";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const InfoModal = ({
  showModal,
  closeModal,
  headerText,
  columnDefs,
  rowData,
  userRowHeight,
  userHeaderHeight
}) => {
  return (
    <ModalDialog open={showModal} onClose={closeModal} size='lg'>
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 300px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowHeight={userRowHeight}
          headerHeight={userHeaderHeight}
        //   rowModelType="infinite"
        //   onGridReady={onGridReady}
        //   components={components}
        //   cacheBlockSize={10}
        />
      </div>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        {/* <Button variant="primary">
          {submitButtonText}
        </Button> */}
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default InfoModal;
