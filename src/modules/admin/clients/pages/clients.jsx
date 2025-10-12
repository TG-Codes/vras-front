import i18n from "../../../../i18n";
import React, { useEffect, useRef } from "react";
import { useState, useCallback, useMemo } from "react";
import Button from "../../../../utility/components/Button";
import { AgGridReact } from "ag-grid-react";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ClientAddEdit from "../../../../utility/components/ClientAddEdit";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
import ApproveModal from "../../../../utility/components/admin/ApproveModal";
import InfoModal from "../../../../utility/components/admin/InfoModal";
import testImg from "../../../../utility/assets/images/jadon-kelly-Qo_2hhoqC3k-unsplash.jpg";
import client_img from "../../../../utility/assets/images/client.png";
import RejectModal from "../../../../utility/components/admin/RejectModal";
import { withNamespaces } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import BackButton from "../../../../utility/components/BackButton";
const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const Clients = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse, loginSuccess, t } =
    props;
  const location = useLocation();
  const gridRef = useRef(null);


  const isOnline = location.search?.split("?")[1]?.slice(-1);
  const authToken = userData.token;
  const [clientID, setClientID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [environmentData, setEnvironmentData] = useState([]);
  const [scenarioData, setScenarioData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    { field: "name", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Online Status", 
      minWidth: 140, 
      maxWidth: 160,
      cellRenderer: (params) => {
        if (params.data && params.data.isOnline !== undefined) {
          const isOnline = params.data.isOnline === 1;
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: isOnline ? '#28a745' : '#dc3545',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite'
                }}
              />
              <span style={{ 
                color: isOnline ? '#28a745' : '#dc3545',
                fontWeight: '500',
                fontSize: '13px'
              }}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          );
        }
        return null;
      },
    },
    { field: "email", minWidth: 300, maxWidth: 400 },
    // { field: "countryCode", minWidth: 150, maxWidth: 200 },
    // { field: "mobile", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Mobile",
      valueGetter: (params) => {
        const countryCode = params.data?.countryCode || "";
        const mobile = params.data?.mobile || "";
        return `${countryCode} ${mobile}`.trim();
      },
      minWidth: 200,
      maxWidth: 300,
    },
    { field: "subscription.name", minWidth: 200, maxWidth: 250 },
    {
      headerName: "Environment",
      valueGetter: (params) =>
        params.data && params.data.environment?.name
          ? params.data.environment.name
          : null,
      minWidth: 150, maxWidth: 200
    },
    {
      headerName: "No. of Scenarios",
      valueGetter: (params) =>
        params.data && params.data.scenarios
          ? params.data.scenarios.length
          : null, minWidth: 150, maxWidth: 200
    },
    // { field: "scenario" },
    {
      headerName: "No. of departments",
      valueGetter: (params) =>
        params.data && params.data.departments
          ? params.data.departments.length
          : null, minWidth: 150, maxWidth: 200
    },
    // { field: "department" },
    {
      headerName: "Pro Users",
      valueGetter: (params) =>
        params.data && params.data.numberOfProUsers !== undefined
          ? params.data.numberOfProUsers
          : null, minWidth: 150, maxWidth: 200
    },
    {
      headerName: "Parallel Users",
      valueGetter: (params) =>
        params.data && params.data.numberOfUsers !== undefined
          ? params.data.numberOfUsers
          : null, minWidth: 150, maxWidth: 200
    },
    {
      headerName: "Pay Status",
      valueGetter: (params) =>
        params.data && params.data.payStatus ? params.data.payStatus : null, minWidth: 150, maxWidth: 200
    },
    { field: "address", minWidth: 150, maxWidth: 200 },
    { field: "city", minWidth: 150, maxWidth: 200 },
    { field: "postalCode", minWidth: 150, maxWidth: 200 },
    { field: "country", minWidth: 150, maxWidth: 200 },
    { field: "notes", minWidth: 150, maxWidth: 200 },
    { field: "contactName", minWidth: 150, maxWidth: 200 },
    { field: "contactEmail", minWidth: 300, maxWidth: 400 },
    // { field: "contactCountryCode", minWidth: 150, maxWidth: 200 },
    // { field: "contactMobile", minWidth: 200, maxWidth: 250 },
    {
      headerName: "ContactMobile",
      valueGetter: (params) => {
        const contactCountryCode = params.data?.contactCountryCode || "";
        const mobile = params.data?.contactMobile || "";
        return `${contactCountryCode} ${mobile}`.trim();
      },
      minWidth: 200,
      maxWidth: 300,
    },
    {
      field: "Action", minWidth: 150, maxWidth: 200,
      cellClass: "table-action-cell",
      cellRenderer: (params) => {
        if (params.data) {
          const { status } = params.data;
          const isInactive = status === "inactive";
          const isActive = status === "active";
          return (
            <div>
              <Button
                onClick={(e) => editClient(e, params)}
                className="action_button edt_btn"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button
                onClick={(e) => deleteClient(e, params)}
                className="action_button del_btn"
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              {isInactive && (
                <Button
                  className="action_button approve_btn"
                  onClick={(e) => approveClient(e, params)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                </Button>
              )}
              {isActive && (
                <Button
                  className="action_button reject_btn"
                  onClick={(e) => rejectClient(e, params)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              )}
              {/* <Button
                onClick={(e) => infoClient(e, params)}
                className="action_button info_btn"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </Button> */}
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ]);

  const [editObjClient, setEditObjClient] = useState({});

  const editClient = (e, params) => {
    setEnvironmentStatus(false);
    if (params.data.endAt) {
      const endDateValue = new Date(params.data.endAt);
      setEndDate(endDateValue);
    }
    // scenarioApi()
    environmentApi();
    subscriptionApi();
    let data = params.data;
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "edit";
    clientAddEditModalPropsTemp["headerText"] = "Edit Client";
    clientAddEditModalPropsTemp["submitButtonText"] = "Update";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setEditObjClient(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["numberOfProUsers"] = data.numberOfProUsers;
    formDataTemp["numberOfUsers"] = data.numberOfUsers;
    formDataTemp["name"] = data.name;
    formDataTemp["email"] = data.email;
    formDataTemp["gender"] = data.gender;
    // formDataTemp["primaryHand"] = data.primaryHand;
    formDataTemp["countryCode"] = data.countryCode;
    const countryCode = data.countryCode;
    const phoneNumber = data.mobile;
    formDataTemp["phoneNumber"] = `${countryCode}${phoneNumber}`;
    // formDataTemp["slug"] = data.slug;
    // formDataTemp["username"] = data.users[0].username;
    formDataTemp["address"] = data.address;
    formDataTemp["city"] = data.city;
    formDataTemp["postalCode"] = data.postalCode;
    formDataTemp["country"] = data.country;
    formDataTemp["notes"] = data.notes;
    formDataTemp["contactName"] = data.contactName;
    formDataTemp["contactEmail"] = data.contactEmail;
    formDataTemp["countryCode"] = data.countryCode;
    const contactCountryCode = data.contactCountryCode;
    const contactPhoneNumber = data.contactMobile;
    formDataTemp["contactPhoneNumber"] = `${contactCountryCode}${contactPhoneNumber}`;
    if (data.subscription) {
      let subscription = {
        label: data.subscription.name,
        value: data.subscription.id,
        numberOfUsers: data.numberOfUsers,
      };
      formDataTemp["subscriptionId"] = subscription;
    }
    if (data.environment) {
      let environment = {
        label: data.environment.name,
        value: data.environment.id,
      };
      formDataTemp["environmentId"] = environment;
    }
    let filteredScenarioData = [];
    if (data.scenarios) {
      let scenarioArr = data.scenarios?.map((item) => {
        filteredScenarioData.push({
          label: item.name,
          value: item.id,
        });
      });
    }
    formDataTemp["scenarioId"] = filteredScenarioData;
    setFormData(formDataTemp);
    setShowModal(true);
  };
  const deleteClient = async (e, params) => {
    const clientId = params?.data.id;
    setShowAdminModal(true);
    setClientID(clientId);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/clients/destroy/${clientID}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response) {
        setShowAdminModal(false);
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
      console.error("Error deleting client:", error);
      loaderStateFalse();
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setScenarioData([]);
    setEnvironmentStatus(true);
    setFormData({
      id: "",
      subscriptionId: {},
      environmentId: {},
      scenarioId: [],
      numberOfUsers: "",
      numberOfProUsers: "",
      slug: "",
      name: "",
      countryCode: "+972",
      phoneNumber: "",
      email: "",
      username: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalConditions: "",
      contactName: "",
      contactEmail: "",
      contactCountryCode: "",
      contactPhoneNumber: "",
      allergies: "",
      startAt: "",
      endAt: "",
      notes: "",
    });
    setFormDataError({
      id: "",
      subscriptionId: {},
      environmentId: {},
      scenarioId: [],
      numberOfUsers: "",
      numberOfProUsers: "",
      slug: "",
      name: "",
      countryCode: "+972",
      phoneNumber: "",
      email: "",
      username: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      contactName: "",
      contactEmail: "",
      contactCountryCode: "",
      contactPhoneNumber: "",
      medicalConditions: "",
      allergies: "",
      startAt: "",
      endAt: "",
      notes: "",
    });
    setClientAddEditModalProps({});
    setEditObjClient({});
  };

  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };

  const [formData, setFormData] = useState({
    id: "",
    subscriptionId: {},
    environmentId: {},
    scenarioId: [],
    numberOfUsers: "",
    numberOfProUsers: "",
    slug: "",
    name: "",
    countryCode: "+972",
    phoneNumber: "",
    email: "",
    username: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    contactName: "",
    contactEmail: "",
    contactCountryCode: "",
    contactPhoneNumber: "",
    medicalConditions: "",
    allergies: "",
    startAt: "",
    endAt: "",
    notes: "",
  });
  const [environmentStatus, setEnvironmentStatus] = useState(true);

  const [formDataError, setFormDataError] = useState({
    id: "",
    subscriptionId: {},
    environmentId: {},
    scenarioId: [],
    numberOfUsers: "",
    numberOfProUsers: "",
    slug: "",
    name: "",
    countryCode: "+972",
    phoneNumber: "",
    email: "",
    username: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    contactName: "",
    contactEmail: "",
    contactCountryCode: "",
    contactPhoneNumber: "",
    medicalConditions: "",
    allergies: "",
    startAt: "",
    endAt: "",
    notes: "",
  });

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
    if (Object.keys(formData.subscriptionId).length === 0) {
      isValid = false;
      formDataErrorTemp.subscriptionId = "Subscription is required";
    }
    // if (Object.keys(formData.environmentId).length === 0) {
    //   isValid = false;
    //   formDataErrorTemp.environmentId = "Environment is required";
    // }
    if (formData.phoneNumber === "" || formDataError?.phoneNumber.length > 0) {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Phone Number is required";
    }

    if (formData.numberOfUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfUsers = "Number of Parallel user is required";
    } else if (!/^[1-9]\d*$/.test(formData.numberOfUsers)) {
      isValid = false;
      formDataErrorTemp.numberOfUsers = "Please provide valid parallel user number.";
    }

    if (formData.numberOfProUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfProUsers = "Number of Pro user is required";
    } else if (!/^[0-9]\d*$/.test(formData.numberOfProUsers)) {
      isValid = false;
      formDataErrorTemp.numberOfProUsers =
        "Please provide valid Pro User Number";
    }

    // if (formData.scenarioId.length == 0) {
    //   isValid = false;
    //   formDataErrorTemp.scenarioId = "Scenario is required";
    // }

    if (
      formData.username === "" &&
      clientAddEditModalProps.formType !== "edit"
    ) {
      isValid = false;
      formDataErrorTemp.username = "Username is required";
    }

    // if (formData.slug === "" && params === "add") {
    //   isValid = false;
    //   formDataErrorTemp.slug = "Slug is required";
    // }

    if (formData.postalCode === null || formData.postalCode === "") {
      // If postal code is null or an empty string, clear the error
      formDataErrorTemp.postalCode = "";
    } else {
      // Check if the postal code is numeric
      if (!/^\d+$/.test(formData.postalCode)) {
        isValid = false;
        formDataErrorTemp.postalCode = "Postal Code must be numeric";
      }
      else {
        formDataErrorTemp.postalCode = "";
      }
    }


    if (/[0-9\W_]/.test(formData.city)) {
      isValid = false;
      formDataErrorTemp.city = "City name is invalid";
    } else {
      formDataErrorTemp.city = "";
    }

    if (/[0-9\W_]/.test(formData.country)) {
      isValid = false;
      formDataErrorTemp.country = "Country name is invalid";
    } else {
      formDataErrorTemp.country = "";
    }

    if (
      !/^\d{10}$/.test(formData.emergencyContactPhone) &&
      formData.emergencyContactPhone !== ""
    ) {
      isValid = false;
      formDataErrorTemp.emergencyContactPhone =
        "Please provide valid Emergency Contact Number";
    } else {
      formDataErrorTemp.emergencyContactPhone = "";
    }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };
  const validateApproveForm = (params) => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.numberOfProUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfProUsers = "Number of Pro user is required";
    } else if (!/^[0-9]\d*$/.test(formData.numberOfProUsers)) {
      isValid = false;
      formDataErrorTemp.numberOfProUsers =
        "Please provide valid Pro User Number";
    }

    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const handlePhoneNumberChange = (value, country) => {
    const countryCode = `+${country?.dialCode}`;
    const startingCode = countryCode.split('+')[1];
    console.log("cosnole", country)
    const prefix = "startingCode";
    let modifiedValue;
    let excludedPart = "";

    if (value.startsWith(startingCode)) {
      modifiedValue = value.slice(startingCode.length);
    }
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };


    console.log(value.startsWith(startingCode), value, 'countryCode=>');

    formDataTemp["phoneNumber"] = value;
    formDataTemp["countryCode"] = `+${country?.dialCode}`;
    setFormData(formDataTemp)
    const digitsOnly = value.replace(/[^0-9]/g, "");
    if (digitsOnly.length === 0) {
      formDataErrorTemp["phoneNumber"] = "Phone number is required";
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      formDataErrorTemp["phoneNumber"] = "Please enter a valid phone number (10-15 digits)";
    } else {
      formDataErrorTemp["phoneNumber"] = "";
    }
    setFormDataError(formDataErrorTemp)
  }

  const handleContactPhoneNumberChange = (value, country) => {
    const countryCode = `+${country?.dialCode}`;
    const startingCode = countryCode.split('+')[1];
    console.log("cosnole", country)
    const prefix = "startingCode";
    let contactModifiedValue;
    let contactExcludedPart = "";

    if (value.startsWith(startingCode)) {
      contactModifiedValue = value.slice(startingCode.length); // Remove the prefix
    }
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };


    console.log(value.startsWith(startingCode), value, 'countryCode=>');

    formDataTemp["contactPhoneNumber"] = value;
    formDataTemp["contactCountryCode"] = `+${country?.dialCode}`;
    setFormData(formDataTemp)
    const digitsOnly = value.replace(/[^0-9]/g, "");
    if (digitsOnly.length === 0) {
      formDataErrorTemp["contactPhoneNumber"] = "Phone number is required";
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      formDataErrorTemp["contactPhoneNumber"] = "Please enter a valid phone number (10-15 digits)";
    } else {
      formDataErrorTemp["contactPhoneNumber"] = "";
    }
    setFormDataError(formDataErrorTemp)
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);

    formDataTemp[name] = value;
    if (name === "name") {
      if (value == "") {
        formDataErrorTemp.name = "Name is required";
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else {
        formDataTemp.slug = generateSlug(value);
        formDataErrorTemp.name = "";
        formDataErrorTemp.slug = "";
      }
    }

    if (name === "email") {
      if (value == "") {
        formDataErrorTemp.email = "Email is required";
      } else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "username" && clientAddEditModalProps.formType !== "edit") {
      if (value == "") {
        formDataErrorTemp.username = "Username is required";
      } else {
        formDataErrorTemp.username = "";
      }
    }

    // if (name === "slug") {
    //   if (value == "") {
    //     formDataErrorTemp.slug = "Slug is required";
    //   } else {
    //     formDataErrorTemp.slug = "";
    //   }
    // }

    if (name === "subscriptionId") {
      if (Object.keys(value).length === 0) {
        formDataErrorTemp.subscriptionId = "Subscription is required";
      } else {
        formDataErrorTemp.subscriptionId = "";
      }
    }
    if (name === "environmentId") {
      if (Object.keys(value).length === 0) {
        formDataErrorTemp.environmentId = "Environment is required";
      } else {
        formDataErrorTemp.environmentId = "";
      }
    }

    // if (name === "phoneNumber") {
    //   if (value === "") {
    //     formDataErrorTemp.phoneNumber = "Phone Number is required";
    //   } else if (!/^\d{10}$/.test(value)) {
    //     formDataErrorTemp.phoneNumber = "Please provide valid Phone Number";
    //   } else {
    //     formDataErrorTemp.phoneNumber = "";
    //   }
    // }

    if (name === "numberOfUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfUsers = "Parallel user is required";
      } else if (!/^[0-9]\d*$/.test(value)) {
        formDataErrorTemp.numberOfUsers =
          "Please provide a valid number of users";
      } else {
        formDataErrorTemp.numberOfUsers = "";
      }
    }

    if (name === "numberOfProUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfProUsers = "Pro user is required";
      } else if (!/^[0-9]\d*$/.test(value)) {
        formDataErrorTemp.numberOfProUsers =
          "Please provide a valid number of pro users";
      } else {
        formDataErrorTemp.numberOfProUsers = "";
      }
    }

    // if (name === "numberOfProUsers") {
    //   if (value === "") {
    //     formDataErrorTemp.numberOfProUsers = "Pro user is required";
    //   } else {
    //     formDataErrorTemp.numberOfProUsers = "";
    //   }
    // }

    if (name === "slug") {
      if (value == "") {
        formDataErrorTemp.slug = "Slug is required";
      } else {
        formDataErrorTemp.slug = "";
      }
    }
    // if (name === "postalCode") {
    //   if (!/^\d{5}$/.test(value) && value !== "") {
    //     formDataErrorTemp.postalCode = "Postal Code is invalid";
    //   } else {
    //     formDataErrorTemp.postalCode = "";
    //   }
    // }
    if (name === "postalCode") {
      if (!value) {
        // If no value is provided, set the error to an empty string.
        formDataErrorTemp.postalCode = "";
      } else if (!/^\d+$/.test(value)) {
        // If the value contains any non-digit characters, set the error message accordingly.
        formDataErrorTemp.postalCode = "Postal code must be a number";
      } else {
        // If all conditions are met, clear the error.
        formDataErrorTemp.postalCode = "";
      }
    }
    if (name === "city") {
      if (/[0-9\W_]/.test(value)) {
        formDataErrorTemp.city = "City name is invalid";
      } else {
        formDataErrorTemp.city = "";
      }
    }
    if (name === "country") {
      if (/[0-9\W_]/.test(value)) {
        formDataErrorTemp.country = "Country name is invalid";
      } else {
        formDataErrorTemp.country = "";
      }
    }
    if (name === "emergencyContactPhone") {
      if (!/^\d{10}$/.test(value) && value !== "") {
        formDataErrorTemp.emergencyContactPhone =
          "Please provide valid Emergency Contact Number";
      } else {
        formDataErrorTemp.emergencyContactPhone = "";
      }
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const [selectedGender, setSelectedGender] = useState("male");
  const genderValue = ["male", "female"];
  const [selectedPrimaryHand, setSelectedPrimaryHand] = useState("right");
  const handValue = ["right", "left"];
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
      }-${year}`;
  };
  const formattedDateOfBirth = formatDate(dateOfBirth);
  const [startSubscriptionDate, setStartSubscriptionDate] = useState(
    new Date()
  );
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formattedStartDate = startSubscriptionDate.toISOString().split("T")[0];
  const [endDate, setEndDate] = useState(tomorrow);
  // const formattedendDate = endDate.toISOString().split("T")[0];
  const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : "";
  const scenarioValue = formData.scenarioId;
  const formattedScenarioValue = scenarioValue.map((item) => item.value);

  const formatData = () => {
    const countryCode = formData.countryCode;
    const startingCode = countryCode.split('+')[1];
    let modifiedValue = formData.phoneNumber.slice(startingCode.length);

    // const contactCountryCode = formData.contactCountryCode;
    // const contactStartingCode = contactCountryCode.split('+')[1];
    // const contactModifiedValue = formData.contactPhoneNumber.slice(contactStartingCode.length);

    // let contactModifiedValue;

    // if (formData && formData.contactCountryCode && formData.contactPhoneNumber) {
    //   const contactCountryCode = formData.contactCountryCode;
    //   const contactStartingCode = contactCountryCode.split('+')[1];

    //   if (contactStartingCode && formData.contactPhoneNumber.startsWith(contactStartingCode)) {
    //     contactModifiedValue = formData.contactPhoneNumber.slice(contactStartingCode.length);
    //   } else {
    //     contactModifiedValue = formData.contactPhoneNumber;
    //   }
    // } else {
    //   contactModifiedValue = null;
    // }

    let contactModifiedValue = null;
    if (formData.contactPhoneNumber) {
      if (formData.contactCountryCode) {
        const contactStartingCode = formData.contactCountryCode.split('+')[1];
        contactModifiedValue = formData.contactPhoneNumber.startsWith(contactStartingCode)
          ? formData.contactPhoneNumber.slice(contactStartingCode.length)
          : formData.contactPhoneNumber;
      } else {
        contactModifiedValue = formData.contactPhoneNumber;
      }
    }
    
    let data = {};
    data["scenarioIds"] = formattedScenarioValue;
    data["subscriptionId"] = formData.subscriptionId.value;
    data["environmentId"] = formData.environmentId.value;
    data["numberOfUsers"] = formData.numberOfUsers;
    data["numberOfProUsers"] = formData.numberOfProUsers;
    data["slug"] = formData.slug;
    data["name"] = formData.name;
    data["countryCode"] = formData.countryCode;
    data["mobile"] = modifiedValue;
    data["email"] = formData.email;
    data["username"] = formData.username;
    //data["password"] = formData.password;
    let password = generateRandomPassword(12)
    data["password"] = password;
    //data["confirmPassword"] = formData.confirmPassword;
    data["confirmPassword"] = password;
    data["dateOfBirth"] = formattedDateOfBirth;
    data["gender"] = selectedGender;
    data["primaryHand"] = selectedPrimaryHand;
    data["address"] = formData.address;
    data["city"] = formData.city;
    data["country"] = formData.country;
    data["postalCode"] = formData.postalCode;
    data["emergencyContactName"] = formData.emergencyContactName;
    data["emergencyContactPhone"] = formData.emergencyContactPhone;
    data["medicalConditions"] = formData.medicalConditions;
    data["allergies"] = formData.allergies;
    data["notes"] = formData.notes;
    data["contactName"] = formData.contactName;
    data["contactEmail"] = formData.contactEmail;
    data["contactCountryCode"] = formData.contactCountryCode;
    data["contactMobile"] = contactModifiedValue;
    // data["startAt"] = formattedStartDate;
    // data["endAt"] = formattedEndDate;

    return data;
  };
  const handleChangeSubscription = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["subscriptionId"] = event;
    setFormData(formDataTemp);

    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp.subscriptionId = "subscription is required";
    } else {
      formDataErrorTemp.subscriptionId = "";
    }
    setFormDataError(formDataErrorTemp);
  };
  const handleChangeEnvironment = (event) => {
    setScenarioData([]);
    let formDataTemp = { ...formData };
    formDataTemp["environmentId"] = event;
    formDataTemp["scenarioId"] = [];
    setFormData(formDataTemp);
    fetchScenarioDatafromenv(event.value);
    let formDataErrorTemp = { ...formDataError }
    formDataErrorTemp["environmentId"] = ""
    setFormDataError(formDataErrorTemp)

    // let formDataErrorTemp = { ...formDataError };
    // if (Object.keys(event).length === 0) {
    //   formDataErrorTemp.environmentId = "Environment is required";
    // } else {
    //   formDataErrorTemp.environmentId = "";
    // }
    // setFormDataError(formDataErrorTemp);
    setEnvironmentStatus(false);
  };

  const handleSubmit = async () => {
    if (validateForm(clientAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;
      console.log("formatDataaaaaa", formatData());

      if (clientAddEditModalProps.formType === "add") {
        data = formatData();
        url = `${baseUrL}/admin/clients/store`;
        method = "post";
      } else {
        // let { password, confirmPassword, ...newObj } = formatData();
        // data = newObj;
        data = formatData()
        url = `${baseUrL}/admin/clients/update/${formData.id}`;
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

  const deleteButton = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedRows = selectedNodes.map((node) => node.data.id);
  };
  const [clientAddEditModalProps, setClientAddEditModalProps] = useState({});
  const addClient = () => {
    // scenarioApi()
    environmentApi();
    subscriptionApi();
    // let passowrd = generateRandomPassword(12);
    // formData.password = passowrd;
    // formData.confirmPassword = passowrd;
    // setFormData(formData)
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "add";
    clientAddEditModalPropsTemp["headerText"] = "Add Client";
    clientAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setShowModal(true);
  };
  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
  const environmentApi = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/environments`, {
        headers: {
          Authorization: authToken,
        },
      });
      if (response.data.success) {
        if (response.data.data.environments.length > 0) {
          let environmentArr = [];
          response.data.data.environments.map((item, index) => {
            let _hash = {};
            _hash["label"] = item.name;
            _hash["value"] = item.id;
            _hash["numberOfUsers"] = item.numberOfUsers;
            environmentArr.push(_hash);
          });
          setEnvironmentData(environmentArr);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const scenarioApi = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrL}/admin/scenarios`, {
  //       headers: {
  //         Authorization: authToken,
  //       },
  //     });
  //     // if (response.data.success) {
  //     //   if (response.data.data.scenarios.length > 0) {
  //     //     let scenarioArr = [];
  //     //     response.data.data.scenarios.map((item, index) => {
  //     //       let _hash = {};
  //     //       _hash["label"] = item.name;
  //     //       _hash["value"] = item.id;
  //     //       scenarioArr.push(_hash);
  //     //     });
  //     //     setScenarioData(scenarioArr);
  //     //   }
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const subscriptionApi = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/subscriptions`, {
        headers: {
          Authorization: authToken,
        },
      });
      if (response.data.success) {
        if (response.data.data.subscriptions.length > 0) {
          let subscriptionArr = [];
          response.data.data.subscriptions.map((item, index) => {
            let _hash = {};
            _hash["label"] = item.name;
            _hash["value"] = item.id;
            _hash["numberOfUsers"] = item.numberOfUsers;
            subscriptionArr.push(_hash);
          });
          setSubscriptionData(subscriptionArr);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const [filterActive, setFilterActive] = useState(false);
  // // const filterActiveRef = useRef(false);
  // const datasource = {
  //   getRows(params) {
  //     let url = `${baseUrL}/admin/clients?`;
  //     const { startRow, endRow, sortModel } = params;

  //     try {
  //       if (sortModel.length) {
  //         const { colId, sort } = sortModel[0];
  //         url += `_sort=${colId}&_order=${sort}&`;
  //       }
  //       const pageSize = endRow - startRow;
  //       const pageNumber = Math.floor(startRow / pageSize) + 1;
  //       if (filterActive) {
  //         url += `isOnline=1`;
  //       } else {
  //         url += `page=${pageNumber}&length=${pageSize}`;
  //       }

  //       const response = axios.get(url, {
  //         headers: {
  //           Authorization: authToken,
  //         },
  //       });

  //       response
  //         .then((response) => {
  //           if (response.data.data.clients.length > 0) {
  //             params.successCallback(
  //               response.data.data.clients,
  //               parseInt(response.data.data.total)
  //             );
  //           }
  //         })
  //         .catch((error) => {
  //           params.failCallback();
  //         });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   },
  // };
  const gridApiRef = useRef(null);
  const [filterActive, setFilterActive] = useState(false);
  const [toggleStatus, setToggleStatus] = useState("")
  const fetchData = (params) => {
    let url = `${baseUrL}/admin/clients?`;
    const { startRow, endRow, sortModel } = params;

    // Add sorting to the URL if available
    if (sortModel.length) {
      const { colId, sort } = sortModel[0];
      url += `_sort=${colId}&_order=${sort}&`;
    }

    // Add pagination parameters
    const pageSize = endRow - startRow;
    const pageNumber = Math.floor(startRow / pageSize) + 1;

    // Add filtering based on filterActive state
    if (filterActive) {
      url += `isOnline=1&`;
    }
    // else {
    url += `page=${pageNumber}&length=${pageSize}`;
    // }
    if (toggleStatus != "") {
      loaderStateTrue();
    }

    // Fetch data from the API
    axios
      .get(url, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        if (toggleStatus != "") {
          loaderStateFalse();
        }
        if (response.data.data.clients.length > 0) {

          params.successCallback(
            response.data.data.clients,
            parseInt(response.data.data.total)
          );
        } else {
          params.successCallback([], 0); // No clients found
        }
      })
      .catch((error) => {
        loaderStateFalse();
        console.error('Error fetching data:', error);
        params.failCallback();
      });
  };

  const datasource = {
    getRows: (params) => fetchData(params),
  };


  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setDatasource(datasource);
    }
  }, [filterActive]);


  const onFilterChange = (checked) => {
    setFilterActive(checked);
    setToggleStatus(checked)
    if (!checked) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete('isOnline');
      navigate(`?${currentParams.toString()}`, { replace: true });
    }


    if (gridApiRef.current) {
      gridApiRef.current.setDatasource(datasource);
    }
  };
  const resetDataGrid = () => {
    if (gridApi && datasource) {
      gridApi.setDatasource(datasource);
    }
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
    gridRef.current = params.api;
    gridRef.current.sizeColumnsToFit();
  });

  const gridOptions = useMemo(
    () => ({
      infiniteInitialRowCount: 1,
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
  const [showApproveModal, setShowAppoveModal] = useState(false);
  const closeApproveModal = () => {
    setShowAppoveModal(false);
  };

  const [startDate, setStartDate] = useState(new Date());
  const startDateString = startDate.toLocaleDateString("en-GB");
  const endDateString = endDate.toLocaleDateString("en-GB");
  const [selectedValue, setSelectedValue] = useState("active");
  const formatApproveData = () => {
    let data = {};
    data["startAt"] = startDateString;
    data["endAt"] = endDateString;
    data["status"] = "active";
    data["numberOfProUsers"] = formData.numberOfProUsers;
    data["numberOfUsers"] = formData.numberOfUsers;
    return data;
  };
  const [approveId, setApproveId] = useState(null);
  const approveClient = (e, params) => {
    let formDataTemp = { ...formData };
    formDataTemp["numberOfProUsers"] = params.data.numberOfProUsers;
    formDataTemp["numberOfUsers"] = params.data.numberOfUsers;
    setFormData(formDataTemp);
    setShowAppoveModal(true);
    setApproveId(params.data.id);
  };
  const handleApprove = async () => {
    if (validateApproveForm()) {
      loaderStateTrue()
      let data = formatApproveData();
      let id = approveId;
      try {
        const response = await axios({
          method: "post",
          url: `${baseUrL}/admin/clients/change-status/${id}`,
          data: data,
          headers: {
            Authorization: authToken,
          },
        });
        closeApproveModal();
        loaderStateFalse();
        resetDataGrid();
        toast(`Client approved successfully`, {
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
        loaderStateFalse();
        // Utility.toastNotifications(error.response.data.message, "Error", "error");
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
  const [showUnapproveModal, setShowUnapproveModal] = useState(false);
  const closeUnApproveModal = () => {
    setShowUnapproveModal(false);
  };
  const [unApproveId, setUnApproveId] = useState(null);
  const formatRejectData = () => {
    let data = {};
    data["status"] = "inactive";
    return data;
  };
  const rejectClient = (e, params) => {
    setShowUnapproveModal(true);
    setUnApproveId(params.data.id);
  };
  const [showInfoModal, setShowInfoModal] = useState(false);
  const closeInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleReject = async () => {
    let data = formatRejectData();
    let id = unApproveId;
    loaderStateTrue()
    try {
      const response = await axios({
        method: "post",
        url: `${baseUrL}/admin/clients/change-status/${id}`,
        data: data,
        headers: {
          Authorization: authToken,
        },
      });
      setShowModal(false);
      loaderStateFalse();
      resetDataGrid();
      toast(`Client Rejected successfully`, {
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
      loaderStateFalse();
      // Utility.toastNotifications(error.response.data.message, "Error", "error");
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
  };
  const [clientsUserData, setClientsUserData] = useState([
    // {address: "kolkata", allergies: "none", city: "kolkata max", clientId: "12"}
  ]);
  const fetchSingleClientData = async (id) => {
    try {
      const response = await axios.get(`${baseUrL}/admin/clients/show/${id}`, {
        headers: {
          Authorization: authToken,
        },
      });
      setClientsUserData(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const infoClient = (e, params) => {
    setShowInfoModal(true);
    fetchSingleClientData(params.data.id);
    // setClientsUserData(params.data.users);
  };
  const userRowHeight = 70;
  const userHeaderHeight = 60;
  const [userColumnDefs, setUserColumnDefs] = useState([
    { field: "name", minWidth: 200, maxWidth: 200 },
    { field: "username", minWidth: 200, maxWidth: 200 },
    { field: "address" },
    // { field: "allergies", width: 50 },
    {
      field: "image",
      cellRenderer: (params) => {
        if (params.data) {
          // const { status } = params.data;
          return (
            <div>
              {/* <img src={testImg} alt="failed  to load" style={{ width: '50px', height: '50px' }}/> */}
              <img
                src={`${imageUrL}/${params.data.avatar}`}
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
    { field: "city" },
    { field: "clientId" },
    { field: "code" },
    { field: "country" },
    { field: "dateOfBirth" },
    { field: "email" },
    // { field: "emergencyContactName" },
    // { field: "emergencyContactPhone" },
    // { field: "experienceLevel" },
    { field: "gender" },
    // { field: "medicalConditins" },
    { field: "mobile" },
    // { field: "notes" },
    { field: "postalCode" },
    // { field: "primaryHand" },
    // { field: "role" },
    { field: "status" },
    // { field: "stressLevel" },
  ]);
  // const rowData = Array.isArray(clientsUserData) ? clientsUserData : [];
  // const rowData = clientsUserData !== null && typeof clientsUserData === 'object' ? [clientsUserData] : [];
  const generateSlug = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Trim leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
  };
  const navigate = useNavigate();
  const onRowClicked = (event, params) => {
    navigate(`/admin/client-details/${event.data.id}`);
  };
  console.log(filterActive, "checked==>");
  // const onFilterChange = (checked) => {
  //   setFilterActive(checked);
  //   if (checked == false) {
  //     const currentParams = new URLSearchParams(window.location.search);
  //     currentParams.delete("isOnline");
  //     navigate(`?${currentParams.toString()}`, { replace: true });
  //   }
  //   // if (gridApi) {
  //   //   gridApi.setDatasource(datasource);
  //   // }
  //   // filterActiveRef.current = checked;
  //   // resetDataGrid()
  // };
  const onCellClicked = (event) => {
    // Check if the clicked cell should not trigger the row click
    if (event.column.colId !== "Action") {
      navigate(`/admin/client-details/${event.data.id}`);
    }
  };
  const handleMultiDropDownChange = (selected) => {
    setSelectedOptions(selected);
    let formDataTemp = { ...formData };
    formDataTemp["scenarioId"] = selected;
    setFormData(formDataTemp);
    let formDataErrorTemp = { ...formDataError };
    if (selected.length == 0) {
      formDataErrorTemp["scenarioId"] = "Scenario is required";
    } else {
      formDataErrorTemp["scenarioId"] = "";
    }
    setFormDataError(formDataErrorTemp);
  };
  const fetchScenarioDatafromenv = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrL}/admin/clients/${id}/scenarios`,
        {
          // params: {id},
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.data.success) {
        if (response.data.data.length > 0) {
          let scenarioArr = [];
          response.data.data.map((item, index) => {
            let _hash = {};
            _hash["label"] = item.name;
            _hash["value"] = item.id;
            scenarioArr.push(_hash);
          });
          setScenarioData(scenarioArr);
        } else {
          let formDataErrorTemp = { ...formDataError };
          formDataErrorTemp["environmentId"] =
            "This Environment dosen't have any scenarios yet";
          setFormDataError(formDataErrorTemp);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isOnline == 1) {
      setFilterActive(true);
    }
    resetDataGrid();
  }, [filterActive]);
  const [minimumEndDate, setMinimumEndDate] = useState(new Date().getDate() + 1)
  useEffect(() => {
    // if(startSubscriptionDate) {
    console.log("startSubscriptionDate")
    setEndDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000))
    setMinimumEndDate(new Date(startDate.getTime() + 24 * 60 * 60 * 1000))
    // }
  }, [startDate])
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.2);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      <div className="globaltable_holder">
        <div>
          <div className="table_modal_open">
            <div className="back_btn_caption_hold">
              <BackButton className={"back-button"} to={"/admin/dashboard"} />
              <span className="icn_bk_btn"><img src={client_img} /></span>
              <h3>{t("clients")}</h3>
            </div>
            <div className="switch_button">
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
                    All
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
              <button className="tablemodal_btn" onClick={addClient}>
                <FontAwesomeIcon icon={faUserPlus} /> {t("addClient")}
              </button>
            </div>
          </div>
          <ClientAddEdit
            formData={formData}
            formDataError={formDataError}
            showModal={showModal}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            subscriptionData={subscriptionData}
            environmentData={environmentData}
            headerText={clientAddEditModalProps.headerText}
            submitButtonText={clientAddEditModalProps.submitButtonText}
            formType={clientAddEditModalProps.formType}
            editObjClient={editObjClient}
            handleChangeSubscription={handleChangeSubscription}
            handleChangeEnvironment={handleChangeEnvironment}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            value1={"male"}
            value2={"female"}
            selectedPrimaryHand={selectedPrimaryHand}
            setSelectedPrimaryHand={setSelectedPrimaryHand}
            hand1={"right"}
            hand2={"left"}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            startDate={startSubscriptionDate}
            setStartDate={setStartSubscriptionDate}
            endDate={endDate}
            setEndDate={setEndDate}
            maxDate={maxDate}
            genderValue={genderValue}
            handValue={handValue}
            handleMultiDropDownChange={handleMultiDropDownChange}
            selectedOptions={selectedOptions}
            scenarioData={scenarioData}
            environmentStatus={environmentStatus}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleContactPhoneNumberChange={handleContactPhoneNumberChange}
          />
        </div>
        <ConfirmationAlert
          showAdminModal={showAdminModal}
          closeConfirmationAlert={closeConfirmationAlert}
          confirm={confrim}
          confirmationText={"delete this Client?"}
          headerText={"Delete!"}
        />
        <ApproveModal
          formData={formData}
          tomorrow={tomorrow}
          formDataError={formDataError}
          handleInputChange={handleInputChange}
          showModal={showApproveModal}
          closeModal={closeApproveModal}
          headerText={"Approve"}
          submitButtonText={"Approve"}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSubmit={handleApprove}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          value1={"active"}
          value2={"inactive"}
          minimumEndDate={minimumEndDate}
        />
        <RejectModal
          showModal={showUnapproveModal}
          closeModal={closeUnApproveModal}
          handleSubmit={handleReject}
          headerText={"Reject!"}
          submitButtonText={"Reject"}
        />
        <InfoModal
          showModal={showInfoModal}
          closeModal={closeInfoModal}
          headerText={"Client Info"}
          columnDefs={userColumnDefs}
          rowData={clientsUserData}
          userRowHeight={userRowHeight}
          userHeaderHeight={userHeaderHeight}
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
            // onRowClicked={onRowClicked}
            onCellClicked={onCellClicked}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(Clients));
