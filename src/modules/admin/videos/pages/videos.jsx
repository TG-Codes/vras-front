import React, { useCallback, useRef, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from 'react-redux';
import { loaderStateFalse, loaderStateTrue, loginSuccess } from '../../../../actions/allActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPencil,
    faTrashCan,
    faUserPlus,
    faCheckCircle,
    faTimesCircle,
    faInfoCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import ConfirmationAlert from '../../../../utility/components/ConfirmationAlert';
import { toast, Bounce } from 'react-toastify'
import { withNamespaces } from "react-i18next";
import Button from '../../../../utility/components/Button';
import axios from 'axios';
import VideosAddEdit from '../../../../utility/components/admin/VideosAddEdit';
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL

const Videos = (props) => {
  const gridRef = useRef(null);
    const {userData, loaderStateFalse, loaderStateTrue, loginSuccess, t} = props;
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
    const datasource = {
      getRows(params) {
        let url = `${baseUrL}/admin/videos?`;
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
              params.successCallback(response.data.data.videos, response.data.data.total);
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
      { field: "url", minWidth:400, maxWidth:500 },
    //   { field: "message", width: '660' },
      {
        field: "Action",
        cellRenderer: (params) => {
          if (params.data) {
            return (
              <div>
                <Button
                  onClick={(e) => editVideos(e, params)}
                  className="action_button edt_btn"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </Button>
                <Button
                  onClick={(e) => deleteVideos(e, params)}
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
    const [formData, setFormData] = useState({
        id: "",
        url: ""
    })
    const [formDataError, setFormDataError] = useState({
        url: ""
    })
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let formDataTemp = Object.assign({}, formData);
        let formDataErrorTemp = Object.assign({}, formDataError);
      
        formDataTemp[name] = value;
        if (name === "url") {
          if (value == "") {
            formDataErrorTemp.url = "URL is required";
          } else {
            formDataErrorTemp.url = "";
          }
        }
        setFormData(formDataTemp);
        setFormDataError(formDataErrorTemp);
      };
      const validateForm = () => {
        let isValid = true;
        let formDataErrorTemp = {
          url: "",
        };
    
        if (formData.url === "") {
          isValid = false;
          formDataErrorTemp.url = "URL is required";
        }
    
        setFormDataError(formDataErrorTemp);
    
        return isValid;
      };
    const [showAddEditModal, setShowAddEditModal] = useState(false)
    const closeAddEditModal = ()=>{
        setFormData({
            url: ""
        })
        setFormDataError({
            url: ""
        })
        setShowAddEditModal(false)
    }
    const [videosAddEditModalProps, setVideoAddEditModalProps] = useState({})
    const addVideos = ()=>{
    let videosAddEditModalPropsTemp = { ...videosAddEditModalProps };
    videosAddEditModalPropsTemp["formType"] = "add";
    videosAddEditModalPropsTemp["headerText"] = "Add Video";
    videosAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setVideoAddEditModalProps(videosAddEditModalPropsTemp);
    setShowAddEditModal(true)
    }
    const [editObjVideos, setEditObjVideos] = useState({})
    const editVideos = (e, params)=>{
        let data = params.data;
        let videosAddEditModalPropsTemp = { ...videosAddEditModalProps };
        videosAddEditModalPropsTemp["formType"] = "edit";
        videosAddEditModalPropsTemp["headerText"] = "Edit Video";
        videosAddEditModalPropsTemp["submitButtonText"] = "Update";
        setVideoAddEditModalProps(videosAddEditModalPropsTemp);
        setEditObjVideos(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["url"] = data.url;
    setFormData(formDataTemp);
    setShowAddEditModal(true);
    }
    const [ videoId, setVideoId] = useState(null);
    const [ confirmModal, setConfirmModal] = useState(false);
    const closeConfirmModal = ()=>{
        setConfirmModal(false)
      }
    const deleteVideos = (e, params)=>{
        let data = params.data
        let formDataTemp = {...formData}
        formDataTemp["id"]= data.id;
        setFormData(formDataTemp)
        setVideoId(data.id)
        setConfirmModal(true)
    }
    const confirm = async () => {
        loaderStateTrue();
        try {
          const response = await axios.delete(
            `${baseUrL}/admin/videos/destroy/${videoId}`,
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          if (response) {
            setConfirmModal(false);
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
          console.error("Error deleting Video:", error);
          loaderStateFalse();
        }
      };
    const formatData = () => {
        return {
          url: formData.url,
        };
      };
      const handleSubmit = async () => {
  
        if (validateForm()) {
          loaderStateTrue();
          let url;
          let method;
          let data;
      
          if (videosAddEditModalProps.formType === "add") {
            data = formatData();
            url = `${baseUrL}/admin/videos/store`;
            method = "post";
          } else {
            data = formatData();
            url = `${baseUrL}/admin/videos/update/${formData.id}`;
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
            closeAddEditModal()
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
  return (
    <>
    <div className='globaltable_holder'>
    <div className="table_modal_open">
    <h3>{t("videos")}</h3>
        <Button className="tablemodal_btn" onClick= {addVideos}><FontAwesomeIcon icon={faUserPlus} />{t("addVideos")}</Button>
      </div>
      <VideosAddEdit
      showModal={showAddEditModal}
      closeModal={closeAddEditModal}
      headerText={videosAddEditModalProps.headerText}
      submitButtonText={videosAddEditModalProps.submitButtonText}
      formData={formData}
      formDataError={formDataError}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      />
      <ConfirmationAlert
      showAdminModal={confirmModal}
      closeConfirmationAlert={closeConfirmModal}
      confirm={confirm}
      confirmationText={'delete this Video'}
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
  )
}

const mapStateToProps = (globalState) => {
    // console.log("globalState", globalState);
    return {
      userData: globalState.mainReducerData.userData,
    };
  }
  
  export default connect(mapStateToProps, {
    loaderStateTrue,
    loaderStateFalse,
    loginSuccess,
  })(withNamespaces()(Videos));
// export default Videos