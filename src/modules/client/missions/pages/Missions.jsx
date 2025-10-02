import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../../utility/components/Button";
import mission_img from "../../../../utility/assets/images/mission.png";
import { AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess,
} from "../../../../actions/allActions";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import MissionAddEdit from "../../../../utility/components/clients/MissionAddEdit";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import BackButton from "../../../../utility/components/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { endOfDay, format } from "date-fns";

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const Missions = (props) => {
  const gridRef = useRef(null);
  const { userData, loginSuccess, loaderStateTrue, loaderStateFalse, t } =
    props;
  const authToken = userData.token;

  const [environmentData, setEnvironmentData] = useState([])
  const [scenarioData, setScenarioData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const environmentOptions = [{
    "label": environmentData.name,
    "value": environmentData.id
  }]

  const scenarioOptions = scenarioData?.map((item) => {
    return {
      "label": item.name,
      "value": item.id
    }
  })

  const departmentOptions = departmentData?.map((item) => {
    return {
      "label": item.name,
      "value": item.id
    }
  })

  useEffect(() => {
    fetchEnvironmentData()
    fetchScenarioData()
    fetchDepartmentData()
  }, [])

  const fetchEnvironmentData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/clients/missions/client-details`, {
        headers: {
          Authorization: authToken
        }
      })
      console.log("responseData ", response.data)
      setEnvironmentData(response.data.data.environment)
      return response
    } catch (err) {
      console.error(err)
    }
  }

  const fetchScenarioData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/clients/missions/client-details`, {
        headers: {
          Authorization: authToken
        }
      })
      setScenarioData(response.data.data.scenarios)
      console.log(response.data, "<=responseScenariossss")
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/clients/missions/client-details`, {
        headers: {
          Authorization: authToken
        }
      })
      setDepartmentData(response.data.data.departments)
      console.log(response.data, "<=responseDepartmentssss")
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeEnvironment = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["environment"] = event;
    setFormData(formDataTemp);

    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp["environment"] = "Environment is required";
    } else {
      formDataErrorTemp["environment"] = "";
    }
    setFormDataError(formDataErrorTemp);
  };

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

  const handleChangeDepartment = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["department"] = event;
    setFormData(formDataTemp);

    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp["department"] = "Department is required";
    } else {
      formDataErrorTemp["department"] = "";
    }
    setFormDataError(formDataErrorTemp);
  };

  const navigate = useNavigate()
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ]
  const location = useLocation()
  const isActive = location.search?.split("?")[1];
  // const isPending = location.search?.split("?")[1]?.slice(-1);
  const [filterActive, setFilterActive] = useState(false);
  const [toggleStatus, setToggleStatus] = useState("")
  const gridApiRef = useRef(null);
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
      let url = `${baseUrL}/clients/missions?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (filterActive) {
          url += `status=active&`
        }
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
  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setStartDate(null)
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      status: {},
      scenario: {},
      environment: {},
      department: {},
      startAt: "",
      endAt: "",
    });
    setFormDataError({
      name: "",
      description: "",
      status: "",
      scenario: {},
      environment: {},
      department: {},
      startAt: "",
      endAt: "",
    });
  };
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", minWidth: 300, maxWidth: 350 },
    {
      field: "environment",
      minWidth: 300,
      maxWidth: 350,
      valueGetter: (params) => params?.data?.environment?.name || "N/A"
    },
    {
      field: "scenario",
      minWidth: 300,
      maxWidth: 350,
      valueGetter: (params) => params?.data?.scenario?.name || "N/A"
    },
    { 
      field: "department",
      minWidth: 300,
      maxWidth: 350,
      valueGetter: (params) => params?.data?.department?.name || "N/A"
     },
    { field: "description", minWidth: 300, maxWidth: 350 },
    { field: "startAt", minWidth: 300, maxWidth: 350 },
    { field: "endAt", minWidth: 300, maxWidth: 350 },
    { field: "status", minWidth: 300, maxWidth: 350 },
    {
      field: "Action",
      minWidth: 350, maxWidth: 400,
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editRoles(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteMission(e, params)}
                className="action_button del_btn"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ]);
  const [editObjRoles, setEditObjRoles] = useState({});
  const editRoles = (e, params) => {
    let data = params.data;
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "edit";
    roleAddEditModalPropsTemp["headerText"] = "Edit Mission";
    roleAddEditModalPropsTemp["submitButtonText"] = "Update";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setEditObjRoles(data);
    let formDataTemp = { ...formData };

    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["description"] = data.description;
    if (data.startAt) {
      setStartDate(new Date(data.startAt));
    }
    formDataTemp["endAt"] = data.endAt;
    if (data.endAt) {
      setStartDate(new Date(data.endAt));
    }
    formDataTemp["endAt"] = data.endAt;
    if (data.status) {
      formDataTemp["status"] = {
        label: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        value: data.status
      }
    } else {
      formDataTemp["status"] = {}
    }
    if (data.environment) {
      formDataTemp["environment"] = {
        label: data.environment.name,
        value: data.environment.id
      }
    } else {
      formDataTemp["environment"] = {}
    }

    if (data.scenario) {
      formDataTemp["scenario"] = {
        label: data.scenario.name,
        value: data.scenario.id
      }
    } else {
      formDataTemp["scenario"] = {}
    }

    if (data.department) {
      formDataTemp["department"] = {
        label: data.department.name,
        value: data.department.id
      }
    } else {
      formDataTemp["department"] = {}
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
        `${baseUrL}/clients/missions/destroy/${roleID}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowAdminModal(false);
        resetDataGrid();
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
    if (gridApi && datasource) {
      gridApi.setDatasource(datasource);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: {},
    environment: {},
    scenario: {},
    department: {},
    startAt: "",
    endAt: ""
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    description: "",
    status: "",
    environment: {},
    scenario: {},
    department: {},
    startAt: "",
    endAt: "",
  });
  const handleChangeStatus = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["status"] = event;
    setFormData(formDataTemp)

    let formDataErrorTemp = { ...formDataError }
    if (Object.keys(event).length === 0) {
      formDataErrorTemp["status"] = "Status is required";
    } else {
      formDataErrorTemp["status"] = "";
    }
    setFormDataError(formDataErrorTemp);
  }
  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    // if (formData.description === "") {
    //   isValid = false;
    //   formDataErrorTemp.description = "description is required";
    // }

    if (formData.startAt === "") {
      isValid = false;
      formDataErrorTemp.startAt = "StartAt is required";
    }
    if (formData.endAt === "") {
      isValid = false;
      formDataErrorTemp.endAt = "endAt is required";
    }

    if (Object.keys(formData.environment).length === 0) {
      isValid = false;
      formDataErrorTemp.environment = "Environment is required";
    }

    if (Object.keys(formData.scenario).length === 0) {
      isValid = false;
      formDataErrorTemp.scenario = "Scenario is required";
    }

    if (Object.keys(formData.department).length === 0) {
      isValid = false;
      formDataErrorTemp.department = "Department is required";
    }

    if (Object.keys(formData.status).length === 0) {
      isValid = false;
      formDataErrorTemp.status = "Status is required";
    }

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

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const formatData = () => {
    let data = {};
    data["name"] = formData.name;
    data["description"] = formData.description;
    data["startAt"] = startDate ? format(startDate, "yyyy-MM-dd") : "";
    data["endAt"] = endDate ? format(endOfDay(endDate), "yyyy-MM-dd") : "";
    data["status"] = formData.status.value;
    data["environmentId"] = formData.environment.value;
    data["scenarioId"] = formData.scenario.value;
    data["departmentId"] = formData.department.value;

    return data;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      let data;
      data = formatData();
      if (roleAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/clients/missions/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/clients/missions/update/${formData.id}`;
        method = "put";
      }
      addEditPostData(url, data, method);
    }
  };

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
      loaderStateFalse();
      closeModal();
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
      return response;
    } catch (error) {
      loaderStateFalse();
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
        if (error.response.status === 401) {
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
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "add";
    roleAddEditModalPropsTemp["headerText"] = "Add Mission";
    roleAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setShowModal(true);
  };
  const onCellClicked = (event) => {
    if (event.column.colId !== "Action") {
      navigate(`/mission-details/${event.data.id}`);
    }
  };
  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setDatasource(datasource);
    }
  }, [filterActive]);
  useEffect(() => {
    if (isActive != undefined || isActive != null) {
      setFilterActive(true);
    }
    resetDataGrid();
  }, [filterActive]);
  const onFilterChange = (checked) => {
    setFilterActive(checked)
    setToggleStatus(checked)
    if (!checked) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete('status');
      navigate(`?${currentParams.toString()}`, { replace: true });
    }
    if (gridApiRef.current) {
      gridApiRef.current.setDatasource(datasource);
    }

  }
  console.log("fetchenvironmentDataaaa", environmentOptions);
  console.log("fetchScenarioDataaaa", scenarioOptions);
  console.log("fetchdEpartmenttttDataaaa", departmentOptions);

  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} />
          <span className="icn_bk_btn"><img src={mission_img} /></span>
          <h3>Missions</h3>
        </div>
        <div className="switch_button">
          <Switch
            onChange={onFilterChange}
            checked={filterActive}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            // uncheckedIcon={false}
            // checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: "12px",
                  color: "white",
                  paddingRight: "10px",
                  paddingTop: "2px",
                }}
              >
                All
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "white",
                  paddingTop: "2px",
                  paddingRight: 0,
                  paddingLeft: 5,
                }}
              >
                <i className="fa-regular fa-clock"></i>
              </div>
            }
            checkedHandleIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "#FFF",
                }}
              ></div>
            }
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "#FFF",
                }}
              ></div>
            }
          />
          <Button className="tablemodal_btn" onClick={addMission}>
            <FontAwesomeIcon icon={faUserPlus} />
            Add Mission
          </Button>
        </div>
      </div>
      <MissionAddEdit
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
        environmentOptions={environmentOptions}
        departmentoptions={departmentOptions}
        handleChangeScenario={handleChangeScenario}
        handleChangeEnvironment={handleChangeEnvironment}
        handleChangeDepartment={handleChangeDepartment}
        statusOptions={statusOptions}
        handleChangeStatus={handleChangeStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this Mission"}
        headerText={"Delete?"}
      />
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
        // onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};
export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(Missions));
