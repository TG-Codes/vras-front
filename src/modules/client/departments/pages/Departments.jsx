import React, { useCallback, useRef, useState } from "react";
import Button from "../../../../utility/components/Button";
import { AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";
import {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess,
} from "../../../../actions/allActions";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import analytics_img from "../../../../utility/assets/images/analytics.png";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import DepartmentAddEdit from "../../../../utility/components/clients/DepartmentAddEdit";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../utility/components/BackButton";
import { getHeaders } from "../../../../utility/http";

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const Departments = (props) => {
  const gridRef = useRef(null);
  const { userData, loginSuccess, loaderStateTrue, loaderStateFalse, t } =
    props;
  const navigate = useNavigate();
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

  const [roleID, setRoleID] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);

  const datasource = {
    getRows: async (params) => {
      let url = `${baseUrL}/clients/departments?`;
      const {
        startRow,
        endRow,
        sortModel
      } = params;

      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }

        url += `_start=${startRow + 1}&_end=${endRow}`;

        const headers = await getHeaders(
          {
            Authorization: authToken,
          }
        );
        
        const response = axios.get(url, {
          headers: headers
          // headers
        });
        response
          .then((response) => {
            params.successCallback(
              response.data.data.departments,
              response.data.data.total
            );
          })
          .catch((error) => {
            console.log(error);
            params.failCallback();
          });
          console.log("ressssss", response);
          
        params.successCallback(
          response?.data?.data?.departments,
          response?.data?.data?.total
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        params.failCallback();
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
    setShowModal(false);
    setFormData({
      name: "",
    });
    setFormDataError({
      name: "",
    });
  };
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", minWidth: 200, maxWidth: 300 },

    {
      field: "Action",
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
                onClick={(e) => deleteDepartment(e, params)}
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
    roleAddEditModalPropsTemp["headerText"] = "Edit Department";
    roleAddEditModalPropsTemp["submitButtonText"] = "Update";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setEditObjRoles(data);
    let formDataTemp = { ...formData };

    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;

    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteDepartment = async (e, params) => {
    const roleID = params?.data.id;
    setShowAdminModal(true);
    setRoleID(roleID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/clients/departments/destroy/${roleID}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowAdminModal(false);
        resetDataGrid();
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
  };
  const [formData, setFormData] = useState({
    name: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
  });
  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
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
        url = `${baseUrL}/clients/departments/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/clients/departments/update/${formData.id}`;
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
  const addDepartment = () => {
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "add";
    roleAddEditModalPropsTemp["headerText"] = "Add Department";
    roleAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setShowModal(true);
  };
  const onCellClicked = (event) => {
    // Check if the clicked cell should not trigger the row click
    if (event.column.colId !== "Action") {
      navigate(`/department-details/${event.data.id}`);
    }
  };

  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} />
          <span className="icn_bk_btn"><img src={analytics_img} /></span>
          <h3>Departments</h3>
        </div>
        <Button className="tablemodal_btn" onClick={addDepartment}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add Department
        </Button>
      </div>
      <DepartmentAddEdit
        showModal={showModal}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        headerText={roleAddEditModalProps.headerText}
        submitButtonText={roleAddEditModalProps.submitButtonText}
        formType={roleAddEditModalProps.formType}
      />

      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this Department"}
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
          rowSelection="multiple"
          components={components}
          onCellClicked={onCellClicked}
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
})(withNamespaces()(Departments));
