// import React from "react";
// import { Modal, Button, ListGroup } from "react-bootstrap";

// const UserPermissionList = ({
//   showModal,
//   closeModal,
//   headerText,
//   permissionListData,
// }) => {
//   const renderPermissionList = () => {
//     return permissionListData.map((item, index) => (
//       <ListGroup.Item key={index} style={listItemStyle}>
//         <div style={boxStyle}>
//           <div style={boxLabelStyle}>Name:</div>
//           <div style={boxValueStyle}>{item.label}</div>
//         </div>
//         {/* <div style={boxStyle}>
//           <div style={boxLabelStyle}>Value:</div>
//           <div style={boxValueStyle}>{item.value}</div>
//         </div> */}
//         <div style={boxStyle}>
//           <div style={boxLabelStyle}>Module:</div>
//           <div style={boxValueStyle}>{item.module}</div>
//         </div>
//         <div style={boxStyle}>
//           <div style={boxLabelStyle}>Type:</div>
//           <div style={boxValueStyle}>{item.type}</div>
//         </div>
//       </ListGroup.Item>
//     ));
//   };

//   return (
//     <Modal show={showModal} onHide={closeModal}>
//       <Modal.Header closeButton>
//         <Modal.Title>{headerText}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <ListGroup>{renderPermissionList()}</ListGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={closeModal}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
// {/* <table className="permission_info_table">
//   <tr>
//   <th>Name</th>
//   <th>Module</th>
//   <th>Type</th>
//   </tr>
//   <tr>
//   <td></td>
//   <td></td>
//   <td></td>
//   </tr>
//   <tr>
//   <td></td>
//   <td></td>
//   <td></td>
//   </tr>
// </table> */}
// const listItemStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   marginBottom: "10px",
// };

// const boxStyle = {
//   display: "flex",
//   marginBottom: "5px",
// };

// const boxLabelStyle = {
//   width: "100px",
//   fontWeight: "bold",
// };

// const boxValueStyle = {
//   border: "1px solid #ccc",
//   padding: "5px",
//   marginLeft: "10px",
// };

// export default UserPermissionList;











import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import ModalDialog from '../ModalDialog';
const UserPermissionList = ({
  showModal,
  closeModal,
  headerText,
  permissionListData
}) => {
 
  const renderTableData = () => {
    return permissionListData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.label}</td>
          {/* <td>{item.value}</td> */}
          <td>{item.module}</td>
          <td>{item.type}</td>
        </tr>
      );
    });
  };

  return (
    <ModalDialog open={showModal} onClose={closeModal} size='lg'>
      <ModalDialog.Header closeModal>
        <Modal.Title>Permission List</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
      <table className="permission_info_table">
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Value</th> */}
            <th>Module</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default UserPermissionList;
