import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { P } from "../../../utility/components/Typography";
import client_img from "../../../utility/assets/images/client.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../utility/components/Button";
import { useDebounce } from "use-debounce";
import { withNamespaces } from "react-i18next";
import {
  loaderStateFalse,
  loaderStateTrue,
  loginSuccess,
} from "../../../actions/allActions";
import { connect } from "react-redux";
import proUserImg from "../../../utility/assets/images/prousericon.png";
import departmentImg from "../../../utility/assets/images/departmenticon.png";
import SearchImg from "../../../utility/assets/images/search.png";
import ClientAddEdit from "../../../utility/components/ClientAddEdit";
import BackButton from "../../../utility/components/BackButton"
import { Bounce, toast } from "react-toastify";
const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const genderValue = ["male", "female"];
const handValue = ["right", "left"];
const ClientDetails = (props) => {
  const {slug}=useParams();
  console.log(slug,'id==>');
  const { userData } = props;
  const authToken = userData.token;
  const navigate = useNavigate();
  const paramsData = useParams();
  const [clientData, setClientData] = useState([]);
  const scenarioNames = clientData?.scenarios?.map((item) => item.name);
  const [filter, setFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 300); // 300ms debounce
  const [deptDebouncedFilter] = useDebounce(deptFilter, 300); // 300ms debounce
  const [subscriptionData, setSubscriptionData] = useState([]);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  
  useEffect(() => {
    fetchSingleClientsData();
  }, []);
  useEffect(() => {
    deptResetDataGrid();
  }, [deptDebouncedFilter]);

  useEffect(() => {
    resetDataGrid();
  }, [debouncedFilter]);
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
  const handleChangeEnvironment = (event) => {
    setScenarioData([]);
    let formDataTemp = { ...formData };
    formDataTemp["environmentId"] = event;
    formDataTemp["scenarioId"] = [];
    setFormData(formDataTemp);
    fetchScenarioDatafromenv(event.value);

    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp.environmentId = "Environment is required";
    } else {
      formDataErrorTemp.environmentId = "";
    }
    setFormDataError(formDataErrorTemp);
    setEnvironmentStatus(false);
  };
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
  const fetchSingleClientsData = async () => {
    try {
      const response = await axios.get(
        `${baseUrL}/admin/clients/show/${paramsData?.slug}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setClientData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [proUsers, setProUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const [deptComponents, setDeptComponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const [gridApi, setGridApi] = useState(null);
  const [deptGridApi, setDeptGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [deptGridColumnApi, setDeptGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const [deptGridparams, setDeptGridparams] = useState(null);
  //users get api
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/clients/${paramsData?.slug}/users?isPro=1`;
      const { startRow, endRow, sortModel } = params;

      // Add debounced filter to URL if it's not empty
      if (debouncedFilter) {
        url += `&keywords=${encodeURIComponent(debouncedFilter)}`;
      }

      // Add sorting parameters if sortModel exists
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `&_sort=${colId}&_order=${sort}`;
      }

      // Add pagination parameters
      url += `&_start=${startRow + 1}&_end=${endRow}`;

      // Perform the API request
      axios
        .get(url, {
          headers: {
            Authorization: authToken,
          },
        })
        .then((response) => {
          params.successCallback(
            response.data.data.users,
            parseInt(response.data.data.total)
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          params.failCallback();
        });
    },
  };

  //department get api
  const deptDatasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/clients/${paramsData?.slug}/departments?`;
      const { startRow, endRow, sortModel } = params;

      // Add debounced filter to URL if it's not empty
      if (deptDebouncedFilter) {
        url += `keywords=${encodeURIComponent(deptDebouncedFilter)}`;
      }

      // Add sorting parameters if sortModel exists
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `&_sort=${colId}&_order=${sort}`;
      }

      // Add pagination parameters
      url += `&_start=${startRow + 1}&_end=${endRow}`;

      // Perform the API request
      axios
        .get(url, {
          headers: {
            Authorization: authToken,
          },
        })
        .then((response) => {
          params.successCallback(
            response.data.data.departments,
            parseInt(response.data.data.total)
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          params.failCallback();
        });
    },
  };
  const resetDataGrid = () => {
    if (gridApi && datasource) {
      gridApi.setDatasource(datasource);
    }
  };
  const deptResetDataGrid = () => {
    if (deptGridApi && deptDatasource) {
      deptGridApi.setDatasource(deptDatasource);
    }
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });
  const onDeptGridReady = useCallback((params) => {
    setDeptGridparams(params);
    setDeptGridApi(params.api);
    setDeptGridColumnApi(params.columnApi);
    params.api.setDatasource(deptDatasource);
  });
  const rowHeight = 70;
  const headerHeight = 60;
  const proUserColumnDefs = [{ field: "name" }];
  const departmentColumnDefs = [{ field: "name" }];

  const [filteredData, setFilteredData] = useState(proUsers);
  const [deptFilteredData, setDeptFilteredData] = useState(departments);
  const [editObjClient, setEditObjClient] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    subscriptionId: {},
    environmentId: {},
    scenarioId: [],
    numberOfUsers: "",
    numberOfProUsers: "",
    slug: "",
    name: "",
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
    allergies: "",
    startAt: "",
    endAt: "",
  });
  const [environmentStatus, setEnvironmentStatus] = useState(true);
  const [clientAddEditModalProps, setClientAddEditModalProps] = useState({});
  const [formDataError, setFormDataError] = useState({
    id: "",
    subscriptionId: {},
    environmentId: {},
    scenarioId: [],
    numberOfUsers: "",
    numberOfProUsers: "",
    slug: "",
    name: "",
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
    allergies: "",
    startAt: "",
    endAt: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [startSubscriptionDate, setStartSubscriptionDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedPrimaryHand, setSelectedPrimaryHand] = useState("right");
  const [environmentData, setEnvironmentData] = useState([]);
  const [scenarioData, setScenarioData] = useState([]);

  const [endDate, setEndDate] = useState(tomorrow);
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
  const editClient = (e, params) => {
    environmentApi();
    subscriptionApi()
    setEnvironmentStatus(false);
   
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "edit";
    clientAddEditModalPropsTemp["headerText"] = "Edit Client";
    clientAddEditModalPropsTemp["submitButtonText"] = "Update";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setEditObjClient(clientData);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = slug;
    formDataTemp["numberOfProUsers"] = clientData.numberOfProUsers;
    formDataTemp["numberOfUsers"] = clientData.numberOfUsers;
    formDataTemp["name"] = clientData.name;
    formDataTemp["email"] =  clientData.email;
    formDataTemp["gender"] = clientData.users[0].gender;
    formDataTemp["primaryHand"] = clientData.users[0].primaryHand;
    formDataTemp["phoneNumber"] = clientData.users[0].mobile;
    // formDataTemp["slug"] = data.slug;
    // formDataTemp["username"] = data.users[0].username;
    formDataTemp["address"] = clientData.users[0].address;
    formDataTemp["city"] = clientData.users[0].city;
    formDataTemp["postalCode"] = clientData.users[0].postalCode;
    formDataTemp["country"] = clientData.users[0].country;
    if (clientData.subscription) {
      let subscription = {
        label: clientData.subscription.name,
        value: clientData.subscription.id,
        numberOfUsers: clientData.subscription.numberOfUsers,
      };
      formDataTemp["subscriptionId"] = subscription;
    }
    if (clientData.environment) {
      let environment = {
        label: clientData.environment.name,
        value: clientData.environment.id,
      };
      formDataTemp["environmentId"] = environment;
    }
    let filteredScenarioData = [];
    if (clientData.scenarios) {
      let scenarioArr = clientData.scenarios?.map((item) => {
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
  const generateSlug = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Trim leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
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
      } else {
        formDataTemp.slug = generateSlug(value);
        formDataErrorTemp.name = "";
        formDataErrorTemp.slug = "";
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

    if (name === "phoneNumber") {
      if (value === "") {
        formDataErrorTemp.phoneNumber = "Phone Number is required";
      } else if (!/^\d{10}$/.test(value)) {
        formDataErrorTemp.phoneNumber = "Please provide valid Phone Number";
      } else {
        formDataErrorTemp.phoneNumber = "";
      }
    }
    if (name === "numberOfUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfUsers = "Parallel user is required";
      } else if (!/^[1-9]\d*$/.test(value)) {
        formDataErrorTemp.numberOfUsers =
          "Please provide a valid number of users";
      } else {
        formDataErrorTemp.numberOfUsers = "";
      }
    }

    if (name === "numberOfProUsers") {
      if (value === "") {
        formDataErrorTemp.numberOfProUsers = "Pro user is required";
      } else if (!/^[1-9]\d*$/.test(value)) {
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
    // if (name === "postalCode") {
    //   if (!value) {
    //     // If no value is provided, set the error to an empty string.
    //     formDataErrorTemp.postalCode = "";
    //   } else if (!/^\d+$/.test(value)) {
    //     // If the value contains any non-digit characters, set the error message accordingly.
    //     formDataErrorTemp.postalCode = "Postal code must be a number";
    //   } else if (value.length !== 7) {
    //     // If the length of the value is not exactly 5 digits, set the error message.
    //     formDataErrorTemp.postalCode = "Postal code must be exactly 7 digits.";
    //   } else {
    //     // If all conditions are met, clear the error.
    //     formDataErrorTemp.postalCode = "";
    //   }
    // }
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
  const onRowClick = (e, params) => {
    navigate(`/admin/users-department/${paramsData?.slug}&${e?.data?.id}`);
  };
  const onDeptRowClick = (e, params) => {
    navigate(`/admin/department-users/${paramsData?.slug}&${e?.data?.id}`);
  };
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
      allergies: "",
      startAt: "",
      endAt: "",
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
      allergies: "",
      startAt: "",
      endAt: "",
    });
    setClientAddEditModalProps({});
    setEditObjClient({});
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
    if (Object.keys(formData.subscriptionId).length === 0) {
      isValid = false;
      formDataErrorTemp.subscriptionId = "Subscription is required";
    }
    if (Object.keys(formData.environmentId).length === 0) {
      isValid = false;
      formDataErrorTemp.environmentId = "Environment is required";
    }
    if (formData.phoneNumber === "") {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Please provide valid Phone Number";
    }

    if (formData.numberOfUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfUsers = "Number of Parallel user is required";
    } else if (!/^[1-9]\d*$/.test(formData.numberOfUsers)) {
      isValid = false;
      formDataErrorTemp.phoneNumber = "Please providevalid  Parrelel User Name";
    }

    if (formData.numberOfProUsers === "") {
      isValid = false;
      formDataErrorTemp.numberOfProUsers = "Number of Pro user is required";
    } else if (!/^[1-9]\d*$/.test(formData.numberOfProUsers)) {
      isValid = false;
      formDataErrorTemp.numberOfProUsers =
        "Please provide valid  Pro User Name";
    }

    if (formData.scenarioId.length == 0) {
      isValid = false;
      formDataErrorTemp.scenarioId = "Scenario is required";
    }

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
      // Check if the postal code consists of exactly 7 digits
      else if (formData.postalCode.length !== 7) {
        isValid = false;
        formDataErrorTemp.postalCode = "Postal Code must consist of exactly 7 digits";
      }
      // If everything is valid
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
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };
  const scenarioValue = formData.scenarioId;
  const formattedScenarioValue = scenarioValue.map((item) => item.value);
  const formattedDateOfBirth = formatDate(dateOfBirth);
  const formatData = () => {
    let data = {};
    data["scenarioIds"] = formattedScenarioValue;
    data["subscriptionId"] = formData.subscriptionId.value;
    data["environmentId"] = formData.environmentId.value;
    data["numberOfUsers"] = formData.numberOfUsers;
    data["numberOfProUsers"] = formData.numberOfProUsers;
    data["slug"] = formData.slug;
    data["name"] = formData.name;
    data["mobile"] = formData.phoneNumber;
    data["email"] = formData.email;
    data["username"] = formData.username;
    data["password"] = formData.password;
    data["confirmPassword"] = formData.confirmPassword;
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
    data["note"] = formData.note;
    // data["startAt"] = formattedStartDate;
    // data["endAt"] = formattedEndDate;

    return data;
  };
  const editPostData = async (url, data, method) => {
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
  const [selectedOptions, setSelectedOptions] = useState([]);
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
  const handleSubmit = async () => {
    if (validateForm(clientAddEditModalProps.formType)) {
      loaderStateTrue();
      let url;
      let method;
      let data;

     
        let { password, confirmPassword, ...newObj } = formatData();
        data = newObj;
        url = `${baseUrL}/admin/clients/update/${slug}`;
        method = "put";
      
      editPostData(url, data, method);
    }
  };
 
  return (
    <>
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
          />
      <div className="client-details-holder">
      <div className="container-fluid">
        <div className="details_pg_head table_modal_open">
        <div className="back_btn_caption_hold">
           <BackButton className={"back-button"}/>
           <span className="icn_bk_btn"><img src={client_img}/></span>
           <h3>Client Details</h3>
         </div>
           <button className="tablemodal_btn"  onClick={(e) => editClient(e,slug)}>
           <FontAwesomeIcon icon={faUserPlus} />
           Edit Client
           </button>
        </div>
      </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <Link
                className="small-box purple_box"
                to={`/admin/client-environment/${paramsData.slug}`}
              >
                <P>Environments</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  <h3>{clientData?.environment?.name}</h3>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link
                className="small-box purple_box"
                to={`/admin/client-scenario/${paramsData.slug}`}
              >
                <P>Scenario</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  {/* {
                  scenarioNames?.map((item)=> {
                    return (<>
                    <h5>{item}</h5><br></br>
                    </>)
                  })
                } */}
                  <h3>{scenarioNames?.length}</h3>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link
                className="small-box purple_box"
                to={`/admin/client-analytics/${paramsData.slug}`}
              >
                <P>Analytics</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  {/* <h3>2</h3> */}
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <Link
                className="small-box purple_box"
                to={`/admin/client-recordings/${paramsData.slug}`}
              >
                <P>Recordings</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  {/* <h3>2</h3> */}
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-md-12">
              <Link
                className="small-box purple_box"
                to={`/admin/client-online-activities/${paramsData.slug}`}
              >
                <P>Online Activities</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  {/* <h3>2</h3> */}
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-md-12">
              <Link
                className="small-box purple_box"
                to={`/admin/client-relevantinfo/${paramsData.slug}`}
              >
                <P>Relevant Informations</P>
                <div className="inner">
                  <span>
                    <i className="fa-solid fa-users"></i>
                  </span>
                  {/* <h3>2</h3> */}
                </div>
              </Link>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="department_holder">
                <div className="department_head">
                  <h3>
                    <span>
                      <img src={proUserImg} />
                    </span>
                    Pro Users
                  </h3>
                  <input
                    className="dep_search"
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="pro users"
                  />
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "calc(100vh - 320px)" }}
                >
                  <AgGridReact
                    columnDefs={proUserColumnDefs}
                    onGridReady={onGridReady}
                    // rowData={filteredData}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    rowModelType="infinite"
                    onRowClicked={onRowClick}
                    components={components}
                    cacheBlockSize={10}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="department_holder">
                <div className="department_head">
                  <h3>
                    <span>
                      <img src={departmentImg} />
                    </span>
                    Departments
                  </h3>
                  <input
                    className="dep_search"
                    type="text"
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    placeholder="departments"
                  />
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "calc(100vh - 320px)" }}
                >
                  <AgGridReact
                    columnDefs={departmentColumnDefs}
                    onGridReady={onDeptGridReady}
                    // rowData={deptFilteredData}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    rowModelType="infinite"
                    onRowClicked={onDeptRowClick}
                    components={deptComponents}
                    cacheBlockSize={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default ClientDetails;
const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(ClientDetails));
