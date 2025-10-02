import React, { useCallback, useRef, useEffect, useState } from 'react';
import RichTextEditor from '../../../../utility/components/RichTextEditor';
import { connect } from 'react-redux';
import { loaderStateFalse, loaderStateTrue, loginSuccess } from '../../../../actions/allActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button } from "react-bootstrap";
import {
  faPlus,
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import TestimonialAddEdit from '../../../../utility/components/TestimonialAddEdit';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "../../../../utility/components/Button";
import ConfirmationAlert from '../../../../utility/components/ConfirmationAlert';
import { toast, Bounce } from 'react-toastify'
import { withNamespaces } from "react-i18next";
import SettingsAddEdit from '../../../../utility/components/admin/SettingsAddEdit';
import Switch from "react-switch";
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL

const Settings = (props) => {
  const gridRef = useRef(null);
  const { loaderStateFalse, loaderStateTrue, userData, t } = props;
  const authToken = userData.token;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
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
      let url = `${baseUrL}/admin/settings?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }

        url += `_start=${startRow + 1}&_end=${endRow}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            const filteredSettings = response.data.data.settings.filter(setting => setting.key !== 'pricing-admin-setting');

            params.successCallback(filteredSettings, response.data.data.total-1);
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
  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  }
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "key", minWidth: 150, maxWidth: 200 },
    { field: "value", minWidth: 300, maxWidth: 400 },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editSettings(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteSettings(e, params)}
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

  const [addEditModal, setAddEditmodal] = useState(false)
  const closeModal = () => {
    setFormData({
      key: "",
      value: ""
    })
    setFormDataError({
      key: "",
      value: ""
    })
    setAddEditmodal(false)
  }
  const [settingAddEditModalProps, setSettingAddEditModalProps] = useState({})
  const addSettings = () => {
    let settingAddEditModalPropsTemp = { ...settingAddEditModalProps }
    settingAddEditModalPropsTemp["formType"] = "add"
    settingAddEditModalPropsTemp["headerText"] = "Add Settings"
    settingAddEditModalPropsTemp["submitButtonText"] = "Add"
    setSettingAddEditModalProps(settingAddEditModalPropsTemp)
    setAddEditmodal(true)
  }
  const [editObjSettings, setEditObjSettings] = useState({})
  const editSettings = (e, params) => {
    let data = params.data;
    let settingAddEditModalPropsTemp = { ...settingAddEditModalProps }
    settingAddEditModalPropsTemp["formType"] = "edit"
    settingAddEditModalPropsTemp["headerText"] = "Edit Settings"
    settingAddEditModalPropsTemp["submitButtonText"] = "Update"
    setSettingAddEditModalProps(settingAddEditModalPropsTemp)
    let formDataTemp = { ...formData }
    formDataTemp["id"] = data.id
    formDataTemp["key"] = data.key
    formDataTemp["value"] = data.value
    setFormData(formDataTemp)
    setAddEditmodal(true)
  }
  const [formData, setFormData] = useState({
    id: "",
    key: "",
    value: ""
  })
  const [formDataError, setFormDataError] = useState({
    key: "",
    value: ''
  })
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);

    formDataTemp[name] = value;
    if (name === "key") {
      if (value == "") {
        formDataErrorTemp.key = "Key is required";
      } else {
        formDataErrorTemp.key = "";
      }
    }

    if (name === "value") {
      if (value == "") {
        formDataErrorTemp.value = "Value is required";
      } else {
        formDataErrorTemp.value = "";
      }
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = {
      key: "",
      value: ""
    };

    if (formData.key === "") {
      isValid = false;
      formDataErrorTemp.key = "Key is required";
    }
    if (formData.value === "") {
      isValid = false;
      formDataErrorTemp.value = "Value is required";
    }

    setFormDataError(formDataErrorTemp);

    return isValid;
  };

  const formatData = () => {
    return {
      key: formData.key,
      value: formData.value
    };
  };
  const handleSubmit = async () => {

    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (settingAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/settings/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/admin/settings/update/${formData.id}`;
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
      loaderStateFalse()
      closeModal()
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false)
  }
  const deleteSettings = (e, params) => {
    let formDataTemp = { ...formData }
    formDataTemp["id"] = params.data.id
    setFormData(formDataTemp)
    setShowConfirmationModal(true)
  }
  const confirm = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/settings/destroy/${formData.id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowConfirmationModal(false);
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
      console.log("Error Deleting client", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrL}/admin/settings`, {
          headers: { Authorization: authToken },
        });
        console.log("response.data.data.settings", response.data.data.settings);

        let settingsData = response.data.data.settings

        if (settingsData.length > 0) {
          settingsData.map((item, index) => {
            if (item.key === 'pricing-admin-setting') {
              let pricingShow = item.value === '1' ? true : false
              console.log("pricing", pricingShow);
              
              setFilterActive(pricingShow);
            }
          })
        }
        resetDataGrid()
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (pricingShow.length > 0) {
  //     const findData = pricingShow.find((item) => item.key === "pricing");
  //     console.log("findData ", findData);

  //     if (findData?.value == 1) {
  //       setFilterActive(true);
  //     }
  //      else {
  //       setFilterActive(false);
  //      }
  //   }
  // }, [pricingShow]);

  useEffect(() => {
    const fetchPricingSettings = async () => {
      try {
        const response = await fetch(`${baseUrL}/settings/pricing-admin-setting`)
        const data = await response.json()
        if (data.success && data.data.value === '1') {
          setFilterActive(true)
        } else {
          setFilterActive(false)
        }
      } catch (error) {
        console.log("Pricing fetching error", error);
        setFilterActive(false)
      }
    }
    fetchPricingSettings()
  }, [])

  const onFilterChange = async (checked) => {
    // console.log("checkedddd", checked);

    setFilterActive(checked);

    const data = {
      key: 'pricing-admin-setting',
      value: checked ? '1' : '0'
    };

    try {
      await axios.put(
        `${baseUrL}/admin/settings/update/${data.key}`,
        data,
        { headers: { Authorization: authToken } }
      );

      toast("Pricing updated successfully", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error updating pricing:", error);
    }
  };

  return (
    <>
      <div className='globaltable_holder'>
        <div className="table_modal_open">
          <h3>{t("settingsLink")}</h3>
          <div className="switch_button">
            <label>{t("pricings")}</label>
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
                  Off
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
                  {/* <i className="fa-regular fa-clock"></i> */}
                  On
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
            <Button className="tablemodal_btn" onClick={addSettings}><FontAwesomeIcon icon={faUserPlus} />{t("addSettings")}</Button>
          </div>
        </div>
        <SettingsAddEdit
          showModal={addEditModal}
          closeModal={closeModal}
          headerText={settingAddEditModalProps.headerText}
          submitButtonText={settingAddEditModalProps.submitButtonText}
          formData={formData}
          formDataError={formDataError}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ConfirmationAlert
          showAdminModal={showConfirmationModal}
          closeConfirmationAlert={closeConfirmationModal}
          confirm={confirm}
          confirmationText={'delete this Setting'}
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
          />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData
  }
}

export default connect(mapStateToProps, {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess
})(withNamespaces()(Settings))