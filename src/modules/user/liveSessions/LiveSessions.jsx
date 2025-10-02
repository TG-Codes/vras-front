import React from 'react'
import { useState, useCallback, useMemo, useEffect } from "react";
import Button from '../../../utility/components/Button';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faPlus,
    faUserPlus,
    faCheckCircle,
    faTimesCircle,
    faInfoCircle,
  } from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { connect } from 'react-redux';
import BackButton from '../../../utility/components/BackButton';
import mission_img from "../../../utility/assets/images/mission.png";

const baseUrL = process.env.REACT_APP_BASE_URL;
const LiveSessions = (props) => {
const {userData} = props;

    useEffect(() => {
        fetchLiveSessionData()
        // if (
        //   userData.role === "user" &&
        //   typeof userData.permissions === "string" &&
        //   userData.permissions !== "{}"
        // ) {
        //   setPermissions(JSON.parse(userData.permissions));
        // }
      }, []);
      const authToken = userData.token;
      const [sessionID, setSessionID] = useState("");
      const [ rowData, setRowData ] = useState([])
    
      const fetchLiveSessionData = async ()=> {
        try {
          const response = await axios.get(`${baseUrL}/users/live-sessions`, {
            headers : {
              Authorization: authToken
            }
          })
          setRowData(response.data.data)
        } catch (err) {
          console.log(err)
        }
      }

    const [modules, setmodules] = useState([InfiniteRowModelModule]);
    const [components, setcomponents] = useState({
      loadingRenderer: (params) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
        }
      },
    });
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [gridparams, setgridparams] = useState(null);
    const rowHeight = 70;
  const headerHeight = 60;
    const columnDefs = [
      { field: "name" },
      // { field: "sessionType" },
      // { field: "outcome" },
      // { field: "score" },
      // { field: "timeOfDay" },
      // { field: "location" },
      // { field: "participants" },
      { field: "notes" },
      { field: "sessionRecording" },
      { field: "status" },
      {
        field: "Action",
        cellRenderer: (params) => {
          if (params.data) {
            return (
              <>
                {true&& (
                  <div>
                    <Button
                      onClick={(e) => joinLiveSession(e, params)}
                      className="action_button edt_btn"
                    >
                      Join Now <FontAwesomeIcon icon="fa-solid fa-play" />
                    </Button>
                  </div>
                )}
              </>
            );
          } else {
            return null;
          }
        },
      },
    ];
    const joinLiveSession = (e, params)=> {
      console.log("join session")
    }
    const onRowClick = (e, params)=> {
        console.log(e.data.id)
    }
  return (
    <>
      <div className="globaltable_holder">
        <div className="table_modal_open">
        <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={mission_img}/></span>
             <h3>Live Sessions</h3>
        </div>
        </div>
        {/* {true && (
          <div className="table_modal_open">
            <h3>Live Session</h3>
            <Button className="tablemodal_btn" 
            // onClick={addSession}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Start New Live Session
            </Button>
          </div>
        )} */}

        {/* {userData.role === "user" &&
          filteredPermission.length>0 && (
            <div className="table_modal_open">
               <h3>Session</h3>
              <Button className="tablemodal_btn" onClick={addSession}>
              <FontAwesomeIcon icon={faUserPlus} /> Add Session
              </Button>
            </div>
          )} */}

        {/* <SessionsAddEdit
          formData={formData}
          formDataError={formDataError}
          showModal={showModal}
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          headerText={sessionAddEditModalProps.headerText}
          submitButtonText={sessionAddEditModalProps.submitButtonText}
          formType={sessionAddEditModalProps.formType}
          editObjWeapon={editObjSession}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          statusValue={statusValue}
        />
        <ConfirmationAlert
          showAdminModal={showAdminModal}
          closeConfirmationAlert={closeConfirmationAlert}
          confirm={confrim}
          confirmationText={"delete this session"}
          headerText={"Delete?"}
        /> */}
        <div
          className="ag-theme-alpine"
          style={{ height: "calc(100vh - 320px)" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            // rowModelType="infinite"
            // onGridReady={onGridReady}
            rowData={rowData}
            // components={components}
            // cacheBlockSize={10}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            onRowClicked={onRowClick}
          />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (globalState)=> {
    return {
        userData : globalState.mainReducerData.userData
    }
}
export default connect(mapStateToProps, {})(LiveSessions)
