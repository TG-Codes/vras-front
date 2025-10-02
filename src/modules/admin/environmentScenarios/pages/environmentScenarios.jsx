import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../../utility/components/Button";
import { AgGridReact } from "ag-grid-react";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { withNamespaces } from "react-i18next";
import EnvironmentAddEdit from "../../../../utility/components/admin/EnvironmentAddEdit";
import ScenarioAdminAddEdit from "../../../../utility/components/admin/ScenarioAdminAddEdit";
import BackButton from '../../../../utility/components/BackButton';
import deployed_code_account from "../../../../utility/assets/images/deployed_code_account.png"
import action_key from "../../../../utility/assets/images/action_key.png"
import home_work from "../../../../utility/assets/images/add_home_work.png"
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const EnvironmentScenarios = (props) => {
  const { userData, loginSuccess, loaderStateTrue, loaderStateFalse, t } =
    props;
  const authToken = userData.token;
  const [envData, setEnvData] = useState([
    {
      id: 1,
      name: "Example 1",
      description: "Demo Desc",
    },
    {
      id: 2,
      name: "Example 2",
      description: "Demo Desc",
    },
    {
      id: 3,
      name: "Example 3",
      description: "Demo Desc",
    },
  ]);
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const [scenarioComponents, setScenarioComponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [scenarioGridApi, setScenarioGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const [ScenarioGridColumnApi, setScenarioGridColumnApi] = useState(null);
  const [scenarioGridparams, setScenarioGridparams] = useState(null);
  const initialLoadRef = useRef(true);
  const [ envDropdownData, setEnvDropdownData ] = useState([])
  useEffect(()=>{
    fetchEnvironmentsForDropdown()
  },[])
  const fetchEnvironmentsForDropdown = async ()=>{
    try{
      const response = await axios.get(`${baseUrL}/environments`, {
        headers: {
          Authorization: authToken
        }
      })
      console.log("response ", response.data.data.environments)
      setEnvDropdownData(response.data.data.environments)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      if (loading) return;
  
      if (initialLoadRef.current) {
        initialLoadRef.current = false;
      } else if (page === 1) {
        return;
      }
  
  
      setLoading(true);
  
      const url = `${baseUrL}/admin/environments?page=${page}&length=10`;
  
      axios.get(url, {
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => {
          if (response.data.data.environments.length > 0) {
            setEnvDropDownOption(prevOptions => [
              ...prevOptions,
              ...response.data.data.environments,
            ]);
          }
        })
        .catch((error) => {
          console.log(error, 'error==>');
        })
        .finally(() => {
          setLoading(false);  
        });
  
    }, [page, authToken, baseUrL]);
  const handleScrollToBottom = () => {
    
      setPage(prevPage => prevPage + 1);
   
  };
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/environments?`;
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
            if (response.data.data.environments.length > 0) {
              params.successCallback(
                response.data.data.environments,
                parseInt(response.data.data.total)
              );
              // setEnvDropDownOption(response.data.data.environments);
            }
          })
          .catch((error) => {
            params.failCallback();
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  const scenarioDatasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/scenarios?`;
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
            if (response.data.data.scenarios.length > 0) {
              params.successCallback(
                response.data.data.scenarios,
                parseInt(response.data.data.total)
              );
            }
          })
          .catch((error) => {
            params.failCallback();
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  const [envDropDownOption, setEnvDropDownOption] = useState([]);
  // const options = envDropDownOption?.map((item) => ({
  //   value: item.id,
  //   label: item.name,
  // }));
  const options = envDropdownData?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  };
  const scenarioResetDataGrid = () => {
    scenarioGridApi.setDatasource(scenarioDatasource);
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });
  const onScenarioGridReady = useCallback((params) => {
    setScenarioGridparams(params);
    setScenarioGridApi(params.api);
    setScenarioGridColumnApi(params.columnApi);
    params.api.setDatasource(scenarioDatasource);
  });

  const [scenarioData, setSCenarioData] = useState([
    {
      id: 1,
      name: "example sceanrio 1",
      environment: "Example 1",
      description: "demo description",
    },
    {
      id: 2,
      name: "example sceanrio 2",
      environment: "Example 2",
      description: "demo description",
    },
    {
      id: 3,
      name: "example sceanrio 3",
      environment: "Example 3",
      description: "demo description",
    },
  ]);
  const [envFormData, setEnvFormData] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [envFormDataEror, setEnvFormDataError] = useState({
    name: "",
    description: "",
  });
  const [scenarioFormData, setScenarioFormData] = useState({
    id: "",
    name: "",
    environment: "",
    description: "",
    envValues: {},
  });
  const [scenarioFormDataError, setScenarioFormDataError] = useState({
    name: "",
    environment: "",
    description: "",
    envValues: {},
  });
  const rowHeight = 70;
  const headerHeight = 60;
  const envColumnDefs = [
    { field: "name" },
    { field: "description" },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editEnv(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteEnv(e, params)}
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
  ];
  const ScenarioColumnDefs = [
    { field: "name", width:'200' },
    {
      headerName: "Environment",
      valueGetter: (params) => 
        params.data && params.data.environment?.name 
          ? params.data.environment.name 
          : null,
    },
    { field: "description", width:'300' },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editScenario(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteScenario(e, params)}
                className="action_button del_btn"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          );
        } else {
          return null;
        }
      }, width:'200'
    },
  ];

  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const closeEnvModal = () => {
    setShowEnvModal(false);
    setEnvFormData({
      id: "",
      name: "",
      description: "",
    });
    setEnvFormDataError({
      name: "",
      description: "",
    });
  };
  const closeScenarioModal = () => {
    setPage(1)
    setShowScenarioModal(false);
    setScenarioFormData({
      id: "",
      name: "",
      environment: "",
      description: "",
      envValues: {},
    });
    setScenarioFormDataError({
      name: "",
      environment: "",
      description: "",
      envValues: {},
    });
  };
  const [envAddEditModalProps, setEnvAddEditModalProps] = useState({});
  const [scenarioAddEditModalProps, setScenarioAddEditModalProps] = useState(
    {}
  );
  const addEnv = () => {
    fetchEnvironmentsForDropdown()
    let envAddEditTemp = { ...envAddEditModalProps };
    envAddEditTemp["formType"] = "add";
    envAddEditTemp["headerText"] = "Add Environment";
    envAddEditTemp["submitButtonText"] = "Submit";
    setEnvAddEditModalProps(envAddEditTemp);
    setShowEnvModal(true);
  };
  const addScenario = () => {
    let scenarioAddEditTemp = { ...scenarioAddEditModalProps };
    scenarioAddEditTemp["formType"] = "add";
    scenarioAddEditTemp["headerText"] = "Add Scenario";
    scenarioAddEditTemp["submitButtonText"] = "Submit";
    setScenarioAddEditModalProps(scenarioAddEditTemp);
    setShowScenarioModal(true);
  };
  const editEnv = (e, params) => {
    fetchEnvironmentsForDropdown()
    let aenvAddEditModalPropsTemp = { ...envAddEditModalProps };
    aenvAddEditModalPropsTemp["formType"] = "Edit";
    aenvAddEditModalPropsTemp["headerText"] = "Edit Environment";
    aenvAddEditModalPropsTemp["submitButtonText"] = "Update";
    setEnvAddEditModalProps(aenvAddEditModalPropsTemp);
    let data = params.data;
    let formDataTemp = { ...envFormData };
    formDataTemp["id"] = params.data.id;
    formDataTemp["name"] = params.data.name;
    formDataTemp["description"] = params.data.description;
    setEnvFormData(formDataTemp);
    setShowEnvModal(true);
  };

  const editScenario = (e, params) => {
    let scenarioAddEditModalPropsTemp = { ...scenarioAddEditModalProps };
    scenarioAddEditModalPropsTemp["formType"] = "Edit";
    scenarioAddEditModalPropsTemp["headerText"] = "Edit Scenario";
    scenarioAddEditModalPropsTemp["submitButtonText"] = "Update";
    setScenarioAddEditModalProps(scenarioAddEditModalPropsTemp);
    let data = params.data;
    let env;
    if (data && data.environmentId && data.environment) {
      env = {
        value: data?.environmentId,
        label: data?.environment?.name,
      };
    } else {
      env = []
    }
    
    let formDataTemp = { ...scenarioFormData };
    formDataTemp["id"] = params.data.id;
    formDataTemp["name"] = params.data.name;
    formDataTemp["description"] = params.data.description;
    formDataTemp["envValues"] = env;
    setScenarioFormData(formDataTemp);
    setShowScenarioModal(true);
  };
  const [DeleteModal, setDeleteModal] = useState(false);
  const [isEnvId, setIsEnvId] = useState(false);
  const closeConfirmationModal = () => {
    setEnvFormData({
      id: "",
      name: "",
      description: "",
    });
    setScenarioFormData({
      id: "",
      name: "",
      environment: "",
      description: "",
      envValues: {},
    });
    setIsEnvId(false);
    setDeleteModal(false);
  };
  const [deleteText, setDeleteModalText] = useState("");
  const deleteEnv = (e, params) => {
    let formDataTemp = { ...envFormData };
    formDataTemp["id"] = params.data.id;
    setEnvFormData(formDataTemp);
    setDeleteModalText("Environment");
    setIsEnvId(true);
    setDeleteModal(true);
  };
  const deleteScenario = (e, params) => {
    let formDataTemp = { ...scenarioFormData };
    formDataTemp["id"] = params.data.id;
    setScenarioFormData(formDataTemp);
    setDeleteModalText("Scenario");
    setDeleteModal(true);
  };
  // const confirm = ()=>{
  //     // console.log({envFormData, scenarioFormData})
  //     if (envFormData.id){
  //         console.log("envvvv")
  //     }else {
  //         console.log("scenarioooo")
  //     }
  // }
  const confirm = async () => {
    loaderStateTrue();
    if (envFormData.id && !scenarioFormData.name) {
      try {
        const response = await axios.delete(
          `${baseUrL}/admin/environments/destroy/${envFormData.id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (response) {
          setDeleteModal(false);
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
          fetchEnvironmentsForDropdown()
          scenarioResetDataGrid()
        }
      } catch (error) {
        // if (error.response.status === 401) {
        //   loginSuccess({});
        //   const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
        //   const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
        //   if (userData.role === "admin") {
        //     window.location.href = adminLoginURL;
        //   } else {
        //     window.location.href = loginURL;
        //   }
        // }
        console.error("Error deleting client:", error);
        loaderStateFalse();
      }
    } else {
      try {
        const response = await axios.delete(
          `${baseUrL}/admin/scenarios/destroy/${scenarioFormData.id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (response) {
          setDeleteModal(false);
          scenarioResetDataGrid();
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
        // if (error.response.status === 401) {
        //   loginSuccess({});
        //   const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
        //   const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
        //   if (userData.role === "admin") {
        //     window.location.href = adminLoginURL;
        //   } else {
        //     window.location.href = loginURL;
        //   }
        // }
        console.error("Error deleting client:", error);
        loaderStateFalse();
      }
    }
  };
  const handleEnvInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, envFormData);
    let formDataErrorTemp = Object.assign({}, envFormDataEror);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataErrorTemp.name = "";
      }
    }

    // if (name === "description") {
    //   if (value == "") {
    //     formDataErrorTemp.description = "Description is required";
    //   } else {
    //     formDataErrorTemp.description = "";
    //   }
    // }
    setEnvFormData(formDataTemp);
    setEnvFormDataError(formDataErrorTemp);
  };
  const handleScenarioInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, scenarioFormData);
    let formDataErrorTemp = Object.assign({}, scenarioFormDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataErrorTemp.name = "";
      }
    }

    // if (name === "description") {
    //   if (value == "") {
    //     formDataErrorTemp.description = "Description is required";
    //   } else {
    //     formDataErrorTemp.description = "";
    //   }
    // }
    setScenarioFormData(formDataTemp);
    setScenarioFormDataError(formDataErrorTemp);
  };
  const handleChangeEnv = (event) => {
    let formDataTemp = { ...scenarioFormData };
    formDataTemp["envValues"] = event;
    setScenarioFormData(formDataTemp);

    let formDataErrorTemp = { ...scenarioFormDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp.envValues = "Environment is required";
    } else {
      formDataErrorTemp.envValues = "";
    }
    setScenarioFormDataError(formDataErrorTemp);
  };
  const validateEnvForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, envFormDataEror);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (envFormData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    // if (envFormData.description === "") {
    //   isValid = false;
    //   formDataErrorTemp.description = "Description is required";
    // }
    setEnvFormDataError(formDataErrorTemp);
    return isValid;
  };
  const validateScenarioForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, scenarioFormDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (scenarioFormData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    if (Object.keys(scenarioFormData.envValues).length === 0) {
      isValid = false;
      formDataErrorTemp.envValues = "Environment is required";
    }
    // if (scenarioFormData.description === "") {
    //   isValid = false;
    //   formDataErrorTemp.description = "Description is required";
    // }
    setScenarioFormDataError(formDataErrorTemp);
    return isValid;
  };
  const envFormattedData = () => {
    let data = {};
    data["name"] = envFormData.name;
    data["description"] = envFormData.description;
    return data;
  };
  const scenarioFormattedData = () => {
    let data = {};
    data["name"] = scenarioFormData.name;
    data["description"] = scenarioFormData.description;
    data["environmentId"] = scenarioFormData?.envValues?.value;
    return data;
  };
  const envHandleSubmit = async () => {
    if (validateEnvForm(envAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (envAddEditModalProps.formType === "add") {
        data = envFormattedData();
        url = `${baseUrL}/admin/environments/store`;
        method = "post";
        loaderStateFalse();
      } else {
        // let { password, confirmPassword, ...newObj } = formatData();
        data = envFormattedData();
        url = `${baseUrL}/admin/environments/update/${envFormData.id}`;
        method = "put";
        loaderStateFalse();
      }
      addEditPostData(url, data, method);
    } else {
      console.log("else of validate");
    }
  };
  const scenarioHandleSubmit = async () => {
    if (validateScenarioForm(scenarioAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;
      if (scenarioAddEditModalProps.formType === "add") {
        data = scenarioFormattedData();
        url = `${baseUrL}/admin/scenarios/store`;
        method = "post";
        loaderStateFalse();
      } else {
        // let { password, confirmPassword, ...newObj } = formatData();
        data = scenarioFormattedData();
        url = `${baseUrL}/admin/scenarios/update/${scenarioFormData.id}`;
        method = "put";
        loaderStateFalse();
      }
      scenarioAddEditPostData(url, data, method);
    } else {
      console.log("else of validate");
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
      if (envAddEditModalProps.formType !== "add") {
        scenarioResetDataGrid()
      }
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
      closeEnvModal()
      fetchEnvironmentsForDropdown()
      return response;
    } catch (error) {
      loaderStateFalse();
      if (error.response) {
        if (error.response.status == 422) {
          let resData = error.response.data;
          if (resData.success === false) {
            let formDataErrorTemp = { ...envFormDataEror };
            let responseData = resData.data;
            let obj = Object.keys(responseData);
            if (obj.length > 0) {
              obj.map((item, index) => {
                if (responseData[item]) {
                  console.log("item->", item)
                  // if (item == "username") {
                  //   formDataErrorTemp.name = responseData[item].message;
                  // } else {
                    formDataErrorTemp[item] = responseData[item].message;
                  // }
                }
              });
              setEnvFormDataError(formDataErrorTemp);
            }
          }
        }
      //   if (error.response.status===401){
      //     loginSuccess({});
      //     const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
      //     const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
      //     if (userData.role === "admin") {
      //       window.location.href = adminLoginURL;
      //     } else {
      //       window.location.href = loginURL;
      //     }
      //   }
      // } else {
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
  const scenarioAddEditPostData = async (url, data, method) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: authToken,
        },
      });
        scenarioResetDataGrid()
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
      closeScenarioModal();
      return response;
    } catch (error) {
      loaderStateFalse();
      if (error.response) {
        if (error.response.status == 422) {
          let resData = error.response.data;
          if (resData.success === false) {
            let formDataErrorTemp = { ...scenarioFormDataError };
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
              setScenarioFormDataError(formDataErrorTemp);
            }
          }
        }
      //   if (error.response.status===401){
      //     loginSuccess({});
      //     const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
      //     const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
      //     if (userData.role === "admin") {
      //       window.location.href = adminLoginURL;
      //     } else {
      //       window.location.href = loginURL;
      //     }
      //   }
      // } else {
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
  return (
    <>
      <div className="globaltable_holder double_table">
        <div className="inner_double_table">
          <div className="table_modal_open">
          <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} to={"/admin/dashboard"} />
          <span className="icn_bk_btn"><img src={action_key}/></span>
            <h3>{t("environments")}</h3>
            </div>
            <Button className="tablemodal_btn" onClick={addEnv}>
            {t("addEnvironments")}
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={envColumnDefs}
              rowModelType="infinite"
              onGridReady={onGridReady}
              components={components}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              cacheBlockSize={10}
            />
          </div>
        </div>
        <div className="inner_double_table">
          <div className="table_modal_open">
          <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} to={"/admin/dashboard"} />
          <span className="icn_bk_btn"><img src={home_work}/></span>
            <h3>{t("scenarios")}</h3>
            </div>
            <Button className="tablemodal_btn" onClick={addScenario}>
            {t("addScenarios")}
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={ScenarioColumnDefs}
              rowModelType="infinite"
              onGridReady={onScenarioGridReady}
              components={scenarioComponents}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              cacheBlockSize={10}
            />
          </div>
        </div>
      </div>
      <EnvironmentAddEdit
        showModal={showEnvModal}
        closeModal={closeEnvModal}
        headerText={envAddEditModalProps.headerText}
        formType={envAddEditModalProps.formType}
        submitButtonText={envAddEditModalProps.submitButtonText}
        formData={envFormData}
        formDataError={envFormDataEror}
        handleInputChange={handleEnvInputChange}
        handleSubmit={envHandleSubmit}
      />
      <ScenarioAdminAddEdit
        showModal={showScenarioModal}
        closeModal={closeScenarioModal}
        headerText={scenarioAddEditModalProps.headerText}
        formType={scenarioAddEditModalProps.formType}
        submitButtonText={scenarioAddEditModalProps.submitButtonText}
        formData={scenarioFormData}
        formDataError={scenarioFormDataError}
        handleInputChange={handleScenarioInputChange}
        handleSubmit={scenarioHandleSubmit}
        options={options}
        handleChangeEnv={handleChangeEnv}
        handleScrollToBottom={handleScrollToBottom}
      />
      <ConfirmationAlert
        showAdminModal={DeleteModal}
        closeConfirmationAlert={closeConfirmationModal}
        confirm={confirm}
        confirmationText={`delete this ${deleteText}`}
        headerText={"Delete?"}
      />
    </>
  );
};

// export default EnvironmentScenarios
const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(EnvironmentScenarios));
