import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../../../../utility/components/Button'
import { AgGridReact } from 'ag-grid-react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { withNamespaces } from "react-i18next";
import EnvironmentAddEdit from '../../../../utility/components/admin/EnvironmentAddEdit';
import ScenarioAdminAddEdit from '../../../../utility/components/admin/ScenarioAdminAddEdit';
import BackButton from '../../../../utility/components/BackButton';
import deployed_code_account from "../../../../utility/assets/images/deployed_code_account.png"
import action_key from "../../../../utility/assets/images/action_key.png"
import home_work from "../../../../utility/assets/images/add_home_work.png"
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;
const Warehouse = (props) => {
  const {userData, loginSuccess, loaderStateTrue, loaderStateFalse, t}=props;
  const authToken = userData.token;
  const [warehouseData, setWarehouseData ] = useState([])
  useEffect(()=>{
    fetchWarehouseData()
  },[])
  const fetchWarehouseData = async ()=>{
    try {
      const response = await axios.get(`${baseUrL}/clients/warehouse`, {
        headers: {
          Authorization: authToken
        }
      })
      setWarehouseData(response.data.data)
      setSCenarioData(response.data.data.scenarios)
      setEnvData([response.data.data.environment])
      console.log(response.data, "rescd")
    } catch (err) {
      console.log(err)
    }
  }
    const [ envData, setEnvData ]= useState([])
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
const [gridApi, setGridApi] = useState(null);
const [scenarioGridApi, setScenarioGridApi] = useState(null);
const [gridColumnApi, setGridColumnApi] = useState(null);
const [gridparams, setgridparams] = useState(null);
const [ScenarioGridColumnApi, setScenarioGridColumnApi] = useState(null);
const [scenarioGridparams, setScenarioGridparams] = useState(null);
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
            setEnvDropDownOption(response.data.data.environments)
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
            console.log("response.data.data.scenarios" ,response.data.data.scenarios)
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
const [envDropDownOption, setEnvDropDownOption] = useState([])
const options = envDropDownOption?.map(item => ({
  value: item.id,
  label: item.name
}));
console.log("envData ", options)
const resetDataGrid = () => {
  gridApi.setDatasource(datasource);
  scenarioGridApi.setDatasource(scenarioDatasource)
};
const onGridReady = useCallback((params) => {
  setgridparams(params);
  setGridApi(params.api);
  setGridColumnApi(params.columnApi);
  params.api.setDatasource(datasource);
  gridRef.current = params.api;
  gridRef.current.sizeColumnsToFit();
});
const onScenarioGridReady = useCallback((params) => {
  setScenarioGridparams(params)
  setScenarioGridApi(params.api)
  setScenarioGridColumnApi(params.columnApi)
  params.api.setDatasource(scenarioDatasource)
});


// const [ scenarioData, setSCenarioData ]= useState([
//     {
//         "id":1,
//         "name": "example sceanrio 1",
//         "environment": "Example 1",
//         "description": "demo description"
//     },{
//         "id": 2,
//         "name": "example sceanrio 2",
//         "environment": "Example 2",
//         "description": "demo description"
//     },{
//         "id": 3,
//         "name": "example sceanrio 3",
//         "environment": "Example 3",
//         "description": "demo description"
//     }
// ])
const [ scenarioData, setSCenarioData ]= useState([])
const [envFormData, setEnvFormData] = useState({
    id: "",
    name: "",
    description: ""
})
const [envFormDataEror, setEnvFormDataError] = useState({
    name: "",
    description: ""
})
const [scenarioFormData, setScenarioFormData]=useState({
    id: "",
    name: "",
    environment: "",
    description: "",
    envValues: {}
})
const [scenarioFormDataError, setScenarioFormDataError]=useState({
    name: "",
    environment: "",
    description: "",
    envValues: {}
})
    const rowHeight = 70;
    const headerHeight = 60;
    const envColumnDefs = [
        {field: "name",minWidth: 200, maxWidth: 300},
        {field: "description",},
        // {
        //     field: "Action",
        //     cellRenderer: (params) => {
        //       if (params.data) {
        //         return (
        //           <div>
        //             <Button
        //               onClick={(e) => editEnv(e, params)}
        //               className="action_button edt_btn"
        //             >
        //               <FontAwesomeIcon icon={faPencil} />
        //             </Button>
        //             <Button
        //               onClick={(e) => deleteEnv(e, params)}
        //               className="action_button del_btn"
        //             >
        //               <FontAwesomeIcon icon={faTrashCan} />
        //             </Button>
        //           </div>
        //         );
        //       } else {
        //         return null;
        //       }
        //     },
        //   },
    ]
    const ScenarioColumnDefs = [
        {field: "name",minWidth: 200, maxWidth: 300},
        // {
        //   headerName: "environment",
        //   valueGetter: (params) => params.data ? params.data.environment.name : "No Environment"
        // },
        {field: "description"},
        // {
        //     field: "Action",
        //     cellRenderer: (params) => {
        //       if (params.data) {
        //         return (
        //           <div>
        //             <Button
        //               onClick={(e) => editScenario(e, params)}
        //               className="action_button edt_btn"
        //             >
        //               <FontAwesomeIcon icon={faPencil} />
        //             </Button>
        //             <Button
        //               onClick={(e) => deleteScenario(e, params)}
        //               className="action_button del_btn"
        //             >
        //               <FontAwesomeIcon icon={faTrashCan} />
        //             </Button>
        //           </div>
        //         );
        //       } else {
        //         return null;
        //       }
        //     },
        //   },
    ]

    const gridRef = useRef(null);


    const [ showEnvModal, setShowEnvModal ] = useState(false)
    const [ showScenarioModal, setShowScenarioModal] = useState(false)
    const  closeEnvModal = ()=>{
        setShowEnvModal(false)
        setEnvFormData({ 
        id: "",  
        name: "",
        description: ""
        })
        setEnvFormDataError({   
            name: "",
            description: ""
            })
    }
    const closeScenarioModal = ()=>{
        setShowScenarioModal(false)
        setScenarioFormData({
            id: "",
            name: "",
            environment: "",
            description: "",
            envValues: {}
        })
        setScenarioFormDataError({
            name: "",
            environment: "",
            description: "",
            envValues: {}
        })
    }
    const [envAddEditModalProps, setEnvAddEditModalProps]= useState({})
    const [scenarioAddEditModalProps, setScenarioAddEditModalProps]= useState({})
    const addEnv  =()=>{
        let envAddEditTemp = {...envAddEditModalProps}
        envAddEditTemp["formType"]="add";
        envAddEditTemp["headerText"]="Add Environment"
        envAddEditTemp["submitButtonText"]="Submit"
        setEnvAddEditModalProps(envAddEditTemp)
        setShowEnvModal(true)
    }
    const addScenario  =()=>{
        let scenarioAddEditTemp = {...scenarioAddEditModalProps}
        scenarioAddEditTemp["formType"]="add";
        scenarioAddEditTemp["headerText"]="Add Scenario"
        scenarioAddEditTemp["submitButtonText"]="Submit"
        setScenarioAddEditModalProps(scenarioAddEditTemp)
        setShowScenarioModal(true)
    }
    const editEnv =(e, params)=>{
        let aenvAddEditModalPropsTemp = {...envAddEditModalProps}
        aenvAddEditModalPropsTemp["formType"]="Edit";
        aenvAddEditModalPropsTemp["headerText"]="Edit Environment"
        aenvAddEditModalPropsTemp["submitButtonText"]="Edit"
        setEnvAddEditModalProps(aenvAddEditModalPropsTemp)
        let data = params.data
        let formDataTemp ={...envFormData}
        formDataTemp["id"]=params.data.id
        formDataTemp["name"]=params.data.name
        formDataTemp["description"]=params.data.description
        setEnvFormData(formDataTemp)
        setShowEnvModal(true)
    }

    const editScenario =(e, params)=>{
        let scenarioAddEditModalPropsTemp = {...scenarioAddEditModalProps}
        scenarioAddEditModalPropsTemp["formType"]="Edit";
        scenarioAddEditModalPropsTemp["headerText"]="Edit Scenario"
        scenarioAddEditModalPropsTemp["submitButtonText"]="Edit"
        setScenarioAddEditModalProps(scenarioAddEditModalPropsTemp)
        let data = params.data
        let env = {
          value: data.environmentId,
          label: data.environment.name
      };
        let formDataTemp ={...scenarioFormData}
        formDataTemp["id"]=params.data.id
        formDataTemp["name"]=params.data.name
        formDataTemp["description"]=params.data.description
        formDataTemp["envValues"]=env
        setScenarioFormData(formDataTemp)
        setShowScenarioModal(true)
    }
    const [DeleteModal, setDeleteModal]= useState(false)
    const [isEnvId, setIsEnvId]=useState(false)
    const closeConfirmationModal =()=>{
        setEnvFormData({ 
            id: "",  
            name: "",
            description: ""
            })
        setScenarioFormData({
            id: "",
            name: "",
            environment: "",
            description: "",
            envValues: {}
            })
            setIsEnvId(false)
        setDeleteModal(false)
    }
    const [deleteText, setDeleteModalText]=useState("")
    const deleteEnv =(e,params)=>{
        let formDataTemp = {...envFormData}
        formDataTemp['id']=params.data.id
        setEnvFormData(formDataTemp)
        setDeleteModalText("Environment")
        setIsEnvId(true)
        setDeleteModal(true)
    }
    const deleteScenario =(e,params)=>{
        let formDataTemp = {...scenarioFormData}
        formDataTemp['id']=params.data.id
        setScenarioFormData(formDataTemp)
        setDeleteModalText("Scenario")
        setDeleteModal(true)
    }
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
      if (envFormData.id){
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
          }  else {
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
          }  else {
            formDataErrorTemp.name = "";
          }
        }
    
    
        if (name === "description") {
          if (value == "") {
            formDataErrorTemp.description = "Description is required";
          } else {
            formDataErrorTemp.description = "";
          }
        }
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
        if (scenarioFormData.description === "") {
          isValid = false;
          formDataErrorTemp.description = "Description is required";
        }
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
        data["environmentId"]= scenarioFormData?.envValues?.value
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
            closeEnvModal()
            loaderStateFalse()
          } else {
            // let { password, confirmPassword, ...newObj } = formatData();
            data = envFormattedData();
            url = `${baseUrL}/admin/environments/update/${envFormData.id}`;
            method = "put";
            closeEnvModal()
            loaderStateFalse()

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
    console.log("scenarioFormattedData ", scenarioFormattedData())
          if (scenarioAddEditModalProps.formType === "add") {
            data = scenarioFormattedData();
            url = `${baseUrL}/admin/scenarios/store`;
            method = "post";
            closeScenarioModal()
            loaderStateFalse()
          } else {
            // let { password, confirmPassword, ...newObj } = formatData();
            data = scenarioFormattedData();
            url = `${baseUrL}/admin/scenarios/update/${scenarioFormData.id}`;
            method = "put";
            closeScenarioModal()
            loaderStateFalse()
            console.log("edited", envFormattedData())

          }
          addEditPostData(url, data, method);
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
          return response;
        } catch (error) {
          loaderStateFalse()
          // if (error.response) {
          //   if (error.response.status == 422) {
          //     let resData = error.response.data;
          //     if (resData.success === false) {
          //       let formDataErrorTemp = { ...formDataError };
          //       let responseData = resData.data;
          //       let obj = Object.keys(responseData);
          //       // if (obj.length > 0) {
          //       //   obj.map((item, index) => {
          //       //     if (responseData[item]) {
          //       //       // if (item == "username") {
          //       //       //   formDataErrorTemp.name = responseData[item].message;
          //       //       // } else {
          //       //         formDataErrorTemp[item] = responseData[item].message;
          //       //       // }
          //       //     }
          //       //   });
          //       //   setFormDataError(formDataErrorTemp);
          //       // }
          //     }
          //   }
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
          // }
        }
      };
    return (
        <>
        <div className="client-details-holder">
        <div className="container-fluid">
        <div className="details_pg_head table_modal_open">
        <div className="back_btn_caption_hold">
           <BackButton className={"back-button"}/>
           <span className="icn_bk_btn"><img src={deployed_code_account}/></span>
           <h3>Warehouse</h3>
         </div>
        </div>
      </div>
            <div className="globaltable_holder double_table">
                <div>
                    <div className="table_modal_open">
                    <div className="back_btn_caption_hold">
                    <span className="icn_bk_btn"><img src={action_key}/></span>
                        <h3>Environments</h3>
                        </div>
                        {/* <Button className="tablemodal_btn" onClick={addEnv}>Add Environment</Button> */}
                    </div>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "calc(100vh - 320px)" }}
                    >
                        <AgGridReact
                            columnDefs={envColumnDefs}
                            // rowModelType="infinite"
                            // onGridReady={onGridReady}
                            // components={components}
                            rowHeight={rowHeight}
                            headerHeight={headerHeight}
                            rowData={envData}
                            // cacheBlockSize={10}
                        />
                    </div>
                </div>
                <div>
                    <div className="table_modal_open">
                    <div className="back_btn_caption_hold">
                    <span className="icn_bk_btn"><img src={home_work}/></span>
                        <h3>Scenarios</h3>
                        {/* <Button className="tablemodal_btn" onClick={addScenario}>Add Scenario</Button> */}
                        </div>
                    </div>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "calc(100vh - 320px)" }}
                    >
                        <AgGridReact
                            columnDefs={ScenarioColumnDefs}
                            rowData={scenarioData}
                            // rowModelType="infinite"
                            // onGridReady={onScenarioGridReady}
                            // components={scenarioComponents}
                            rowHeight={rowHeight}
                            headerHeight={headerHeight}
                            // cacheBlockSize={10}
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
            />
            <ConfirmationAlert
            showAdminModal={DeleteModal}
            closeConfirmationAlert={closeConfirmationModal}
            confirm={confirm}
            confirmationText={`delete this ${deleteText}`}
            headerText={"Delete?"}
            />
            </div>
        </>
    )
}

// export default Warehouse
const mapStateToProps = (globalState) => {
    return { userData: globalState.mainReducerData.userData };
  };
  
  export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, loginSuccess })(
    withNamespaces()(Warehouse)
  );
