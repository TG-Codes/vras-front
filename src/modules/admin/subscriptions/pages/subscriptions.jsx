import i18next from "i18next";
import React, { useEffect, useRef } from "react";
import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SubscriptionAddEdit from "../../../../utility/components/SubscriptionAddEdit";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import Button from "../../../../utility/components/Button";
import pen from "../../../../utility/assets/images/pen.svg";
import trash from "../../../../utility/assets/images/trash.svg";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
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
import bubble_img from "../../../../utility/assets/images/bubble_chart.png"
import { withNamespaces } from "react-i18next";
import BackButton from "../../../../utility/components/BackButton";
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const Clients = (props) => {
  const gridRef = useRef(null);
  const { userData, loaderStateTrue, loaderStateFalse, loginSuccess, t } = props;
  const authToken = userData.token;
  const [subscriptionID, setSubscriptionID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
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

  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // {
    //   headerName: "Select",
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 50,
    // },
    { field: "name", minWidth:150, maxWidth:200},
    { field: "price", minWidth:150, maxWidth:200 },
    // { field: "numberOfUsers" },
    // { field: "numberOfDays" },
    // { field: "description" },

    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <div>
              <Button
                onClick={(e) => editClient(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              {/* <Button
                onClick={(e) => deleteClient(e, params)}
                className="action_button del_btn"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button> */}
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ]);

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/subscriptions`, {
        headers: {
          Authorization: authToken,
        },
      });
      setSubscriptionData(response.data.data.subscriptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      price: "",
      numberOfUsers: "",
      numberOfDays: "",
      description: "",
    });
    setFormDataError({
      name: "",
      price: "",
      numberOfUsers: "",
      numberOfDays: "",
      description: "",
    });
    setClientAddEditModalProps({});
    setEditObjClient({});
  };

  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    numberOfUsers: "",
    numberOfDays: "",
    description: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    price: "",
    numberOfUsers: "",
    numberOfDays: "",
    description: "",
  });

  const [editObjClient, setEditObjClient] = useState({});
  const editClient = (e, params) => {
    let data = params.data;
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "edit";
    clientAddEditModalPropsTemp["headerText"] = "Edit Subscription";
    clientAddEditModalPropsTemp["submitButtonText"] = "Update";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setEditObjClient(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["price"] = data.price;
    // formDataTemp["numberOfUsers"] = data.numberOfUsers;
    // formDataTemp["numberOfDays"] = data.numberOfDays;
    formDataTemp["description"] = data.description;
    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteClient = async (e, params) => {
    const subscriptionID = params?.data.id;
    setShowAdminModal(true);
    setSubscriptionID(subscriptionID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/subscriptions/destroy/${subscriptionID}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowAdminModal(false);
        fetchData();
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

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    if (formData.price === "") {
      isValid = false;
      formDataErrorTemp.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      isValid = false;
      formDataErrorTemp.price = "Please provide valid price";
    }

    // if (formData.numberOfUsers === "") {
    //   isValid = false;
    //   formDataErrorTemp.numberOfUsers = "Number of users is required";
    // }else if (!/^\d+$/.test(formData.numberOfUsers)) {
    //   isValid = false;
    //   formDataErrorTemp.numberOfUsers = "Please provide valid Number of users";
    // }else if (formData.numberOfUsers <= 0) {
    //   isValid = false;
    //   formDataErrorTemp.numberOfUsers = "Number of users must be greater than zero";
    // }

    // if (formData.numberOfUsers === "") {
    //   isValid = false;
    //   formDataErrorTemp.numberOfUsers = "numberOfUsers is required";
    // }

    // if (formData.numberOfDays === "") {
    //   isValid = false;
    //   formDataErrorTemp.numberOfDays = "Number of days is required";
    // }else if (!/^\d+$/.test(formData.numberOfDays)) {
    //   isValid = false;
    //   formDataErrorTemp.numberOfDays = "Please provide valid Number of days";
    // }else if (formData.numberOfDays <= 0) {
    //   isValid = false;
    //   formDataErrorTemp.numberOfDays = "Number of days must be greater than zero";
    // }

    // if (formData.description === "") {
    //   isValid = false;
    //   formDataErrorTemp.description = "Description is required";
    // }
    setFormDataError(formDataErrorTemp);
    return isValid;
  };

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
      }  else {
        formDataErrorTemp.name = "";
      }
    }

    if (name === "price") {
      // if (value == "") {
      //   formDataErrorTemp.price = "Price is required";
      // } else {
      //   formDataErrorTemp.price = "";
      // }
      if (value === "") {
        formDataErrorTemp.price = "Price is required";
      } if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        formDataErrorTemp.price = "Please provide a valid price";
      } else {
        formDataErrorTemp.price = "";
      }
    }
    // if (name === "numberOfUsers") {
    //   // if (value == "") {
    //   //   formDataErrorTemp.numberOfUsers = "Number of users is required";
    //   // } else {
    //   //   formDataErrorTemp.numberOfUsers = "";
    //   // }
    //   if (value === "") {
    //     formDataErrorTemp.numberOfUsers = "Number of users is required";
    //   }else if (value <= 0) {
    //     formDataErrorTemp.numberOfUsers = "Number of users must be greater than 0";
    //   } else if (!/^\d+$/.test(value)) {
    //     formDataErrorTemp.numberOfUsers = "Please provide valid Number of users";
    //   } else {
    //     formDataErrorTemp.numberOfUsers = "";
    //   }
    // }

    // if (name === "numberOfDays") {
    //   // if (value == "") {
    //   //   formDataErrorTemp.numberOfDays = "Number of days is required";
    //   // } else {
    //   //   formDataErrorTemp.numberOfDays = "";
    //   // }
    //   if (value === "") {
    //     formDataErrorTemp.numberOfDays = "Number of days is required";
    //   }else if (value <= 0) {
    //     formDataErrorTemp.numberOfDays = "Number of days must be greater than 0";
    //   } else if (!/^\d{1,3}$/.test(value)) {
    //     if (value.length > 3) {
    //       formDataErrorTemp.numberOfDays = "Number of days should not exceed 3 digits";
    //     } else {
    //       formDataErrorTemp.numberOfDays = "Please provide a valid number of days";
    //     }
    //   } else {
    //     formDataErrorTemp.numberOfDays = "";
    //   }
    // }

    // if (name === "description") {
    //   if (value == "") {
    //     formDataErrorTemp.description = "Description is required";
    //   } else {
    //     formDataErrorTemp.description = "";
    //   }
    // }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["name"] = formData.name;
    data["price"] = formData.price;
    // data["numberOfUsers"] = formData.numberOfUsers;
    // data["numberOfDays"] = formData.numberOfDays;
    data["description"] = formData.description;
    return data;
  };
  // const handleSubmit = async () => {
  //   const { loaderStateTrue, loaderStateFalse } = props;
  //   if (validateForm() && clientAddEditModalProps.formType === "add") {
  //     console.log("formatData", formatData());
  //     loaderStateTrue();
  //     try {
  //       let data = formatData();
  //       const response = await axios({
  //         method: "post",
  //         url: `${baseUrL}/admin/subscriptions/store`,
  //         data: data,
  //         headers: {
  //           Authorization: authToken,
  //         },
  //       });
  //       setShowModal(false);
  //       loaderStateFalse();
  //       fetchData();
  //       console.log(`response check ${response.data.data}`);
  //     } catch (userResponse) {
  //       console.log("error in post", userResponse.response.data.error);
  //       loaderStateFalse();
  //     }
  //   } else {
  //     try {
  //       let data = formatData();
  //       console.log("data", data);
  //       const response = await axios({
  //         method: "put",
  //         url: `${baseUrL}/admin/subscriptions/update/${formData.id}`,
  //         data: data,
  //         headers: {
  //           Authorization: authToken,
  //         },
  //       });
  //       setShowModal(false);
  //       loaderStateFalse();
  //       console.log(`response check ${response.data}`);
  //       fetchData();
  //     } catch (error) {
  //       loaderStateFalse();
  //       if (error.response) {
  //         if (error.response.status == 422) {
  //           let resData = error.response.data;
  //           if (resData.success === false) {
  //             console.log("resData====>", resData);
  //             let formDataErrorTemp = { ...formDataError };
  //             let responseData = resData.data;
  //             let obj = Object.keys(responseData);
  //             if (obj.length > 0) {
  //               obj.map((item, index) => {
  //                 if (responseData[item]) {
  //                   // if (item == "username") {
  //                   //   formDataErrorTemp.name = responseData[item].message;
  //                   // } else {
  //                   formDataErrorTemp[item] = responseData[item].message;
  //                   // }
  //                 }
  //               });
  //               setFormDataError(formDataErrorTemp);
  //             }
  //           }
  //         }
  //       } else {
  //         Utility.toastNotifications(error.message, "Error", "error");
  //       }
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (validateForm(clientAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;

      if (clientAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/subscriptions/store`;
        method = "post";
      } else {
        let { password, confirmPassword, ...newObj } = formatData();
        data = newObj;
        url = `${baseUrL}/admin/subscriptions/update/${formData.id}`;
        method = "put";
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
      fetchData();
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
      closeModal()
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
  const deleteButton = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedRows = selectedNodes.map((node) => node.data.id);
  };
  const [clientAddEditModalProps, setClientAddEditModalProps] = useState({});
  const addClient = () => {
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "add";
    clientAddEditModalPropsTemp["headerText"] = "Add Subscription";
    clientAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setShowModal(true);
  };

  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridRef.current = params.api;
    gridRef.current.sizeColumnsToFit();
  });

  const resetDataGrid = () => {
    var datasource = serverSideDataSource();
    gridApi.setDatasource(datasource);
  };

  const serverSideDataSource = () => {
    return {
      getRows(params) {
        const { startRow, endRow, filterModel, sortModel } = params;
      },
    };
  };

  const gridOptions = useMemo(
    () => ({
      infiniteInitialRowCount: 1,
      // paginationPageSize: 1,
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
  return (
    <>
    <div className="globaltable_holder">
      {/* <div> */}
        <div className="table_modal_open">
        <div className="back_btn_caption_hold">
        <BackButton
            className={"back-button"}
            to={"/admin/dashboard"}
            />
            <span className="icn_bk_btn"><img src={bubble_img}/></span>
        <h3>{t("subscriptions")}</h3>
        </div>
           <Button className="tablemodal_btn" onClick={addClient}><FontAwesomeIcon icon={faUserPlus} />{t("addSubscriptions")}</Button>
        </div>

        <SubscriptionAddEdit
          formData={formData}
          formDataError={formDataError}
          showModal={showModal}
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          headerText={clientAddEditModalProps.headerText}
          submitButtonText={clientAddEditModalProps.submitButtonText}
          formType={clientAddEditModalProps.formType}
        />
      {/* </div> */}
      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this Subscription list"}
        headerText={"Delete?"}
      />
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={subscriptionData}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowSelection="multiple"
        />
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, loginSuccess })(
  withNamespaces()(Clients)
);
