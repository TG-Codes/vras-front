import React, { useCallback, useRef, useState } from 'react';
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
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL

const Testimonials = (props) => {
  const gridRef = useRef(null);
  const { userData, t, loginSuccess } = props;
  const authToken = userData.token;
  const [testimonialData, setTestimonialData] = useState([])
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
      let url = `${baseUrL}/admin/testimonials?`;
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
            params.successCallback(response.data.data.testimonials, response.data.data.total);
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
    { field: "name", minWidth:150, maxWidth:200 },
    { field: "message", minWidth:500, maxWidth:550 },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editTestimonial(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteTestimonial(e, params)}
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
  const [showAddModal, setShowAddModal] = useState(false)
  const closeAddModal = () => {
    setShowAddModal(false)
  }
  const [testimonialAddEditModalProps, setTestimonialAddEditModalProps] = useState({});
  const addTestimonial = () => {
    let testimonialAddEditModalPropsTemp = { ...testimonialAddEditModalProps };
    testimonialAddEditModalPropsTemp["formType"] = "add";
    testimonialAddEditModalPropsTemp["headerText"] = "Add Testimonial";
    testimonialAddEditModalPropsTemp["submitButtonText"] = "Submit";
  setTestimonialAddEditModalProps(testimonialAddEditModalPropsTemp);
    setShowAddModal(true)
  }
  const [editObjTestimonials, setEditObjTestimonials] = useState({});
  const editTestimonial = (e, params) => {
    let data = params.data;
    let testimonialAddEditModalPropsTemp = { ...testimonialAddEditModalProps };
    testimonialAddEditModalPropsTemp["formType"] = "edit";
    testimonialAddEditModalPropsTemp["headerText"] = "Edit Testimonial";
    testimonialAddEditModalPropsTemp["submitButtonText"] = "Update";
    setTestimonialAddEditModalProps(testimonialAddEditModalPropsTemp);
    setEditObjTestimonials(data);
    let formDataTemp = { ...formData };
    
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["message"] = data.message;
    setFormData(formDataTemp);
    setShowAddModal(true);
  };
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    message: ""
  });
  const [ testimmonialId, setTestimonialId] = useState(null);
  const [ confirmModal, setConfirmModal] = useState(false);
  const closeConfirmModal = ()=>{
    setConfirmModal(false)
  }
  const deleteTestimonial = (e, params)=>{
    const roleID = params?.data.id;
    setConfirmModal(true);
    setTestimonialId(roleID);
  }
  const confirm = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/testimonials/destroy/${testimmonialId}`,
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
      console.error("Error deleting client:", error);
      loaderStateFalse();
    }
  };
  const [formDataError, setFormDataError] = useState({
    name: "",
    message: "",
  })

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
  
    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else {
        formDataErrorTemp.name = "";
      }
    }
  
    if (name === "message") {
      if (value == "") {
        formDataErrorTemp.message = "Message is required";
      } else {
        formDataErrorTemp.message = "";
      }
    }
  
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };



  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = {
      name: "",
      message: ""
    };

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    if (formData.message === "") {
      isValid = false;
      formDataErrorTemp.message = "Message is required";
    }

    setFormDataError(formDataErrorTemp);

    return isValid;
  };


  const formatData = () => {
    return {
      name: formData.name,
      message: formData.message
    };
  };

  // const handleSubmit = async () => {
  //   try {
  //     let data = formatData();
  //     if (validateForm()) {
  //       const response = await axios({
  //         method: "post",
  //         url: `${baseUrL}/admin/testimonials/store`,
  //         data: data,
  //         headers: {
  //           Authorization: authToken
  //         }
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  // };
  const handleSubmit = async () => {
  
    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      let data;
  
      if (testimonialAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/testimonials/store`;
        method = "post";
      } else {
        data = formatData();
        url = `${baseUrL}/admin/testimonials/update/${formData.id}`;
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
      {/* <div>
        <Button onClick={addTestimonial}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div> */}
      <div className="table_modal_open">
      <h3>{t("testimonialLink")}</h3>
        <Button className="tablemodal_btn" onClick={addTestimonial}><FontAwesomeIcon icon={faUserPlus} />{t("addTestimonial")}</Button>
      </div>
      <TestimonialAddEdit
        showAddModal={showAddModal}
        closeAddModal={closeAddModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <ConfirmationAlert
      showAdminModal={confirmModal}
      closeConfirmationAlert={closeConfirmModal}
      confirm={confirm}
      confirmationText={'delete this Testimonial'}
      headerText={"Delete?"}
      />
      {/* <div>
        <label htmlFor="name">Name:</label>
        <RichTextEditor
          id="name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          error={formDataError.name}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <RichTextEditor
          id="message"
          value={formData.message}
          onChange={(value) => handleInputChange("message", value)}
          error={formDataError.message}
        />
      </div>
      <button onClick={handleSubmit}>Click</button> */}
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
  // console.log("globalState", globalState);
  return {
    userData: globalState.mainReducerData.userData,
  };
}

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(Testimonials));
// export default Testimonials;
