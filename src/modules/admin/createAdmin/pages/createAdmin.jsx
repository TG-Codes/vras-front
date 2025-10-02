import i18next from "i18next"; //
import React, { useCallback, useEffect, useRef, useState } from "react"; //
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess,
} from "../../../../actions/allActions";
import axios from "axios";
import Button from "../../../../utility/components/Button";
// import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import AdminAddEdit from "../../../../utility/components/admin/AdminAddEdit";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import { withNamespaces } from "react-i18next";
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const Admins = (props) => {
  const gridRef = useRef(null);
  const { userData, loginSuccess, t, loaderStateFalse, loaderStateTrue } = props;
  const authToken = userData.token;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);

  const rowHeight = 70;
  const headerHeight = 60;

  const [columnDefs, setColumnDefs] = useState([
    // { field: "id", width: '50' },
    { field: "name", minWidth: 150, maxWidth: 200 },
    { field: "username", minWidth: 150, maxWidth: 200 },
    { field: "email", minWidth: 300, maxWidth: 400 },
    { field: "mobile", minWidth: 150, maxWidth: 200 },
    {
      field: "Action", minWidth: 150, maxWidth: 200,
      cellClass: "table-action-cell",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editAdmins(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteAdmins(e, params)}
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
      let url = `${baseUrL}/admin/generate-admins?`;
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
            if (response.data.data.admins.length > 0) {
              params.successCallback(
                response.data.data.admins,
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


  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
    gridRef.current = params.api;
    gridRef.current.sizeColumnsToFit();
  });

  const [adminsAddEditModalProps, setAdminsAddEditModalProps] = useState({});
  const addAdmin = () => {
    let adminAddEditModalPropsTemp = { ...adminsAddEditModalProps };
    adminAddEditModalPropsTemp["formType"] = "add";
    adminAddEditModalPropsTemp["headerText"] = "Add Admin";
    adminAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setAdminsAddEditModalProps(adminAddEditModalPropsTemp);
    let formDataTemp = { ...formData }
    setFormData(formDataTemp)
    setShowAddModal(true);
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const closeModal = () => {
    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    setFormDataError({
      name: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
  };

  const [content, setContent] = useState("");
  // const [textInput, setTextInput] = useState('');
  const handleContentChange = (value) => {
    setContent(value);
  };

  const [formData, setFormData] = useState({
    id:"",
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [formDataError, setFormDataError] = useState({
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formDataTemp[name] = value;

    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } 
    }

    if (name === "email") {
      if (value == "") {
        formDataErrorTemp.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        formDataErrorTemp.email = "Invalid email address";
      } else {
        formDataErrorTemp.email = "";
      }
    }

    if (name === "username") {
      if (value == "") {
        formDataErrorTemp.username = "username is required";
      } else {
        formDataErrorTemp.username = "";
      }
    }

    if (name === "mobile") {
      if (value === "") {
        formDataErrorTemp.mobile = "Phone Number is required";
      } else if (!/^\d{10}$/.test(value)) {
        formDataErrorTemp.mobile = "Please provide valid Phone Number";
      } else {
        formDataErrorTemp.mobile = "";
      }
    }

    if (name === "password") {
      if (value === "") {
        formDataErrorTemp.password = "Password is required";
      } else if (!/[A-Z]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one capital letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one special character";
      } else if (!/[0-9]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one numeric value";
      } else {
        formDataErrorTemp.password = "";
        // Check if confirmPassword is filled and validate matching passwords
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        } else {
          formDataErrorTemp.confirmPassword = "";
        }
      }
    }

    if (name === "confirmPassword") {
      if (value === "") {
        formDataErrorTemp.confirmPassword = "Confirm Password is required";
      } else {
        formDataErrorTemp.confirmPassword = "";
        // Check if password is filled and validate matching passwords
        if (formData.password && formData.password !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        }
      }
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const validateForm = (params) => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name =
        "Name can only contain alphanumeric characters and spaces";
    }

    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "Phone No is required";
    }
    if (formData.username === "") {
      isValid = false;
      formDataErrorTemp.username = "Username is required";
    }
    if (formData.password === ""  && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.password = "Password is required";
    } else if (formData.password.length < 8 && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain more than 8 characters";
    } else if (!/[A-Z]/.test(formData.password) && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one capital letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one special character";
    } else if (!/[0-9]/.test(formData.password)  && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one numeric value";
    } else {
      formDataErrorTemp.password = "";
    }

    if (formData.confirmPassword === ""  && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password  && adminsAddEditModalProps.formType!="edit") {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Passwords do not match";
    } else {
      formDataErrorTemp.confirmPassword = "";
    }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const [editObjAdmin, setEditObjAdmin] = useState({});
  const editAdmins = (e, params) => {
    let data = params.data;
    let adminsAddEditModalPropsTemp = { ...adminsAddEditModalProps };
    adminsAddEditModalPropsTemp["formType"] = "edit";
    adminsAddEditModalPropsTemp["headerText"] = "Edit Admin";
    adminsAddEditModalPropsTemp["submitButtonText"] = "Update";
    setAdminsAddEditModalProps(adminsAddEditModalPropsTemp);
    setEditObjAdmin(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["email"] = data.email;
    formDataTemp["mobile"] = data.mobile;
    formDataTemp["username"] = data.username;
    setFormData(formDataTemp);
    setShowAddModal(true);
  };


  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const closeConfirmationAlert = () => {
    setShowConfirmationModal(false);
  };

  const [adminId, setAdminId] = useState(null);
  const deleteAdmins = (e, params) => {
    setAdminId(params.data.id);
    setShowConfirmationModal(true);
  };
  const confirm = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/generate-admins/destroy/${adminId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowConfirmationModal(false);
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
      console.error("Error deleting Admin:", error);
      loaderStateFalse();
    }
  };

  const formatData = () => {
    let data = {};
    data["name"] = formData.name;
    data["username"] = formData.username;
    data["mobile"] = formData.mobile;
    data["email"] = formData.email;
    // if (adminsAddEditModalProps.formType!="edit"){
      data["password"] = formData.password;
      data["confirmPassword"] = formData.confirmPassword;
    // }
    return data;
  };

  const handleSubmit = async () => {
    console.log("hello submit");
    
    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (adminsAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/generate-admins/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/admin/generate-admins/update/${formData.id}`;
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
      closeModal();
    } catch (error) {
      loaderStateFalse();
      if (error.response) {
        if (error.response.status == 422) {
          let resData = error.response.data;
          if (resData.success === false) {
            let formDataErrorTemp = { ...formDataError };
            let responseData = resData.data;
            if (responseData.mobile) {
              if (responseData.mobile.rule == "unique") {
                responseData.phoneNumber = {};
                responseData.phoneNumber.message =
                  "Phone Number already exists.";
              }
            }
            if (responseData.email) {
              if (responseData.email.rule == "unique") {
                responseData.email = {};
                responseData.email.message = "Email already exists.";
              }
            }
            let obj = Object.keys(responseData);
            if (obj.length > 0) {
              obj.map((item, index) => {
                if (responseData[item]) {
                  formDataErrorTemp[item] = responseData[item].message;
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
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <h3>{t("adminsLink")}</h3>
        <Button className="tablemodal_btn" onClick={addAdmin}>
          <FontAwesomeIcon icon={faUserPlus} /> {t("addAdmins")}
        </Button>
      </div>
      <AdminAddEdit
        showAddModal={showAddModal}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        headerText={adminsAddEditModalProps.headerText}
        submitButtonText={adminsAddEditModalProps.submitButtonText}
        formType = { adminsAddEditModalProps.formType }
      />
      <ConfirmationAlert
        showAdminModal={showConfirmationModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confirm}
        confirmationText={"delete this Admin?"}
        headerText={"Delete!"}
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
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          cacheBlockSize={10}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (globalState) => {
  // console.log("globalState", globalState);
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(Admins));