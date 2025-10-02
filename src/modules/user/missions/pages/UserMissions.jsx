import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import Missions from "../../../client/missions/pages/Missions";
import { useLocation, useNavigate } from "react-router-dom";
import mission_img from "../../../../utility/assets/images/mission.png";
import BackButton from "../../../../utility/components/BackButton";

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const UserMissions = (props) => {
  const gridRef = useRef(null);
  const {userData} = props;
  const authToken = userData.token
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.search?.split("?")[1];
const [ rowData, setRowData ] = useState([])

// useEffect(()=>{
//   fetchUsersData()
// },[])

const fetchUsersData = async ()=> {
  try {
    const response = await axios.get(`${baseUrL}/users/missions`, {
      headers: {
        Authorization: authToken
      }
    })
    setRowData(response.data.data)
  } catch (err) {
    console.error(err)
  }
}
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/users/missions?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (isActive){
          url+= `status=inactive&`
        }
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }

        url += `_start=${startRow + 1}&_end=${endRow}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            params.successCallback(
              response.data.data.missions,
              response.data.data.total
            );
          })
          .catch((error) => {
            console.log(error);
            params.failCallback();
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
    gridRef.current = params.api;
    gridRef.current.sizeColumnsToFit();
  });
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", minWidth:150, maxWidth:200 },
    { field: "description", minWidth:150, maxWidth:200 },
    // { field: "environment", minWidth:150, maxWidth:200 },
    // { field: "scenario", minWidth:150, maxWidth:200 },
    // { field: "department", minWidth:150, maxWidth:200 },
    { field: "status", minWidth:150, maxWidth:200 },
    // {
    //   field: "Action",
    //   cellRenderer: (params) => {
    //     if (params.data) {
    //       return (
    //         <div>
    //           <Button
    //             onClick={(e) => editRoles(e, params)}
    //             className="action_button edt_btn"
    //           >
    //             <FontAwesomeIcon icon={faPencil} />
    //           </Button>
    //           <Button
    //             onClick={(e) => deleteMission(e, params)}
    //             className="action_button del_btn"
    //           >
    //             <FontAwesomeIcon icon={faTrashCan} />
    //           </Button>
    //         </div>
    //       );
    //     } else {
    //       return null;
    //     }
    //   },
    // },
  ]);
  const onRowClicked = (event)=> {
    navigate(`/user/mission-details/${event.data.id}`)
  }
  return (
    <div className="globaltable_holder">
    <div className="table_modal_open">
    <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={mission_img}/></span>
             <h3>Missions</h3>
            </div>
      {/* <Button className="tablemodal_btn" onClick={addMission}>
        <FontAwesomeIcon icon={faUserPlus} />
        Add Mission
      </Button> */}
    </div>
    {/* <MissionAddEdit
      showModal={showModal}
      closeModal={closeModal}
      formData={formData}
      formDataError={formDataError}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      headerText={roleAddEditModalProps.headerText}
      submitButtonText={roleAddEditModalProps.submitButtonText}
      formType={roleAddEditModalProps.formType}
      handleDifficultyChange={handleDifficultyChange}
      difficultyValue={difficultyValue}
    />

    <ConfirmationAlert
      showAdminModal={showAdminModal}
      closeConfirmationAlert={closeConfirmationAlert}
      confirm={confrim}
      confirmationText={"delete this Mission"}
      headerText={"Delete?"}
    /> */}
    <div
      className="ag-theme-alpine"
      style={{ height: "calc(100vh - 320px)" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        // rowData={rowData}
        rowModelType="infinite"
        // rowSelection="multiple"
        components={components}
        // onRowClicked={onRowClicked}
      />
    </div>
  </div>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};
export default connect(mapStateToProps, {})(UserMissions);
