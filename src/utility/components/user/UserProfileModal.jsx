import React from "react";
import { Modal, Button } from "react-bootstrap";

const UserProfileModal = ({ showModal, closeModal, formData, headerText, submitButtonText }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
   
      
        {/* <div style={{ backgroundColor: '#9de2ff' }}> */}
          <div className="container">
            {/* <div className="row justify-content-center"> */}
              <div className="col-md-9 col-lg-7 col-xl-5 mt-5">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <img
                          style={{ width: '180px', borderRadius: '10px' }}
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                          alt='Generic placeholder image'
                          className="img-fluid"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="card-title">{formData.fullName}</h5>
                        <p className="card-text">User Name: {formData.username}</p>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                          <div>
                            <p className="small text-muted mb-1">Id</p>
                            <p className="mb-0">{formData.id}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Code</p>
                            <p className="mb-0">{formData.code}</p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Experience</p>
                            <p className="mb-0">{formData.experienceLevel}</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          <Button variant="outline-primary" className="me-1 flex-grow-1" onClick={closeModal}>Close</Button>
                          <Button variant="primary" className="flex-grow-1">Update</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        {/* </div> */}
    
     
    </Modal>
  );
};

export default UserProfileModal;
