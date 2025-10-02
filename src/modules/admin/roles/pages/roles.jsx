import i18n from "../../../../i18n";
import { React, useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "../../../../utility/components/Button";
import RoleAddEdit from "../../../../utility/components/admin/RoleAddEdit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import settings_accessibility from "../../../../utility/assets/images/settings_accessibility.png"
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import Utility from "../../../../utility/utility";
import {toast, Bounce} from 'react-toastify'
import { withNamespaces } from "react-i18next";
import BackButton from "../../../../utility/components/BackButton";
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const Roles = (props) => {
  const gridRef = useRef(null);
  const {userData, loginSuccess, loaderStateTrue, loaderStateFalse, t}=props;
  const authToken = userData.token;
  // const addRoles = () => {
  //   setShowModal(true)
  // };
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
      let url = `${baseUrL}/admin/roles?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }

        url += `_start=${startRow+1}&_end=${endRow}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            params.successCallback(response.data.data.roles, response.data.data.total);
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
  const [roleID, setRoleID] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  const closeModal = ()=>{
    setShowModal(false)
    setFormData({
      name: "",
      description: "",
      module: "",
      type: "",
    }
   )
   setFormDataError({
    name: "",
    description: "",
    module: "",
    type: "",
  })
  }
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // { field: "name",width:'685' },
    {
      headerName: "Name",
      valueGetter: (params) => 
        params.data && params.data.name
          ? params.data.name.charAt(0).toUpperCase()+params.data.name.slice(1)
          : null, minWidth:150, maxWidth:200
    },
    { field: "description"},
    // { field: "module", width:'300'},
    // { field: "type", width:'350'},
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
    //             onClick={(e) => deleteRole(e, params)}
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
  const [editObjRoles, setEditObjRoles] = useState({});
  const editRoles = (e, params) => {
    let data = params.data;
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "edit";
    roleAddEditModalPropsTemp["headerText"] = "Edit Role";
    roleAddEditModalPropsTemp["submitButtonText"] = "Update";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setEditObjRoles(data);
    let formDataTemp = { ...formData };
    
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["description"] = data.description;
    formDataTemp["module"] = data.module;
    formDataTemp["type"] = data.type;
    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteRole = async (e, params) => {
    const roleID = params?.data.id;
    setShowAdminModal(true);
    setRoleID(roleID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/permissions/destroy/${roleID}`,
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
  description: "",
  module: "",
  type: "",
});

const [formDataError, setFormDataError] = useState({
  name: "",
  description: "",
  module: "",
  type: "",
});
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

  if (formData.module === "") {
    isValid = false;
    formDataErrorTemp.module = "module is required";
  }

  if (formData.type === "") {
    isValid = false;
    formDataErrorTemp.type = "type is required";
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

  if (name === "description") {
    if (value == "") {
      formDataErrorTemp.description = "description is required";
    } else {
      formDataErrorTemp.description = "";
    }
  }

  if (name === "module") {
    if (value == "") {
      formDataErrorTemp.module = "module is required";
    } else {
      formDataErrorTemp.module = "";
    }
  }

  if (name === "type") {
    if (value == "") {
      formDataErrorTemp.type = "type is required";
    } else {
      formDataErrorTemp.type = "";
    }
  }

  setFormData(formDataTemp);
  setFormDataError(formDataErrorTemp);
};
const formatData = () => {
  let data = {};
  data["name"] = formData.name;
  data["description"] = formData.description;
  data["module"] = formData.module;
  data["type"] = formData.type;

  return data;
};

// const handleSubmit = async () => {
//   const { loaderStateTrue, loaderStateFalse } = props;
//   if (validateForm()) {
//     if (roleAddEditModalProps.formType === "add") {
//       console.log(formatData());
//       loaderStateTrue();
//       try {
//         let data = formatData();
//         const response = await axios({
//           method: "post",
//           url: `${baseUrL}/admin/permissions/store`,
//           data: data,
//           headers: {
//             Authorization: authToken,
//           },
//         });
//         setShowModal(false);
//         resetDataGrid();
//         loaderStateFalse();
//         Utility.toastNotifications(
//           "Role updated successfully",
//           "Success",
//           "success"
//         );
//         console.log(`response check for role ${response}`);
//       } catch (userResponse) {
//         loaderStateFalse();
//     //     const errorMessage = userResponse.response.data.message
//     //     Utility.toastNotifications(
//     //     errorMessage,
//     //     "Error",
//     //     "error"
//     // );
//       }
//     } else {
//       try {
//         let data = formatData();
//         console.log("data", data);
//         const response = await axios({
//           method: "put",
//           url: `${baseUrL}/admin/permissions/update/${formData.id}`,
//           data: data,
//           headers: {
//             Authorization: authToken,
//           },
//         });
//         setShowModal(false);
//         loaderStateFalse();
//         resetDataGrid()
//         console.log(`response check ${response.data}`);
//         //fetchData();
//       } catch (userResponse) {
//         console.log("error in post", userResponse.response.data.error);
//         loaderStateFalse();
//         Utility.toastNotifications(
//           userResponse.response.data.message,
//           "Error",
//           "error"
//         );
//       }
//     }
//   }
// };
const handleSubmit = async () => {
  
  if (validateForm()) {
    loaderStateTrue();
    let url;
    let method;
    let data;

    if (roleAddEditModalProps.formType === "add") {
      data = formatData();
      url = `${baseUrL}/admin/permissions/store`;
      method = "post";
    } else {
      data = formatData();
      url = `${baseUrL}/admin/permissions/update/${formData.id}`;
      method = "put";
    }
    addEditPostData(url, data, method);

    // try {
    //   await addEditPostData(url, data, method);
    //   closeModal()
    //   resetDataGrid();
    //   loaderStateFalse();
    //   // Utility.toastNotifications(
    //   //   "Role updated successfully",
    //   //   "Success",
    //   //   "success"
    //   // );
    //   toast(`role added successfully`, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //     });
    // } catch (error) {
    //   loaderStateFalse()
    //   if (error.response) {
    //     if (error.response.status == 422) {
    //       let resData = error.response.data;
    //       if (resData.success === false) {
    //         console.log("resData====>", resData);
    //         let formDataErrorTemp = { ...formDataError };
    //         let responseData = resData.data;
    //         let obj = Object.keys(responseData);
    //         if (obj.length > 0) {
    //           obj.map((item, index) => {
    //             if (responseData[item]) {
    //               // if (item == "username") {
    //               //   formDataErrorTemp.name = responseData[item].message;
    //               // } else {
    //                 formDataErrorTemp[item] = responseData[item].message;
    //               // }
    //             }
    //           });
    //           setFormDataError(formDataErrorTemp);
    //         }
    //       }
    //     }
    //     if (error.response.status===401){
    //       console.log("error response check")
    //       loginSuccess({});
    //       const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
    //       const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
    //       if (userData.role === "admin") {
    //         window.location.href = adminLoginURL;
    //       } else {
    //         window.location.href = loginURL;
    //       }
    //     }
    //   } else {
    //     Utility.toastNotifications(error.message, "Error", "error");
    //   }
    // }
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
const addRole = () => {
  let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
  roleAddEditModalPropsTemp["formType"] = "add";
  roleAddEditModalPropsTemp["headerText"] = "Add Role";
  roleAddEditModalPropsTemp["submitButtonText"] = "Submit";
  setRoleAddEditModalProps(roleAddEditModalPropsTemp);
  setShowModal(true);
};
const staticModules = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "target",
    label: "target",
  },
  {
    value: "session",
    label: "session",
  },
  {
    value: "scenario",
    label: "scenario",
  },
  {
    value: "Module 5",
    label: "module 5",
  },
  // {
  //   value: "Module 6",
  //   label: "module 6",
  // },
  // {
  //   value: "Module 7",
  //   label: "module 7",
  // },
  // {
  //   value: "Module 8",
  //   label: "module 8",
  // },
];
const [selectedOption, setSelectedOption] = useState(formData.module);

const handleDropdownChange = (selectedOption) => {
  setSelectedOption(selectedOption.value);
  handleInputChange({
    target: { name: "module", value: selectedOption.value },
  });
};
const valueGetter = selectedOption.value
  ? selectedOption.value
  : formData.module;
  
  const [selectedItem, setSelectedItem] = useState(formData.type);
 
  const handleCheckboxChange = (index) => {
    const newValue = index === selectedItem ? null : index;
    setSelectedItem(newValue);
    handleInputChange({ target: { name: "type", value: newValue } });
  };

  const handleChange = (item) => {
    if (item.value === 'write') {
      handleCheckboxChange(selectedItem === 'write' ?'read': 'write');
    } else if(item.value === 'read' && selectedItem==null){
      handleCheckboxChange(item.value === 'read' && 'read' );
      // handleCheckboxChange(item.value === 'read' && 'read' );
    }
    else{
     
        handleCheckboxChange(item.value === 'read' && null );
        // handleCheckboxChange(item.value === 'read' && 'read' );
     
    }
  };

  return (
    <>
    <div className="globaltable_holder">
      <div className="table_modal_open">
      <div className="back_btn_caption_hold">
      <BackButton
            className={"back-button"}
            to={"/admin/dashboard"}
            />
            <span className="icn_bk_btn"><img src={settings_accessibility}/></span>
      <h3>{t("role")}</h3>
      </div>
        {/* <Button className="tablemodal_btn" onClick={addRole}><FontAwesomeIcon icon={faUserPlus} />{t("addRole")}</Button> */}
      </div>
      <RoleAddEdit
       showModal={showModal}
       closeModal={closeModal}
       formData={formData}
       formDataError={formDataError}
       handleInputChange={handleInputChange}
       handleSubmit={handleSubmit}
       headerText={roleAddEditModalProps.headerText}
       submitButtonText={roleAddEditModalProps.submitButtonText}
       formType={roleAddEditModalProps.formType}
       dropDownValue={{ label: valueGetter }}
       dropDownOnchange ={(setSelectedOption) => {
        {
          handleDropdownChange(setSelectedOption);
        }
      }}
      options ={staticModules.map((res) => ({
        label: res.value,
        value: res.value,
      }))}
      selectedItem={selectedItem}
      handleChange={handleChange}
      // checkOnChange = {() => handleChange(item)}
       />
       <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={'delete this Role'}
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
          rowSelection="multiple"
          components={components}
        />
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {userData: globalState.mainReducerData.userData};
};
export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, loginSuccess })(
  withNamespaces()(Roles)
);
