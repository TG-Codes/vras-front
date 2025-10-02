import React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
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
import Button from "../../../../utility/components/Button";
import client_img from "../../../../utility/assets/images/client.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
import ApproveModal from "../../../../utility/components/admin/ApproveModal";
import InfoModal from "../../../../utility/components/admin/InfoModal";
import testImg from "../../../../utility/assets/images/jadon-kelly-Qo_2hhoqC3k-unsplash.jpg";
import SessionsAddEdit from "../../../../utility/components/clients/SessionsAddEdit";
import BackButton from "../../../../utility/components/BackButton";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Sessions = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse } = props;
  const [permissions, setPermissions] = useState([]);
  const filteredPermission = permissions.filter((item)=>{
      return item.module==="session" && item.type==="write"
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
  const [sessionID, setSessionID] = useState("");
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
  const columnDefs = [
    { field: "name" },
    { field: "sessionType" },
    { field: "outcome" },
    { field: "score" },
    { field: "timeOfDay" },
    { field: "location" },
    { field: "participants" },
    { field: "notes" },
    { field: "sessionRecording" },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <>
              {userData.role === "client" && (
                <div>
                  <Button
                    onClick={(e) => editSession(e, params)}
                    className="action_button edt_btn"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    onClick={(e) => deleteSession(e, params)}
                    className="action_button del_btn"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              )}

              {userData.role === "user" && filteredPermission.length>0 &&(
                <div>
                    <>
                      <Button
                        onClick={(e) => editSession(e, params)}
                        className="action_button edt_btn"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        onClick={(e) => deleteSession(e, params)}
                        className="action_button del_btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </>
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

  const [editObjSession, setEditObjSession] = useState({});
  const editSession = (e, params) => {
    let data = params.data;
    const date = new Date(data.startAt);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = date.toLocaleString("en-US", options);
    let sessionAddEditModalPropsTemp = { ...sessionAddEditModalProps };
    sessionAddEditModalPropsTemp["formType"] = "edit";
    sessionAddEditModalPropsTemp["headerText"] = "Edit Sessions";
    sessionAddEditModalPropsTemp["submitButtonText"] = "Update";
    setSessionAddEditModalProps(sessionAddEditModalPropsTemp);
    setEditObjSession(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["userId"] = data["userId"];
    formDataTemp["sessionType"] = data["sessionType"];
    formDataTemp["name"] = data["name"];
    formDataTemp["startAt"] = formattedDate;
    formDataTemp["endAt"] = data["endAt"];
    formDataTemp["outcome"] = data["outcome"];
    formDataTemp["score"] = data["score"];
    formDataTemp["timeOfDay"] = data["timeOfDay"];
    formDataTemp["location"] = data["location"];
    formDataTemp["participants"] = data["participants"];
    formDataTemp["notes"] = data["notes"];
    formDataTemp["sessionRecording"] = data["sessionRecording"];

    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteSession = async (e, params) => {
    const sessionID = params?.data.id;
    setShowAdminModal(true);
    setSessionID(sessionID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/sessions/destroy/${sessionID}`,
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
          position: "bottom-right",
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
      console.error("Error deleting Session:", error);
      loaderStateFalse();
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      userId: "",
      sessionType: "",
      name: "",
      startAt: "",
      endAt: "",
      outcome: "",
      score: "",
      timeOfDay: "",
      location: "",
      participants: "",
      notes: "",
      sessionRecording: "",
    });
    setFormDataError({
      userId: "",
      sessionType: "",
      name: "",
      startAt: "",
      endAt: "",
      outcome: "",
      score: "",
      timeOfDay: "",
      location: "",
      participants: "",
      notes: "",
      sessionRecording: "",
    });
    setSessionAddEditModalProps({});
    setEditObjSession({});
  };

  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };

  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    sessionType: "",
    name: "",
    startAt: "",
    endAt: "",
    outcome: "",
    score: "",
    timeOfDay: "",
    location: "",
    participants: "",
    notes: "",
    sessionRecording: "",
  });

  const [formDataError, setFormDataError] = useState({
    userId: "",
    sessionType: "",
    name: "",
    startAt: "",
    endAt: "",
    outcome: "",
    score: "",
    timeOfDay: "",
    location: "",
    participants: "",
    notes: "",
    sessionRecording: "",
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = { ...formDataError };

    // if (formData.userId === "") {
    //   isValid = false;
    //   formDataErrorTemp.userId = "User ID is required";
    // }

    if (formData.sessionType === "") {
      isValid = false;
      formDataErrorTemp.sessionType = "Session Type is required";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.sessionType)) {
      isValid = false;
      formDataErrorTemp.sessionType =
        "Session Type can only contain alphanumeric characters and spaces";
    }

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

    // if (formData.startAt === "") {
    //   isValid = false;
    //   formDataErrorTemp.startAt = "Start time is required";
    // }

    // if (formData.endAt === "") {
    //   isValid = false;
    //   formDataErrorTemp.endAt = "End time is required";
    // }

    // if (formData.outcome === "") {
    //   isValid = false;
    //   formDataErrorTemp.outcome = "Outcome is required";
    // }

    // if (formData.score === "") {
    //   isValid = false;
    //   formDataErrorTemp.score = "Score is required";
    // }
    if (!/^\d+\.\d{2}$/.test(formData.score) && formData.score !== "") {
      isValid = false;
      formDataErrorTemp.score =
        "Score must be a decimal number with up to two decimal places";
    }

    // if (formData.timeOfDay === "") {
    //   isValid = false;
    //   formDataErrorTemp.timeOfDay = "Time of Day is required";
    // }
    if (
      !/^[a-zA-Z0-9\s]+$/.test(formData.timeOfDay) &&
      formData.timeOfDay !== ""
    ) {
      isValid = false;
      formDataErrorTemp.timeOfDay =
        "Time of day can only contain alphanumeric characters and spaces";
    }

    // if (formData.location === "") {
    //   isValid = false;
    //   formDataErrorTemp.location = "Location is required";
    // }
    if (
      !/^[a-zA-Z0-9\s]+$/.test(formData.location) &&
      formData.location !== ""
    ) {
      isValid = false;
      formDataErrorTemp.location =
        "Location can only contain alphanumeric characters and spaces";
    }

    // if (formData.participants === "") {
    //   isValid = false;
    //   formDataErrorTemp.participants = "Participants are required";
    // }

    // if (formData.notes === "") {
    //   isValid = false;
    //   formDataErrorTemp.notes = "Notes are required";
    // }

    // if (formData.sessionRecording === "") {
    //   isValid = false;
    //   formDataErrorTemp.sessionRecording = "Session Recording is required";
    // }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };

    formDataTemp[name] = value;

    // if (name === "userId") {
    //   formDataErrorTemp.userId = value === "" ? "userId Type is required" : "";
    // }

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

    // if (name === "sessionType") {
    //   formDataErrorTemp.sessionType =
    //     value === "" ? "sessionType is required" : "";
    // }
    if (name === "sessionType") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.sessionType =
          "Session Type should not contain special characters";
      } else {
        formDataErrorTemp.sessionType = "";
      }
    }

    // if (name === "startAt") {
    //   formDataErrorTemp.startAt = value === "" ? "startAt is required" : "";
    // }

    // if (name === "endAt") {
    //   formDataErrorTemp.endAt = value === "" ? "endAt is required" : "";
    // }

    // if (name === "outcome") {
    //   formDataErrorTemp.outcome =
    //     value === "" ? "outcome Above Ground is required" : "";
    // }

    // if (name === "score") {
    //   formDataErrorTemp.score = value === "" ? "score is required" : "";
    // }
    if (name === "score") {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        formDataErrorTemp.score = "Score must have decimal value";
      } else {
        formDataErrorTemp.score = "";
      }
    }

    // if (name === "timeOfDay") {
    //   formDataErrorTemp.timeOfDay = value === "" ? "timeOfDay is required" : "";
    // }
    if (name === "timeOfDay") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.timeOfDay =
          "Time of day should not contain special characters";
      } else {
        formDataErrorTemp.timeOfDay = "";
      }
    }

    // if (name === "location") {
    //   formDataErrorTemp.location = value === "" ? "location is required" : "";
    // }
    if (name === "location") {
      if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.location =
          "Location should not contain special characters";
      } else {
        formDataErrorTemp.location = "";
      }
    }

    // if (name === "participants") {
    //   formDataErrorTemp.participants =
    //     value === "" ? "participants is required" : "";
    // }

    // if (name === "notes") {
    //   formDataErrorTemp.notes = value === "" ? "notes are required" : "";
    // }

    // if (name === "sessionRecording") {
    //   formDataErrorTemp.sessionRecording =
    //     value === "" ? "sessionRecording is required" : "";
    // }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const [selectedValue, setSelectedValue] = useState("success");
  const outcomeValue = ["success", "failure"];
  const formatData = () => {
    let data = {};
    data["userId"] = userData.id;
    data["sessionType"] = formData.sessionType;
    data["name"] = formData.name;
    data["startAt"] = startDateString;
    data["endAt"] = endDateString;
    data["outcome"] = selectedValue;
    data["score"] = formData.score;
    data["timeOfDay"] = formData.timeOfDay;
    data["location"] = formData.location;
    data["participants"] = formData.participants;
    data["notes"] = formData.notes;
    data["sessionRecording"] = formData.sessionRecording;

    return data;
  };

  // const handleChangeSubscription = (event) => {
  //   console.log("event", event);
  //   let formDataTemp = { ...formData }
  //   formDataTemp["subscriptionId"] = event
  //   setFormData(formDataTemp);

  // }

  const handleSubmit = async () => {
    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (sessionAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/sessions/store`;
        method = "post";
      } else {
        // let { password, confirmPassword, ...newObj } = formatData();
        data = formatData();
        url = `${baseUrL}/sessions/update/${formData.id}`;
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

  const deleteButton = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedRows = selectedNodes.map((node) => node.data.id);
  };
  const [sessionAddEditModalProps, setSessionAddEditModalProps] = useState({});
  const addSession = () => {
    let sessionAddEditModalPropsTemp = { ...sessionAddEditModalProps };
    sessionAddEditModalPropsTemp["formType"] = "add";
    sessionAddEditModalPropsTemp["headerText"] = "Add Sessions";
    sessionAddEditModalPropsTemp["submitButtonText"] = "Add";
    setSessionAddEditModalProps(sessionAddEditModalPropsTemp);
    setShowModal(true);
  };

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/sessions?`;
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
            params.successCallback(
              response.data.data.sessions,
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

  const gridOptions = useMemo(
    () => ({
      infiniteInitialRowCount: 1,
      rowBuffer: 0,
      rowModelType: "infinite",
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
    }),
    []
  );
  const [defaultColDef, setdefaultColDef] = useState({
    flex: 1,
    minWidth: 50,
  });
  const [startDate, setStartDate] = useState(new Date());

  // Format the date as yyyy-mm-dd
  const startDateString = startDate.toISOString().split("T")[0];

  const [endDate, setEndDate] = useState(new Date());

  // Format the date as yyyy-mm-dd
  const endDateString = endDate.toISOString().split("T")[0];

  // useEffect(() => {
  //   if (!endDate) {

  //     const nextDay = new Date(startDate);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     setEndDate(nextDay);
  //   }
  // }, [startDate, endDate]);
  const rowHeight = 70;
  const headerHeight = 60;
  return (
    <>
      <div className="globaltable_holder">
        {userData.role === "client" && (
          <div className="table_modal_open">
          <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={client_img}/></span>
             <h3>Session</h3>
            </div>

            <Button className="tablemodal_btn" onClick={addSession}>
              <FontAwesomeIcon icon={faPlus} /> Add Session
            </Button>
          </div>
        )}

        {userData.role === "user" &&
          filteredPermission.length>0 && (
            <div className="table_modal_open">
               <h3>Session</h3>
              <Button className="tablemodal_btn" onClick={addSession}>
              <FontAwesomeIcon icon={faPlus} /> Add Session
              </Button>
            </div>
          )}

        <SessionsAddEdit
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
          outcomeValue={outcomeValue}
        />
        <ConfirmationAlert
          showAdminModal={showAdminModal}
          closeConfirmationAlert={closeConfirmationAlert}
          confirm={confrim}
          confirmationText={"delete this session"}
          headerText={"Delete?"}
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
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  Sessions
);
