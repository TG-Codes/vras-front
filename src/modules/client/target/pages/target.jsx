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
import WeaponsAddEdit from "../../../../utility/components/admin/WeaponsAddEdit";
import TargetAddEdit from "../../../../utility/components/clients/TargetAddEdit";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Target = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse } = props;
  const [permissions, setPermissions]=useState([])
  const filteredPermission = permissions.filter((item)=>{
    return item.module==="target" && item.type==="write"
  })
  console.log("filteredTarget", filteredPermission)
  useEffect(() => {
    if (userData.role === "user" && typeof userData.permissions === "string" && userData.permissions !== "{}") {
      setPermissions(JSON.parse(userData.permissions));
    }
  }, []);
  const authToken = userData.token;
  const [clientID, setClientID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  // const [subscriptionData, setSubscriptionData] = useState([]);
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

  const columnDefs =[
    // {
    //   headerName: "Select",
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 50,
    // },
    { field: "name" },
    { field: "description" },
    { field: "location" },
    { field: "longitude" },
    { field: "heightAboveGround" },
    { field: "difficulty" },
    { field: "health" },
    { field: "size" },
    { field: "behavior" },
    { field: "weaknesses" },
    { field: "armament" },
    { field: "armor" },
    { field: "vulnerability" },
    { field: "movementPattern" },
    { field: "visualAppearance" },
    { field: "soundAppearance" },
    { field: "threatLevel" },
    { field: "notes" },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <>
              {userData.role === "client" && (
                <div>
                  <React.Fragment>
                    <Button
                      onClick={(e) => editTarget(e, params)}
                      className="action_button edt_btn"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      onClick={(e) => deleteClient(e, params)}
                      className="action_button del_btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </React.Fragment>
                  {/* <button onClick={(e) => permissionInfo(e, params)}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button> */}
                </div>
              )}
    
              {userData.role === "user" && (
                <div>
                  {filteredPermission.length>0 && (
                    <React.Fragment>
                      <Button
                        onClick={(e) => editTarget(e, params)}
                        className="action_button edt_btn"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        onClick={(e) => deleteClient(e, params)}
                        className="action_button del_btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </React.Fragment>
                  )}
                  {/* <button onClick={(e) => permissionInfo(e, params)}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button> */}
                </div>
              )}
            </>
          );
        } else {
          return null;
        }
      },
    }
    ,
  ];

  const [editObjClient, setEditObjClient] = useState({});
  const editTarget = (e, params) => {
    let data = params.data;
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "edit";
    clientAddEditModalPropsTemp["headerText"] = "Edit Target";
    clientAddEditModalPropsTemp["submitButtonText"] = "Update";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setEditObjClient(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["targetType"] = data.targetType;
    formDataTemp["name"] = data.name;
    formDataTemp["description"] = data.description;
    formDataTemp["location"] = data.location;
    formDataTemp["longitude"] = data.longitude;
    formDataTemp["heightAboveGround"] = data.heightAboveGround;
    formDataTemp["difficulty"] = data.difficulty;
    formDataTemp["health"] = data.health;
    formDataTemp["size"] = data.size;
    formDataTemp["behavior"] = data.behavior;
    formDataTemp["weaknesses"] = data.weaknesses;
    formDataTemp["armament"] = data.armament;
    formDataTemp["armor"] = data.armor;
    formDataTemp["vulnerability"] = data.vulnerability;
    formDataTemp["movementPattern"] = data.movementPattern;
    formDataTemp["visualAppearance"] = data.visualAppearance;
    formDataTemp["soundAppearance"] = data.soundAppearance;
    formDataTemp["threatLevel"] = data.threatLevel;
    formDataTemp["notes"] = data.notes;

    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteClient = async (e, params) => {
    const clientId = params?.data.id;
    setShowAdminModal(true);
    setClientID(clientId);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/targets/destroy/${clientID}`,
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
      console.error("Error deleting client:", error);
      loaderStateFalse();
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      targetType: "",
      name: "",
      description: "",
      location: "",
      longitude: "",
      heightAboveGround: "",
      difficulty: "",
      health: "",
      size: "",
      behavior: "",
      weaknesses: "",
      armament: "",
      armor: "",
      vulnerability: "",
      movementPattern: "",
      visualAppearance: "",
      soundAppearance: "",
      threatLevel: "",
      notes: "",
    });
    setFormDataError({
      name: "",
      targetType: "",
      description: "",
      location: "",
      longitude: "",
      heightAboveGround: "",
      difficulty: "",
      health: "",
      size: "",
      behavior: "",
      weaknesses: "",
      armament: "",
      armor: "",
      vulnerability: "",
      movementPattern: "",
      visualAppearance: "",
      soundAppearance: "",
      threatLevel: "",
      notes: "",
    });
    setClientAddEditModalProps({});
    setEditObjClient({});
  };

  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };

  const [formData, setFormData] = useState({
    id: "",
    targetType: "",
    name: "",
    description: "",
    location: "",
    longitude: "",
    heightAboveGround: "",
    difficulty: "",
    health: "",
    size: "",
    behavior: "",
    weaknesses: "",
    armament: "",
    armor: "",
    vulnerability: "",
    movementPattern: "",
    visualAppearance: "",
    soundAppearance: "",
    threatLevel: "",
    notes: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    targetType: "",
    description: "",
    location: "",
    longitude: "",
    heightAboveGround: "",
    difficulty: "",
    health: "",
    size: "",
    behavior: "",
    weaknesses: "",
    armament: "",
    armor: "",
    vulnerability: "",
    movementPattern: "",
    visualAppearance: "",
    soundAppearance: "",
    threatLevel: "",
    notes: "",
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = { ...formDataError };

    if (formData.targetType === "") {
      isValid = false;
      formDataErrorTemp.targetType = "Target Type is required";
    }else if (!/^[a-zA-Z0-9\s]+$/.test(formData.targetType)) {
      isValid = false;
      formDataErrorTemp.targetType = "Target Type can only contain alphanumeric characters and spaces";
    }

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    } else if (/\d/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name = "Name cannot contain numbers";
    }else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name = "Name can only contain alphanumeric characters and spaces";
    }

    if (formData.description === "") {
      isValid = false;
      formDataErrorTemp.description = "Description is required";
    }

    // if (formData.location === "") {
    //   isValid = false;
    //   formDataErrorTemp.location = "Location is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.location) && formData.location!=="") {
      isValid = false;
      formDataErrorTemp.location = "Location can only contain alphanumeric characters and spaces";
    }

    // if (formData.longitude === "") {
    //   isValid = false;
    //   formDataErrorTemp.longitude = "Longitude is required";
    // }
    if (!/^\d+\.\d{2}$/.test(formData.longitude) && formData.longitude !== "") {
      isValid = false;
      formDataErrorTemp.longitude = "Longitude must be a decimal number with up to two decimal places";
    }
    

    // if (formData.heightAboveGround === "") {
    //   isValid = false;
    //   formDataErrorTemp.heightAboveGround = "Height Above Ground is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.heightAboveGround) && formData.location!=="") {
      isValid = false;
      formDataErrorTemp.heightAboveGround = "Height above ground can only contain alphanumeric characters and spaces";
    }

    // if (formData.difficulty === "") {
    //   isValid = false;
    //   formDataErrorTemp.difficulty = "Difficulty is required";
    // }

    // if (formData.health === "") {
    //   isValid = false;
    //   formDataErrorTemp.health = "Health is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.health) && formData.location!=="") {
      isValid = false;
      formDataErrorTemp.health = "Health can only contain alphanumeric characters and spaces";
    }

    // if (formData.size === "") {
    //   isValid = false;
    //   formDataErrorTemp.size = "Size is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.size) && formData.location!=="") {
      isValid = false;
      formDataErrorTemp.size = "Size can only contain alphanumeric characters and spaces";
    }

    // if (formData.behavior === "") {
    //   isValid = false;
    //   formDataErrorTemp.behavior = "Behavior is required";
    // }

    // if (formData.weaknesses === "") {
    //   isValid = false;
    //   formDataErrorTemp.weaknesses = "Weaknesses are required";
    // }

    // if (formData.armament === "") {
    //   isValid = false;
    //   formDataErrorTemp.armament = "Armament is required";
    // }

    // if (formData.armor === "") {
    //   isValid = false;
    //   formDataErrorTemp.armor = "Armor is required";
    // }

    // if (formData.vulnerability === "") {
    //   isValid = false;
    //   formDataErrorTemp.vulnerability = "Vulnerability is required";
    // }

    // if (formData.movementPattern === "") {
    //   isValid = false;
    //   formDataErrorTemp.movementPattern = "Movement Pattern is required";
    // }

    // if (formData.visualAppearance === "") {
    //   isValid = false;
    //   formDataErrorTemp.visualAppearance = "Visual Appearance is required";
    // }

    // if (formData.soundAppearance === "") {
    //   isValid = false;
    //   formDataErrorTemp.soundAppearance = "Sound Appearance is required";
    // }

    // if (formData.threatLevel === "") {
    //   isValid = false;
    //   formDataErrorTemp.threatLevel = "Threat Level is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.threatLevel) && formData.location!=="") {
      isValid = false;
      formDataErrorTemp.threatLevel = "Threat Level can only contain alphanumeric characters and spaces";
    }

    // if (formData.notes === "") {
    //   isValid = false;
    //   formDataErrorTemp.notes = "Notes are required";
    // }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };

    formDataTemp[name] = value;

    if (name === "targetType") {
      if (value == "") {
        formDataErrorTemp.targetType = "Target Type is required";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.targetType = "Target Type should not contain special characters";
      } else {
        formDataErrorTemp.targetType = "";
      }
    }

    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      }else if (/\d/.test(value)) {
        formDataErrorTemp.name = "Name cannot contain numbers";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataErrorTemp.name = "";
      }
    }

    // if (name === "description") {
    //   formDataErrorTemp.description =
    //     value === "" ? "Description is required" : "";
    // }
    if (name === "description") {
      if (value == "") {
        formDataErrorTemp.description = "Description is required";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.description = "Description should not contain special characters";
      } else {
        formDataErrorTemp.description = "";
      }
    }

    if (name === "location") {
      if (!/^[a-zA-Z0-9\s]+$/.test(value) && value !== "") {
        formDataErrorTemp.location = "Location cannot contain special characters";
      } else {
        formDataErrorTemp.location = "";
      }
    }
    if (name === "longitude") {
  // Regular expression to match a decimal number with up to two decimal places
  if (!/^-?\d{1,3}\.\d{1,2}$/.test(value) && value !== "") {
    formDataErrorTemp.longitude = "Longitude must be a decimal number with up to two decimal places";
  } else {
    formDataErrorTemp.longitude = "";
  }
}
    

    // if (name === "longitude") {
    //   formDataErrorTemp.longitude = value === "" ? "Longitude is required" : "";
    // }

    // if (name === "heightAboveGround") {
    //   formDataErrorTemp.heightAboveGround =
    //     value === "" ? "Height Above Ground is required" : "";
    // }
    if (name === "heightAboveGround") {
      if (!/^[a-zA-Z0-9\s]+$/.test(value) && value !== "") {
        formDataErrorTemp.heightAboveGround = "Height above ground cannot contain special characters";
      } else {
        formDataErrorTemp.heightAboveGround = "";
      }
    }

    // if (name === "difficulty") {
    //   formDataErrorTemp.difficulty =
    //     value === "" ? "Difficulty is required" : "";
    // }

    // if (name === "health") {
    //   formDataErrorTemp.health = value === "" ? "Health is required" : "";
    // }

    if (name === "health") {
      if (!/^[a-zA-Z0-9\s]+$/.test(value) && value !== "") {
        formDataErrorTemp.health = "Health cannot contain special characters";
      } else {
        formDataErrorTemp.health = "";
      }
    }

    // if (name === "size") {
    //   formDataErrorTemp.size = value === "" ? "Size is required" : "";
    // }

    if (name === "size") {
      if (!/^[a-zA-Z0-9\s]+$/.test(value) && value !== "") {
        formDataErrorTemp.size = "Size cannot contain special characters";
      } else {
        formDataErrorTemp.size = "";
      }
    }

    // if (name === "behavior") {
    //   formDataErrorTemp.behavior = value === "" ? "Behavior is required" : "";
    // }

    // if (name === "weaknesses") {
    //   formDataErrorTemp.weaknesses =
    //     value === "" ? "Weaknesses are required" : "";
    // }

    // if (name === "armament") {
    //   formDataErrorTemp.armament = value === "" ? "Armament is required" : "";
    // }

    // if (name === "armor") {
    //   formDataErrorTemp.armor = value === "" ? "Armor is required" : "";
    // }

    // if (name === "vulnerability") {
    //   formDataErrorTemp.vulnerability =
    //     value === "" ? "Vulnerability is required" : "";
    // }

    // if (name === "movementPattern") {
    //   formDataErrorTemp.movementPattern =
    //     value === "" ? "Movement Pattern is required" : "";
    // }

    // if (name === "visualAppearance") {
    //   formDataErrorTemp.visualAppearance =
    //     value === "" ? "Visual Appearance is required" : "";
    // }

    // if (name === "soundAppearance") {
    //   formDataErrorTemp.soundAppearance =
    //     value === "" ? "Sound Appearance is required" : "";
    // }

    // if (name === "threatLevel") {
    //   formDataErrorTemp.threatLevel =
    //     value === "" ? "Threat Level is required" : "";
    // }
    if (name === "threatLevel") {
      if (!/^[a-zA-Z0-9\s]+$/.test(value) && value !== "") {
        formDataErrorTemp.threatLevel = "Threat Level cannot contain special characters";
      } else {
        formDataErrorTemp.threatLevel = "";
      }
    }

    // if (name === "notes") {
    //   formDataErrorTemp.notes = value === "" ? "Notes are required" : "";
    // }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["targetType"] = formData.targetType;
    data["name"] = formData.name;
    data["description"] = formData.description;
    data["location"] = formData.location;
    data["longitude"] = formData.longitude;
    data["heightAboveGround"] = formData.heightAboveGround;
    data["difficulty"] = formData.difficulty;
    data["health"] = formData.health;
    data["size"] = formData.size;
    data["behavior"] = formData.behavior;
    data["weaknesses"] = formData.weaknesses;
    data["armament"] = formData.armament;
    data["armor"] = formData.armor;
    data["vulnerability"] = formData.vulnerability;
    data["movementPattern"] = formData.movementPattern;
    data["visualAppearance"] = formData.visualAppearance;
    data["soundAppearance"] = formData.soundAppearance;
    data["threatLevel"] = formData.threatLevel;
    data["notes"] = formData.notes;
    return data;
  };

  // const handleChangeSubscription = (event) => {
  //   console.log("event", event);
  //   let formDataTemp = { ...formData }
  //   formDataTemp["subscriptionId"] = event
  //   setFormData(formDataTemp);

  // }

  const handleSubmit = async () => {
    if (validateForm(clientAddEditModalProps.formType)) {
    // if (validateForm()) {
    loaderStateTrue();
    let url;
    let method;
    let data;

    if (clientAddEditModalProps.formType === "add") {
      data = formatData();
      url = `${baseUrL}/targets/store`;
      method = "post";
    } else {
      // let { password, confirmPassword, ...newObj } = formatData();
      data = formatData();
      url = `${baseUrL}/targets/update/${formData.id}`;
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
      closeModal()
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
  const [clientAddEditModalProps, setClientAddEditModalProps] = useState({});
  const addClient = () => {
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "add";
    clientAddEditModalPropsTemp["headerText"] = "Add Targets";
    clientAddEditModalPropsTemp["submitButtonText"] = "Add";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setShowModal(true);
  };

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/targets?`;
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
              response.data.data.targets,
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
  const startDateString = startDate.toLocaleDateString("en-GB");
  const [selectedValue, setSelectedValue] = useState("active");
  const rowHeight= 70
  const headerHeight= 60

  return (
    <>
    <div className="globaltable_holder">
     {userData.role === "client" && (
        <div className="table_modal_open">
          <h3>Target</h3>
          <Button className="tablemodal_btn" onClick={addClient}>
            <FontAwesomeIcon icon={faPlus} /> Add Target
          </Button>
        </div>
      )}

      {userData.role === "user" &&
        filteredPermission.length>0 && (
          <div className="table_modal_open">
            <h3>Target</h3>
            <Button className="tablemodal_btn" onClick={addClient}>
              <FontAwesomeIcon icon={faPlus} /> Add Target
            </Button>
          </div>
        )}
    {/* {permissions.some(permission => (
              permission.label === "Target"
            )) &&
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={addClient}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>} */}
      <TargetAddEdit
        formData={formData}
        formDataError={formDataError}
        showModal={showModal}
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        //  subscriptionData={subscriptionData}
        headerText={clientAddEditModalProps.headerText}
        submitButtonText={clientAddEditModalProps.submitButtonText}
        formType={clientAddEditModalProps.formType}
        editObjWeapon={editObjClient}
      />
      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this target"}
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
  Target
);
// export default Target
