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
import ProUsers from '../../../client/proUsers/pages/ProUsers'

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const OnlineUsers = (props) => {
  const gridRef = useRef(null);
  const { userData } = props;
  const authToken = userData.token;
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
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", minWidth:150, maxWidth:200 },
    {
      headerName: "Status", minWidth:100, maxWidth:200,
      valueGetter: (params) =>
        params.data && params.data.isOnline !== undefined
          ? params.data.isOnline === 0
            ? "Offline"
            : "Online"
          : null,
    },
    { field: "email", minWidth:250, maxWidth:400 },
    { field: "status", minWidth:150, maxWidth:200 },
    // { field: "client", width:'300'},
    {
      headerName: "client", minWidth:150, maxWidth:200,
      valueGetter: (params) =>
        params.data && params.data.client?.name
          ? params.data.client.name
          : null,
    },
    { field: "username", minWidth:150, maxWidth:200 },
    { field: "mobile", minWidth:150, maxWidth:200 },
    { field: "department", minWidth:150, maxWidth:200 },
    { field: "dateOfBirth", minWidth:150, maxWidth:200 },
    { field: "gender", minWidth:150, maxWidth:200 },
    { field: "primaryHand", minWidth:150, maxWidth:200 },
    { field: "address", minWidth:200, maxWidth:250 },
    { field: "city", minWidth:150, maxWidth:200 },
    { field: "postalCode", minWidth:150, maxWidth:200 },
    { field: "country", minWidth:200, maxWidth:250 },
    { field: "emergencyContactName", minWidth:150, maxWidth:200 },
    { field: "emergencyContactPhone", minWidth:150, maxWidth:200 },
    { field: "medicalConditions", minWidth:150, maxWidth:200 },
    { field: "allergies", minWidth:150, maxWidth:200 },
    { field: "experienceLevel", minWidth:150, maxWidth:200 },
    { field: "stressLevel", minWidth:150, maxWidth:200 },
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
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/instructors/pro-users?isOnline=1?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        const pageSize = endRow - startRow;
        const pageNumber = Math.floor(startRow / pageSize) + 1;
        url += `page=${pageNumber}&length=${10}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            console.log("response.data.data.users", response.data.data.users);
            params.successCallback(
              response.data.data.users,
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
  return (
    <div className="globaltable_holder">
    <div className="table_modal_open">
      <h3>Online Users</h3>
      {/* <Button className="tablemodal_btn" onClick={addProUser}>
        <FontAwesomeIcon icon={faUserPlus} />
        Add Pro User
      </Button> */}
    </div>
    {/* <ProUserAddEdit
      showModal={showModal}
      roleData={roleData}
      department={department}
      genderOptions={genderOptions}
      primaryHandOptions={primaryHandOptions}
      closeModal={closeModal}
      formData={formData}
      formDataError={formDataError}
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
      handleChangeRole={handleChangeRole}
      handlePrimaryHandChange={handlePrimaryHandChange}
      handleSubmit={handleSubmit}
      headerText={roleAddEditModalProps.headerText}
      submitButtonText={roleAddEditModalProps.submitButtonText}
      formType={roleAddEditModalProps.formType}
      selectedItem={selectedItem}
      handleChange={handleChange}
      handleGenderChange={handleGenderChange}
      genderValue={genderValue}
      selectedGender={selectedGender}
      setSelectedGender={setSelectedGender}
    />

    <ConfirmationAlert
      showAdminModal={showAdminModal}
      closeConfirmationAlert={closeConfirmationAlert}
      confirm={confrim}
      confirmationText={"delete this User"}
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
        cacheBlockSize={10}
        components={components}
        // onCellClicked={onCellClicked}
      />
    </div>
  </div>
  )
}
const mapStateToProps = (globalState)=> {
  return {
    userData: globalState.mainReducerData.userData
  }
}


export default(connect(mapStateToProps, {}))(OnlineUsers)
// export default OnlineUsers