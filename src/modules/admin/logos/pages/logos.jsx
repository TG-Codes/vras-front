import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import defaultImg from '../../../../utility/assets/images/select_image.png'
import LogoAddEdit from '../../../../utility/components/admin/LogoAddEdit';
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const Logos = (props) => {
  const gridRef = useRef(null);
  const {userData, loaderStateFalse, loaderStateTrue, loginSuccess, t} = props;
  const authToken = userData.token;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const rowHeight = 70;
  const headerHeight = 60;

  const [columnDefs, setColumnDefs] = useState([
    // { field: "id" },
    // { field: "name" },
    // { field: "slug" },
    {
      field: "image", minWidth:300, maxWidth:350,
      cellRenderer: (params) => {
        if (params.data) {
          // const { status } = params.data;
          return (
            <div>
              {/* <img src={testImg} alt="failed  to load" style={{ width: '50px', height: '50px' }}/> */}
              <img
                src={`${imageUrl}/${params.data.image}`}
                alt="failed  to load"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "Action",
      cellClass: "table-action-cell",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editLogo(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteLogos(e, params)}
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
      let url = `${baseUrL}/admin/logos?`;
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
            if (response.data.data.logos.length > 0) {
              params.successCallback(
                response.data.data.logos,
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
  const [formData, setFormData] = useState({
    id: "",
    image: defaultImg
  })  
  const [formDataError, setFormDataError] = useState({
    image: defaultImg
  })

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLabel, setImageLabel] = useState("Choose Image");
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener('change', handleImageChange);
    }

    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener('change', handleImageChange);
      }
    };
  }, []);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
     setSelectedImage(URL.createObjectURL(imageFile));
     let formDataTemp = {...formData}
     formDataTemp["image"] = imageFile
     setFormData(formDataTemp)
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageLabel("Choose Image");
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [addEditModal, setAddEditModal] = useState(false)
  const closeModal = ()=>{
    setAddEditModal(false)
  }
  const [logoAddEditLogoModalProps, setLogoAddEditModalProps] = useState({})
  const addLogo = ()=>{
    let logoAddEditModalPropsTemp = { ...logoAddEditLogoModalProps };
    logoAddEditModalPropsTemp["formType"] = "add";
    logoAddEditModalPropsTemp["headerText"] = "Add Logo";
    logoAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setLogoAddEditModalProps(logoAddEditModalPropsTemp);
    let formDataTemp = {...formData}
    formDataTemp["image"] = defaultImg
    setFormData(formDataTemp)
    setAddEditModal(true);
  }
  const [editObjLogos, setEditObjLogos] = useState({});
  const editLogo = (e, params)=>{
    let data = params.data;
    let logoAddEditModalPropsTemp = { ...logoAddEditLogoModalProps };
    logoAddEditModalPropsTemp["formType"] = "edit";
    logoAddEditModalPropsTemp["headerText"] = "Edit Logo";
    logoAddEditModalPropsTemp["submitButtonText"] = "Update";
    setLogoAddEditModalProps(logoAddEditModalPropsTemp);
    setEditObjLogos(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["image"] = `${imageUrl}/${data.image}`;
    setFormData(formDataTemp);
    setAddEditModal(true);
  }
  const formatData = () => {
    let data = new FormData();
    data.append("image", formData.image)
    return data;
  };
  const handleSubmit = async () => {
    // if (validateForm(logoAddEditLogoModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (logoAddEditLogoModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/logos/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/admin/logos/update/${formData.id}`;
        method = "put";
      }
      addEditPostData(url, data, method);
    // }
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const closeConfirmationAlert = () => {
    setShowConfirmationModal(false);
  };
  const deleteLogos= (e, params)=>{
    let formDataTemp = {...formData}
    formDataTemp["id"] = params.data.id
    setFormData(formDataTemp)
    setShowConfirmationModal(true)
  }
  const confirm = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/logos/destroy/${formData.id}`,
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
      console.error("Error deleting Blog:", error);
      loaderStateFalse();
    }
  };
  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <h3>{t("logos")}</h3>
        <Button className="tablemodal_btn" onClick={addLogo}>
          <FontAwesomeIcon icon={faUserPlus} /> {t("addLogos")}
        </Button>
      </div>
      <LogoAddEdit
      showAddEditModal={addEditModal}
      closeModal={closeModal}
      formData={formData}
      formDataError={formDataError}
      selectedImage={selectedImage}
        imageLabel={imageLabel}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        handleImageClick={handleImageClick}
        handleSubmit={handleSubmit}
        headerText={logoAddEditLogoModalProps.headerText}
        submitButtonText={logoAddEditLogoModalProps.submitButtonText}
      />
      <ConfirmationAlert
      showAdminModal={showConfirmationModal}
      closeConfirmationAlert={closeConfirmationAlert}
      confirm={confirm}
      confirmationText={"delete this Logo?"}
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
  )
}

const mapStateToProps = (globaleState)=>{
  return {
    userData : globaleState.mainReducerData.userData
  }
}

export default connect(mapStateToProps,{
  loginSuccess,
  loaderStateTrue,
  loaderStateFalse
})(withNamespaces()(Logos))