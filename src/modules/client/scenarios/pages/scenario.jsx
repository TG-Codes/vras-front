import React, { useEffect } from "react";
import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
import UsersAddEdit from "../../../../utility/components/clients/UsersAddEdit";
import { toast, Bounce } from "react-toastify";
import ScenarioAddEdit from "../../../../utility/components/clients/ScenarioAddEdit";
import SessionsAddEdit from "../../../../utility/components/clients/SessionsAddEdit";

const baseUrL = process.env.REACT_APP_BASE_URL;

const Scenario = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse } = props;
  const [permissions, setPermissions] = useState([]);
  const filteredPermission = permissions.filter((item)=>{
    return item.module==="scenario" && item.type==="write"
})
  useEffect(() => {
    if (
      userData.role === "user" &&
      typeof userData.permissions === "string" &&
      userData.permissions !== "{}"
    ) {
      setPermissions(JSON.parse(userData.permissions));
    }
  }, []);
  const authToken = userData.token;
  const [userID, setUserID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  const [sessionData, setSessionData] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      clientId: "",
      sessionId: {},
      scenarioType: "",
      name: "",
      environment: "",
      location: "",
      timeLimit: "",
      difficulty: "",
      objective: "",
      description: "",
      hazards: "",
      challenges: "",
      requiredSkills: "",
      rewards: "",
    });
    setFormDataError({
      clientId: "",
      sessionId: {},
      scenarioType: "",
      name: "",
      environment: "",
      location: "",
      timeLimit: "",
      difficulty: "",
      objective: "",
      description: "",
      hazards: "",
      challenges: "",
      requiredSkills: "",
      rewards: "",
    });
  };
  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };
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
  const columnDefs = [
    { field: "clientId" },
    { field: "sessionId" },
    { field: "scenarioType" },
    { field: "name" },
    { field: "environment" },
    { field: "location" },
    // { field: "password" },
    { field: "timeLimit" },
    { field: "dificulty" },
    { field: "objective" },
    { field: "description" },
    { field: "hazards" },
    { field: "challanges" },
    { field: "requiredSkills" },
    { field: "rewards" },
    // { field: "confirmPassword" },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <>
              {userData.role === "client" && (
                <div>
                  <button
                    onClick={(e) => editUsers(e, params)}
                    className="action_button edt_btn"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={(e) => deleteUsers(e, params)}
                    className="action_button del_btn"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}

              {userData.role === "user" &&
                filteredPermission.length>0 && (
                  <>
                    <button
                      onClick={(e) => editUsers(e, params)}
                      className="action_button edt_btn"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={(e) => deleteUsers(e, params)}
                      className="action_button del_btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
            </>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/scenarios?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        url += `_start=${startRow}&_end=${endRow}`;
        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            params.successCallback(
              response.data.data.scenarios,
              parseInt(response.data.data.total)
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
  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });
  const deleteUsers = async (e, params) => {
    const userID = params?.data.id;
    setShowAdminModal(true);
    setUserID(userID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/scenarios/destroy/${userID}`,
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
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      loaderStateFalse();
    }
  };
  const [editObjUser, setEditObjUser] = useState({});
  const editUsers = (e, params) => {
    fetchSessionData();
    let data = params.data;
    let userAddEditModalPropsTemp = { ...userAddEditModalProps };
    userAddEditModalPropsTemp["formType"] = "edit";
    userAddEditModalPropsTemp["headerText"] = "Edit Scenario";
    userAddEditModalPropsTemp["submitButtonText"] = "Update";
    setUserAddEditModalProps(userAddEditModalPropsTemp);
    setEditObjUser(data);

    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["clientId"] = data.clientId;
    // formDataTemp["sessionId"] = data.sessionId;
    formDataTemp["scenarioType"] = data.scenarioType;
    formDataTemp["environment"] = data.environment;
    formDataTemp["location"] = data.location;
    formDataTemp["timeLimit"] = data.timeLimit;
    formDataTemp["difficulty"] = data.difficulty;
    formDataTemp["objective"] = data.objective;
    formDataTemp["description"] = data.description;
    formDataTemp["hazards"] = data.hazards;
    formDataTemp["challenges"] = data.challenges;
    formDataTemp["requiredSkills"] = data.requiredSkills;
    formDataTemp["rewards"] = data.rewards;
    if (data.session) {
      let session = {
        label: data.session.name,
        value: data.session.id,
      };
      formDataTemp["sessionId"] = session;
    }

    setFormData(formDataTemp);
    setShowModal(true);
  };
  const [userAddEditModalProps, setUserAddEditModalProps] = useState({});
  const addUser = () => {
    fetchSessionData();
    let userAddEditModalPropsTemp = { ...userAddEditModalProps };
    userAddEditModalPropsTemp["formType"] = "add";
    userAddEditModalPropsTemp["headerText"] = "Add Scenario";
    userAddEditModalPropsTemp["submitButtonText"] = "Add";
    setUserAddEditModalProps(userAddEditModalPropsTemp);
    setShowModal(true);
  };
  const [formData, setFormData] = useState({
    id: "",
    clientId: "",
    sessionId: {},
    scenarioType: "",
    name: "",
    environment: "",
    location: "",
    timeLimit: "",
    difficulty: "",
    objective: "",
    description: "",
    hazards: "",
    challenges: "",
    requiredSkills: "",
    rewards: "",
  });

  const [formDataError, setFormDataError] = useState({
    clientId: "",
    sessionId: {},
    scenarioType: "",
    name: "",
    environment: "",
    location: "",
    timeLimit: "",
    difficulty: "",
    objective: "",
    description: "",
    hazards: "",
    challenges: "",
    requiredSkills: "",
    rewards: "",
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    } else if (/\d/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name = "Name cannot contain numbers";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name =
        "Name can only contain alphanumeric characters and spaces";
    }
    if (Object.keys(formData.sessionId).length === 0) {
      isValid = false;
      formDataErrorTemp.sessionId = "Session Id is required";
    }
    if (formData.scenarioType === "") {
      isValid = false;
      formDataErrorTemp.scenarioType = "scenarioType is required";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.scenarioType)) {
      isValid = false;
      formDataErrorTemp.scenarioType =
        "Scenario Type can only contain alphanumeric characters and spaces";
    }

    // if (formData.environment === "") {
    //   isValid = false;
    //   formDataErrorTemp.environment = "environment is required";
    // }
    if (
      !/^[a-zA-Z0-9\s]+$/.test(formData.environment) &&
      formData.environment !== ""
    ) {
      isValid = false;
      formDataErrorTemp.environment =
        "Environment can only contain alphanumeric characters and spaces";
    }

    // if (formData.location === "") {
    //   isValid = false;
    //   formDataErrorTemp.location = "location is required";
    // }
    if (
      !/^[a-zA-Z0-9\s]+$/.test(formData.location) &&
      formData.location !== ""
    ) {
      isValid = false;
      formDataErrorTemp.location =
        "Location can only contain alphanumeric characters and spaces";
    }

    // if (formData.timeLimit === "") {
    //   isValid = false;
    //   formDataErrorTemp.timeLimit = "timeLimit is required";
    // }
    if (
      !/^[a-zA-Z0-9\s]+$/.test(formData.timeLimit) &&
      formData.timeLimit !== ""
    ) {
      isValid = false;
      formDataErrorTemp.timeLimit =
        "Time limit can only contain alphanumeric characters and spaces";
    }
    // if (formData.difficulty === "") {
    //   isValid = false;
    //   formDataErrorTemp.difficulty = "difficulty is required";
    // }
    // if (formData.objective === "") {
    //   isValid = false;
    //   formDataErrorTemp.objective = "objective is required";
    // }
    // if (formData.description === "") {
    //   isValid = false;
    //   formDataErrorTemp.description = "description is required";
    // }
    // if (formData.hazards === "") {
    //   isValid = false;
    //   formDataErrorTemp.hazards = "hazards is required";
    // }
    // if (formData.challenges === "") {
    //   isValid = false;
    //   formDataErrorTemp.challenges = "challenges is required";
    // }

    // if (formData.requiredSkills === "") {
    //   isValid = false;
    //   formDataErrorTemp.requiredSkills = "requiredSkills is required";
    // }
    // if (formData.rewards === "") {
    //   isValid = false;
    //   formDataErrorTemp.rewards = "rewards is required";
    // }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "name is required";
      } else if (/\d/.test(value)) {
        formDataErrorTemp.name = "Name cannot contain numbers";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataErrorTemp.name = "";
      }
    }

    // if (name === "clientId") {
    //   if (value == "") {
    //     formDataErrorTemp.clientId = "clientId is required";
    //   } else {
    //     formDataErrorTemp.clientId = "";
    //   }
    // }

    // if (name === "sessionId") {
    //   if (value == "") {
    //     formDataErrorTemp.sessionId = "sessionId is required";
    //   } else {
    //     formDataErrorTemp.sessionId = "";
    //   }
    // }
    if (name === "sessionId") {
      if (Object.keys(value).length === 0) {
        formDataErrorTemp.sessionId = "Session Id is required";
      } else {
        formDataErrorTemp.sessionId = "";
      }
    }

    if (name === "scenarioType") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.scenarioType =
          "Scenario Type should not contain special characters";
      } else {
        formDataErrorTemp.scenarioType = "";
      }
    }

    if (name === "environment") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.environment =
          "Environment should not contain special characters";
      } else {
        formDataErrorTemp.environment = "";
      }
    }

    if (name === "location") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.location =
          "Location should not contain special characters";
      } else {
        formDataErrorTemp.location = "";
      }
    }

    if (name === "timeLimit") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.timeLimit =
          "Time Limit should not contain special characters";
      } else {
        formDataErrorTemp.timeLimit = "";
      }
    }

    // if (name === "difficulty") {
    //   if (value == "") {
    //     formDataErrorTemp.difficulty = "difficulty is required";
    //   } else {
    //     formDataErrorTemp.difficulty = "";
    //   }
    // }

    // if (name === "objective") {
    //   if (value == "") {
    //     formDataErrorTemp.objective = "objective is required";
    //   } else {
    //     formDataErrorTemp.objective = "";
    //   }
    // }

    // if (name === "description") {
    //   if (value == "") {
    //     formDataErrorTemp.description = "description is required";
    //   } else {
    //     formDataErrorTemp.description = "";
    //   }
    // }

    // if (name === "hazards") {
    //   if (value == "") {
    //     formDataErrorTemp.hazards = "hazards is required";
    //   } else {
    //     formDataErrorTemp.hazards = "";
    //   }
    // }

    // if (name === "challenges") {
    //   if (value == "") {
    //     formDataErrorTemp.challenges = "challenges is required";
    //   } else {
    //     formDataErrorTemp.challenges = "";
    //   }
    // }

    // if (name === "requiredSkills") {
    //   if (value == "") {
    //     formDataErrorTemp.requiredSkills = "requiredSkills is required";
    //   } else {
    //     formDataErrorTemp.requiredSkills = "";
    //   }
    // }

    // if (name === "rewards") {
    //   if (value == "") {
    //     formDataErrorTemp.rewards = "rewards is required";
    //   } else {
    //     formDataErrorTemp.rewards = "";
    //   }
    // }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const [selectedValue, setSelectedValue] = useState("female");
  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const fetchSessionData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/sessions`, {
        headers: {
          Authorization: authToken,
        },
      });
      if (response.data.success) {
        if (response.data.data.sessions.length > 0) {
          let sessionArr = [];
          response.data.data.sessions.map((item, index) => {
            let _hash = {};
            _hash["label"] = item.name;
            _hash["value"] = item.id;
            sessionArr.push(_hash);
          });
          setSessionData(sessionArr);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleChangeSession = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["sessionId"] = event;
    setFormData(formDataTemp);
    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp.sessionId = "Session Id is required";
    } else {
      formDataErrorTemp.sessionId = "";
    }
    setFormDataError(formDataErrorTemp);
  };
  const formatData = () => {
    let passowrd = generateRandomPassword(12);
    let data = {};
    data["name"] = formData.name;
    data["clientId"] = userData.clientId;
    data["sessionId"] = formData.sessionId.value;
    data["scenarioType"] = formData.scenarioType;
    data["environment"] = formData.environment;
    data["location"] = formData.location;
    data["timeLimit"] = formData.timeLimit;
    data["difficulty"] = formData.difficulty;
    data["objective"] = formData.objective;
    data["description"] = formData.description;
    data["hazards"] = formData.hazards;
    data["challenges"] = formData.challenges;
    data["requiredSkills"] = formData.requiredSkills;
    data["rewards"] = formData.rewards;

    return data;
  };
  const handleSubmit = async () => {
    if (validateForm(userAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;
      if (userAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/scenarios/store`;
        method = "post";
      } else {
        let { password, confirmPassword, ...newObj } = formatData();
        data = newObj;
        url = `${baseUrL}/scenarios/update/${formData.id}`;
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
      closeModal();
      loaderStateFalse();
      resetDataGrid();
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
  const rowHeight = 70;
  const headerHeight = 60;
  return (
    <div>
      <div className="globaltable_holder">
        {/* {permissions.some(permission => (
              permission.label === "Scenario"
            )) &&
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={addUser}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>} */}
        {userData.role === "client" && (
          <div className="table_modal_open">
            <h3>Scenario</h3>
            <button className="tablemodal_btn" onClick={addUser}>
              <FontAwesomeIcon icon={faPlus} /> Add Scenario
            </button>
          </div>
        )}

        {userData.role === "user" &&
          filteredPermission.length>0 && (
            <div className="table_modal_open">
              <h3>Scenario</h3>
              <button className="tablemodal_btn" onClick={addUser}>
                <FontAwesomeIcon icon={faPlus} /> Add Scenario
              </button>
            </div>
          )}

        <ConfirmationAlert
          showAdminModal={showAdminModal}
          closeConfirmationAlert={closeConfirmationAlert}
          confirm={confrim}
          confirmationText={"delete this scenario?"}
          headerText={"Delete?"}
        />
        <ScenarioAddEdit
          showModal={showModal}
          closeModal={closeModal}
          formData={formData}
          formDataError={formDataError}
          headerText={userAddEditModalProps.headerText}
          submitButtonText={userAddEditModalProps.submitButtonText}
          formType={userAddEditModalProps.formType}
          setEditObjUser={setEditObjUser}
          handleInputChange={handleInputChange}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          sessionData={sessionData}
          handleChangeSession={handleChangeSession}
          // value1={"male"}
          // value2={"female"}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
        />
        <div
          className="ag-theme-alpine"
          style={{ height: "calc(100vh - 320px)" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowModelType="infinite"
            onGridReady={onGridReady}
            components={components}
            cacheBlockSize={10}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  Scenario
);
// export default Scenario
