import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../../../utility/components/Button';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { loaderStateFalse, loaderStateTrue, loginSuccess } from '../../../../actions/allActions';
import mission_img from "../../../../utility/assets/images/mission.png";
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import ConfirmationAlert from '../../../../utility/components/ConfirmationAlert';
import LiveSessionAddEdit from '../../../../utility/components/clients/LiveSessionAddEdit';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../utility/components/BackButton';

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const LiveSessions = (props) => {
    const {userData, loginSuccess, loaderStateTrue, loaderStateFalse, }=props;
    const navigate=useNavigate();
  const authToken = userData.token;
  const [ proUsersData, setProUsersData ] = useState([])
  const [ scenarioData, setScenarioData ] = useState([])

const filteredScenarioData = scenarioData?.map((item)=> item.scenario)
  const scenarioOptions = filteredScenarioData?.map((item)=>{
    return {
      "label" : item.name,
      "value" : item.id
    }
  })
  const statusOptions = [
    {label: "Active", value: "active"},
    {label: "Inactive", value: "inactive"}
  ]
  const usersOption = proUsersData?.map((item)=>{
    return {
      "label": item.name,
      "value": item.id
    }
  })
  // console.log("scenarioData ", usersOption)
  useEffect(()=>{
    fetchUsersData()
    fetchScenarioData()
  },[])
  const fetchUsersData = async ()=> {
    try {
      const response = await axios.get(`${baseUrL}/clients/pro-users?&role=user&page=1&length=1000`, {
        headers: {
          Authorization : authToken
        }
      })
      console.log("responseData ", response.data)
      setProUsersData(response.data.data.users)
      return response
    } catch (err){
      console.error(err)
    }
  }
  const fetchScenarioData = async ()=> {
    try {
      const response = await axios.get(`${baseUrL}/clients/live-sessions/scenarios`, {
        headers : {
          Authorization: authToken
        }
      })
      setScenarioData(response.data.data)
      console.log(response.data, "<=response")
      return response;
    } catch (err){
      console.log(err)
    }
  }

  const handleChangeScenario = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["scenario"] = event;
    setFormData(formDataTemp);

    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp["scenario"] = "Scenario is required";
    } else {
      formDataErrorTemp["scenario"] = "";
    }
    setFormDataError(formDataErrorTemp);
  };
  
  const handleChangeStatus = (event) => {
    let formDataTemp = {...formData};
    formDataTemp["status"] = event;
    setFormData(formDataTemp)

    let formDataErrorTemp = {...formDataError}
    if (Object.keys(event).length === 0) {
      formDataErrorTemp["status"] = "Status is required";
    } else {
      formDataErrorTemp["status"] = "";
    }
    setFormDataError(formDataErrorTemp);
  }
  const handleMultiDropDownChange = (selected) => {
    // setSelectedOptions(selected);
    let formDataTemp = {...formData}
    formDataTemp["users"]=selected
    setFormData(formDataTemp)
    let formDataErrorTemp = {...formDataError}
    if (selected.length==0) {
      formDataErrorTemp["users"]="User is required"
    } else {
      formDataErrorTemp["users"]=""
    }
    setFormDataError(formDataErrorTemp)
  };
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

  const [roleID, setRoleID] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/clients/live-sessions?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        const pageSize = endRow - startRow;
        const pageNumber = Math.floor(startRow / pageSize) + 1;

        url += `page=${pageNumber}&length=${pageSize}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            console.log("responsedatasource", response.data.data)
            params.successCallback(response.data.data.sessions, response.data.data.total);
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
  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  const closeModal = ()=>{
    setShowModal(false)
    setFormData({
      name: "",
      scenario: {},
      users: [],
      notes: "",
      sessionRecording: "",
      status: {}
    }
   )
   setFormDataError({
    name: "",
    scenario: {},
    users: [],
    notes: "",
    sessionRecording: "",
    status: {}
  })
  }
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // { field: "name",minWidth: 200, maxWidth: 200, suppressSizeToFit: true },
    { field: "name",minWidth: 200, minWidth: 300, maxWidth: 350 },
    // { field: "sessionRecording",minWidth: 200, maxWidth: 250, suppressSizeToFit: true },
    { field: "sessionRecording", minWidth: 300, maxWidth: 350 },
    // { field: "status",minWidth: 100, maxWidth: 150, suppressSizeToFit: true },
    { field: "status", minWidth: 300, maxWidth: 350 },
    { field: "notes", minWidth: 300, maxWidth: 350 },
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
    //              <FontAwesomeIcon icon={faPencil} />
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
  const gridRef = useRef(null);


  const [editObjRoles, setEditObjRoles] = useState({});
  const editRoles = (e, params) => {
    console.log("data", params.data)
    fetchUsersData()
    let data = params.data;
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "edit";
    roleAddEditModalPropsTemp["headerText"] = "Edit Live Session";
    roleAddEditModalPropsTemp["submitButtonText"] = "Update";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setEditObjRoles(data);
    let formDataTemp = { ...formData };
    
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["notes"] = data.notes;
    formDataTemp["sessionRecording"] = data.sessionRecording;
    formDataTemp["status"] = data.status;
    if (data.scenario) {
      formDataTemp["scenario"]= {
        label: data.scenario.name,
        value: data.scenario.id
      }
    } else {
      formDataTemp["scenario"]={}
    }
    if (data.users) {
      formDataTemp["users"]= data.users.map((item)=>{
        return {
          label: item.name,
          value: item.id
        }
      })
    } else {
      formDataTemp["users"]=[]
    }
    if (data.status) {
      formDataTemp["status"] = {
        label: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        value: data.status
      }
    } else {
      formDataTemp["status"] = {}
    }
    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteMission = async (e, params) => {
    const roleID = params?.data.id;
    setShowAdminModal(true);
    setRoleID(roleID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/clients/live-sessions/destroy/${roleID}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowAdminModal(false);
        resetDataGrid()
        // fetchData();
        fetchUsersData()
        loaderStateFalse();
        toast(`${response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      loaderStateFalse();
    }
  };
  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
}
const [formData, setFormData] = useState({
    name: "",
    scenario:{},
    users: [],
    notes: "",
    sessionRecording: "",
    status: {},
});

const [formDataError, setFormDataError] = useState({
  name: "",
  scenario: {},
  users: [],
  notes: "",
  sessionRecording: "",
  status: {},
});
const validateForm = () => {
  let isValid = true;
  let formDataErrorTemp = Object.assign({}, formDataError);
  
  if (formData.name === "") {
    isValid = false;
    formDataErrorTemp.name = "Name is required";
  }
  // if (formData.notes === "") {
  //   isValid = false;
  //   formDataErrorTemp.notes = "Notes is required";
  // }
  if (Object.keys(formData.scenario).length === 0) {
    isValid = false;
    formDataErrorTemp.scenario = "Scenario is required";
  }
  if (formData.users && formData.users?.length == 0) {
    isValid = false;
    formDataErrorTemp.users = "User is required";
  }

  if (formData.sessionRecording === "") {
    isValid = false;
    formDataErrorTemp.sessionRecording = "Session Recording is required";
  }

  if (Object.keys(formData.status).length === 0) {
    isValid = false;
    formDataErrorTemp.status = "Status is required";
  }

  // if (formData.status === "") {
  //   isValid = false;
  //   formDataErrorTemp.status = "Status is required";
  // }
  
 
  setFormDataError(formDataErrorTemp);
  return isValid;
};

const handleInputChange = (e) => {
  let { name, value } = e.target;
  let formDataTemp = Object.assign({}, formData);
  let formDataErrorTemp = Object.assign({}, formDataError);

  formDataTemp[name] = value;
  if (name === "name") {
    if (value == "") {
      formDataErrorTemp.name = "name is required";
    } else {
      formDataErrorTemp.name = "";
    }
  }

  if (name === "notes") {
    if (value == "") {
      formDataErrorTemp.notes = "Notes is required";
    } else {
      formDataErrorTemp.notes = "";
    }
  }

  if (name === "locsessionRecordingation") {
    if (value == "") {
      formDataErrorTemp.sessionRecording = "Session Recording is required";
    } else {
      formDataErrorTemp.sessionRecording = "";
    }
  }

  if (name === "status") {
    if (value == "") {
      formDataErrorTemp.status = "Status is required";
    } else {
      formDataErrorTemp.status = "";
    }
  }

  if (name === "sessionRecording") {
    if (value == "") {
      formDataErrorTemp.sessionRecording = "Session recording is required";
    } else {
      formDataErrorTemp.sessionRecording = "";
    }
  }
  
  setFormData(formDataTemp);
  setFormDataError(formDataErrorTemp);
};
const usersValue = formData.users
const formattedUsersValue = usersValue?.map((item)=> item.value)
console.log("formattedUsersValue ", formattedUsersValue)
const formatData = () => {
  let data = {};
  data["name"] = formData.name;
  data["scenarioId"]= formData.scenario.value;
  data["userIds"]=  formattedUsersValue;
   data["sessionRecording"] = formData.sessionRecording;
  data["status"] = formData.status.value;
  data["notes"] = formData.notes;
  return data;
};
const handleSubmit = async () => {
  
    if (validateForm()) {
    //   loaderStateTrue();
      let url;
      let method;
      let data;
      data = formatData();
      if (roleAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/clients/live-sessions/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/clients/live-sessions/update/${formData.id}`;
        method = "put";
      }
      addEditPostData(url, data, method);

    }

}
    const addEditPostData = async (url, data, method) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: authToken,
        },
      });
      resetDataGrid();
      loaderStateFalse()
      toast(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        closeModal()
        fetchUsersData()
      return response;
    } catch (error) {
      loaderStateFalse()
      if (error.response) {
        if (error.response.status == 422) {
          let resData = error.response.data;
          if (resData.success === false) {
            let formDataErrorTemp = { ...formDataError };
            let responseData = resData.data;
            let obj = Object.keys(responseData);
            if (obj.length > 0) {
              obj.map((item, index) => {
                if (responseData[item]) {
                  // if (item == "username") {
                  //   formDataErrorTemp.name = responseData[item].message;
                  // } else {
                    formDataErrorTemp[item] = responseData[item].message;
                  // }
                }
              });
              setFormDataError(formDataErrorTemp);
            }
          }
        }
        if (error.response.status===401){
          loginSuccess({});
          const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
          const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
          if (userData.role === "admin") {
            window.location.href = adminLoginURL;
          } else {
            window.location.href = loginURL;
          }
        }
      } else {
        // Utility.toastNotifications(error.message, "Error", "error");
        toast(`Sorry! Something went wrong.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  
  const [roleAddEditModalProps, setRoleAddEditModalProps] = useState({});
  const addMission = () => {
    fetchUsersData()
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "add";
    roleAddEditModalPropsTemp["headerText"] = "Add Live Session";
    roleAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setShowModal(true);
  };
  
  const onCellClicked = (event) => {
    // Check if the clicked cell should not trigger the row click
    if (event.column.colId !== 'Action') {
      // navigate(`/admin/pro-user-details/${event.data.id}`)
      navigate(`/live-session/${event.data?.id}`)
    }
  };
  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
      <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={mission_img}/></span>
             <h3>Live Sessions</h3>
        </div>
        <Button className="tablemodal_btn" onClick={addMission}><FontAwesomeIcon icon={faUserPlus} />Start New Live Session</Button>
      </div>
      <LiveSessionAddEdit
       showModal={showModal}
       closeModal={closeModal}
       formData={formData}
       formDataError={formDataError}
       handleInputChange={handleInputChange}
       handleSubmit={handleSubmit}
       headerText={roleAddEditModalProps.headerText}
       submitButtonText={roleAddEditModalProps.submitButtonText}
       formType={roleAddEditModalProps.formType}
       scenarioOptions={scenarioOptions}
       statusOptions={statusOptions}
       handleChangeStatus={handleChangeStatus}
       handleChangeScenario={handleChangeScenario}
       usersOption={usersOption}
       handleMultiDropDownChange={handleMultiDropDownChange}
       
       />
      
       <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={'delete this Mission'}
        headerText={"Delete?"}
      />
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)"}}
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
        onCellClicked={onCellClicked}
        cacheBlockSize={10}
        />
      </div>
      </div>
  )
}

const mapStateToProps = (globalState) => {
    return {userData: globalState.mainReducerData.userData};
  };
  export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, loginSuccess })(
    withNamespaces()(LiveSessions)
  );
