import React, { useCallback, useEffect, useState, useRef } from "react";
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
import mission_img from "../../../../utility/assets/images/mission.png";
import {
  faAngleDown,
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import ProUserAddEdit from "../../../../utility/components/clients/ProUserAddEdit";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../utility/components/BackButton";



const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const roleData = [
  // { label: "admin", name: "Admin" },
  { label: "Instructor", value: "instructor" },
  { label: "Pro User", value: "proUser" },
  { label: "Parallel User", value: "parallelUser" },
];
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const primaryHandOptions = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const ProUsers = (props) => {
  const { userData, loginSuccess, loaderStateTrue, loaderStateFalse, t } =
    props;
  const location = useLocation();
  const isOnline = location.search?.split("?")[1];
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
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedHand, setSelectedHand] = useState("right")
  const genderValue = ["male", "female"];
  const handValue = ["right", "left"]
  const [department, setDepartment] = useState([])

  const [roleID, setRoleID] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleUsersDropdown = () => {
    setExpanded(!expanded);
  };
  const [usersDefault, setUserDefault] = useState("Pro Users")
  const [getUrl, setGetUrl] = useState("pro-users")
  useEffect(() => {
    if (usersDefault == "Parallel Users") {
      setGetUrl("parallel-users")
    } else if (usersDefault == "Instructors") {
      setGetUrl("instructor")
    } else {
      setGetUrl("pro-users")
    }
    resetDataGrid()
  }, [usersDefault, getUrl])
  useEffect(() => {
    fetchDepartment()
  }, [])
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${baseUrL}/clients/departments`, {
        headers: {
          Authorization: authToken
        }
      })
      setDepartment(response.data.data.departments)
    } catch (err) {
      console.log(err)
    }
  }
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/clients/pro-users?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (isOnline) {
          url += `isOnline=1&`
        }
        if (getUrl == "parallel-users" || getUrl == "pro-users") {
          url += `role=user&`
        } else {
          url += `role=instructor&`
        }
        if (getUrl == "parallel-users") {
          url += `isPro=0&`
        } else {
          url += `isPro=1&`
        }
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        const pageSize = endRow - startRow;
        const pageNumber = Math.floor(startRow / pageSize) + 1;
        url += `page=${pageNumber}&length=${10}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            console.log("response.data.data.users", response.data.data.users);
            params.successCallback(
              response.data.data.users,
              response.data.data.total
            );
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
  const gridRef = useRef(null);
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
      lastName: "",
      role: "",
      status: "",
      client: "",
      username: "",
      countryCode: "",
      mobile: "",
      email: "",
      department: [],
      dateOfBirth: "",
      gender: "male",
      primaryHand: "right",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalConditions: "",
      allergies: "",
      experienceLevel: "",
      stressLevel: "",
    });
    setFormDataError({
      name: "",
      lastName: "",
      role: "",
      email: "",
      status: "",
      client: "",
      username: "",
      countryCode: "",
      mobile: "",
      department: [],
      dateOfBirth: "",
      gender: "",
      primaryHand: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      medicalConditions: "",
      allergies: "",
      experienceLevel: "",
      stressLevel: "",
    });
    setSelectedGender("male")
  };
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // { field: "name", minWidth: 200, maxWidth: 350 },
    {
      headerName: "Name",
      valueGetter: (params) => {
        const firstName = params.data?.name || "";
        const lastName = params.data?.lastName || "";
        return `${firstName} ${lastName}`
      },
      minWidth: 200,
      maxWidth: 350,
    },
    {
      headerName: "Status",
      valueGetter: (params) =>
        params.data && params.data.isOnline !== undefined
          ? params.data.isOnline === 0
            ? "Offline"
            : "Online"
          : null,
      minWidth: 100, maxWidth: 100
    },
    { field: "email", minWidth: 200, maxWidth: 400 },
    // { field: "status", minWidth: 100, maxWidth: 100 },
    // { field: "client", width:'300'},
    {
      headerName: "Client",
      valueGetter: (params) =>
        params.data && params.data.client?.name
          ? params.data.client.name
          : null,
      minWidth: 150, maxWidth: 300
    },
    { field: "username", minWidth: 150, maxWidth: 200 },
    // { field: "mobile", minWidth: 150, maxWidth: 200 },
    // { field: "department", width: "350" },
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
    {
      headerName: "No. of Departments",
      valueGetter: (params) =>
        params.data && params.data.userDepartments
          ? params.data.userDepartments.length
          : null,
      minWidth: 200, maxWidth: 300
    },
    // { field: "dateOfBirth", width: "350" },
    { field: "gender", minWidth: 100, maxWidth: 100 },
    { field: "primaryHand", minWidth: 150, maxWidth: 200 },
    { field: "address", minWidth: 350, maxWidth: 400 },
    // { field: "city", minWidth: 150, maxWidth: 300  },
    // { field: "postalCode", minWidth: 150, maxWidth: 200  },
    // { field: "country", minWidth: 100, maxWidth: 200 },
    // { field: "emergencyContactName", minWidth: 200, maxWidth: 300  },
    // { field: "emergencyContactPhone", minWidth: 200, maxWidth: 250  },
    // { field: "medicalConditions", minWidth: 150, maxWidth: 200  },
    // { field: "allergies", minWidth: 150, maxWidth: 200  },
    // { field: "experienceLevel", minWidth: 150, maxWidth: 200  },
    // { field: "stressLevel", minWidth: 150, maxWidth: 200  },
    {
      field: "Action",
      minWidth: 150, maxWidth: 200,
      cellRenderer: (params) => {
        if (params.data && !isOnline) {
          return (
            <div>
              {params.data.role !== "client" &&
                <>
                  <Button
                    onClick={(e) => editRoles(e, params)}
                    className="action_button edt_btn"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Button>
                  <Button
                    onClick={(e) => deleteMission(e, params)}
                    className="action_button del_btn"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </>
              }
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
    let roleObject = roleData.find((role) => {
      if (data.role === 'user') {
        return role.label === (data.isPro == '1' ? 'Pro User' : 'Parallel User');
      } else {
        return role.label === 'Instructor';
      }
    });

    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "edit";
    roleAddEditModalPropsTemp["headerText"] = "Edit Pro Users";
    roleAddEditModalPropsTemp["submitButtonText"] = "Update";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setEditObjRoles(data);
    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name;
    formDataTemp["lastName"] = data.lastName;
    formDataTemp["status"] = data.status;
    formDataTemp["client"] = data.client;
    formDataTemp["username"] = data.username;
    // formDataTemp["countryCode"] = data.countryCode;
    // formDataTemp["mobile"] = data.mobile;
    formDataTemp["countryCode"] = data.countryCode;
    const countryCode = data.countryCode ;
    const mobile = data.mobile ;
    formDataTemp["mobile"] = `${countryCode}${mobile}`;
    formDataTemp["email"] = data.email;
    formDataTemp["role"] = roleObject;
    // formDataTemp["department"] = data.userDepartments;
    formDataTemp["department"] = data.userDepartments.map(dept => dept.departmentId);
    formDataTemp["dateOfBirth"] = data.dateOfBirth;
    formDataTemp["gender"] = data.gender;
    formDataTemp["primaryHand"] = data.primaryHand;
    formDataTemp["address"] = data.address;
    formDataTemp["city"] = data.city;
    formDataTemp["postalCode"] = data.postalCode;
    formDataTemp["country"] = data.country;
    formDataTemp["emergencyContactName"] = data.emergencyContactName;
    formDataTemp["emergencyContactPhone"] = data.emergencyContactPhone;
    formDataTemp["medicalConditions"] = data.medicalConditions;
    formDataTemp["allergies"] = data.allergies;
    formDataTemp["experienceLevel"] = data.experienceLevel;
    formDataTemp["stressLevel"] = data.stressLevel;

    setFormData(formDataTemp);
    setSelectedGender(data.gender)
    setShowModal(true);
  };
  const deleteMission = async (e, params) => {
    const roleID = params?.data.id;
    setShowAdminModal(true);
    setRoleID(roleID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/clients/pro-users/destroy/${roleID}`,
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
    gridApi?.setDatasource(datasource);
  };
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    status: "",
    client: "",
    username: "",
    role: "",
    countryCode: "",
    mobile: "",
    department: [],
    dateOfBirth: "",
    gender: "male",
    primaryHand: "right",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalConditions: "",
    allergies: "",
    experienceLevel: "",
    stressLevel: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    lastName: "",
    email: "",
    status: "",
    client: "",
    username: "",
    role: "",
    countryCode: "",
    mobile: "",
    department: [],
    dateOfBirth: "",
    gender: "",
    primaryHand: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalConditions: "",
    allergies: "",
    experienceLevel: "",
    stressLevel: "",
  });
  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "Name is required";
    }
    if (formData.lastName === "") {
      isValid = false;
      formDataErrorTemp.lastName = "Last Name is required";
    }
    if (formData.username === "") {
      isValid = false;
      formDataErrorTemp.username = "Username is required";
    }
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "Phone Number is required";
    }
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "Mobile is required";
    }
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }
    if (formData.role === "") {
      isValid = false;
      formDataErrorTemp.role = "Role is required";
    }
    if (formData.department.length === 0) {
      isValid = false;
      formDataErrorTemp.department = "Department is required";
    }
    // if (formData.gender === "") {
    //   isValid = false;
    //   formDataErrorTemp.gender = "Gender is required";
    // }
    // if (formData.primaryHand === "") {
    //   isValid = false;
    //   formDataErrorTemp.primaryHand = "Primary Hand is required";
    // }
    setFormDataError(formDataErrorTemp);
    console.log('isvalid ', isValid)
    return isValid;
  };

  const handlePhoneNumberChange = (value, country) => {
    const countryCode = `+${country?.dialCode}`;
    const startingCode=countryCode.split('+')[1];
    console.log("cosnole", country)
    const prefix = "startingCode";
    let modifiedValue ;
    let excludedPart = "";
  
    if (value.startsWith(startingCode)) {
      modifiedValue = value.slice(startingCode.length);
    }
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };

    console.log(value.startsWith(startingCode),value,'countryCode=>');
    
    formDataTemp["mobile"] = value;
    formDataTemp["countryCode"] = `+${country?.dialCode}`;
    setFormData(formDataTemp)
    const digitsOnly = value.replace(/[^0-9]/g, "");
    if (digitsOnly.length === 0) {
      formDataErrorTemp["mobile"] = "Phone number is required";
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      formDataErrorTemp["mobile"] = "Please enter a valid phone number (10-15 digits)";
    } else {
      formDataErrorTemp["mobile"] = "";
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
        formDataErrorTemp.name = "name is required";
      } else {
        formDataErrorTemp.name = "";
      }
    }
    if (name === "lastName") {
      if (value == "") {
        formDataErrorTemp.lastName = "Last Name is required";
      } else {
        formDataErrorTemp.lastName = "";
      }
    }
    if (name === "email") {
      if (value == "") {
        formDataErrorTemp.email = "Email is required";
      } else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "status") {
      if (value == "") {
        formDataErrorTemp.status = "Status is required";
      } else {
        formDataErrorTemp.status = "";
      }
    }

    if (name === "client") {
      if (value == "") {
        formDataErrorTemp.client = "Client is required";
      } else {
        formDataErrorTemp.client = "";
      }
    }

    if (name === "username") {
      if (value == "") {
        formDataErrorTemp.username = "Username is required";
      } else {
        formDataErrorTemp.username = "";
      }
    }
    // if (name === "mobile") {
    //   if (value == "") {
    //     formDataErrorTemp.mobile = "Mobile is required";
    //   } else {
    //     formDataErrorTemp.mobile = "";
    //   }
    // }
    // if (name === "mobile") {
    //   if (value === "") {
    //     formDataErrorTemp.mobile = "Phone Number is required";
    //   }  else {
    //     formDataErrorTemp.mobile = "";
    //   }
    // }
    if (name === "department") {
      if (value == "") {
        formDataErrorTemp.department = "Department is required";
      } else {
        formDataErrorTemp.department = "";
      }
    }
    if (name === "dateOfBirth") {
      if (value == "") {
        formDataErrorTemp.dateOfBirth = "Date Of Birth is required";
      } else {
        formDataErrorTemp.dateOfBirth = "";
      }
    }
    if (name === "gender") {
      if (value == "") {
        formDataErrorTemp.gender = "Gender is required";
      } else {
        formDataErrorTemp.gender = "";
      }
    }
    if (name === "primaryHand") {
      if (value == "") {
        formDataErrorTemp.primaryHand = "Primary Hand is required";
      } else {
        formDataErrorTemp.primaryHand = "";
      }
    }
    if (name === "address") {
      if (value == "") {
        formDataErrorTemp.address = "Address is required";
      } else {
        formDataErrorTemp.address = "";
      }
    }
    if (name === "city") {
      if (value == "") {
        formDataErrorTemp.city = "City is required";
      } else {
        formDataErrorTemp.city = "";
      }
    }
    if (name === "postalCode") {
      if (value == "") {
        formDataErrorTemp.postalCode = "Postal Code is required";
      } else {
        formDataErrorTemp.postalCode = "";
      }
    }
    if (name === "country") {
      if (value == "") {
        formDataErrorTemp.country = "Country is required";
      } else {
        formDataErrorTemp.country = "";
      }
    }
    if (name === "emergencyContactName") {
      if (value == "") {
        formDataErrorTemp.emergencyContactName =
          "Emergency Contact Name is required";
      } else {
        formDataErrorTemp.emergencyContactName = "";
      }
    }
    if (name === "emergencyContactPhone") {
      if (value == "") {
        formDataErrorTemp.emergencyContactPhone =
          "Emergency Contact Phone is required";
      } else {
        formDataErrorTemp.emergencyContactPhone = "";
      }
    }
    if (name === "medicalConditions") {
      if (value == "") {
        formDataErrorTemp.medicalConditions = "Medical Conditions is required";
      } else {
        formDataErrorTemp.medicalConditions = "";
      }
    }
    if (name === "allergies") {
      if (value == "") {
        formDataErrorTemp.allergies = "Allergies is required";
      } else {
        formDataErrorTemp.allergies = "";
      }
    }
    if (name === "experienceLevel") {
      if (value == "") {
        formDataErrorTemp.experienceLevel = "Experience Level is required";
      } else {
        formDataErrorTemp.experienceLevel = "";
      }
    }
    if (name === "stressLevel") {
      if (value == "") {
        formDataErrorTemp.stressLevel = "Stress Level is required";
      } else {
        formDataErrorTemp.stressLevel = "";
      }
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
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
  // let passowrd = generateRandomPassword(12);
  //   formData.password = passowrd;
  //   formData.confirmPassword = passowrd;
  const formatData = () => {

    const countryCode = formData.countryCode;
    const startingCode=countryCode.split('+')[1];
    let modifiedValue = formData.mobile.slice(startingCode.length);

    // console.log(formData.role, 'formData.role');
    let data = {};
    data["name"] = formData.name;
    data["lastName"] = formData.lastName;
    data["email"] = formData.email;
    // data["password"] = formData.password;
    // data["confirmPassword"] =  formData.confirmPassword
    let password = generateRandomPassword(12)
    data["password"] = password;
    data["confirmPassword"] = password;
    data["status"] = formData.status;
    data["client"] = formData.client;
    data["username"] = formData.username;
    data["countryCode"] = formData.countryCode;
    data["mobile"] = modifiedValue;
    data["departmentIds"] = formData.department;
    data["dateOfBirth"] = formData.dateOfBirth;
    data["gender"] = formData.gender.length > 0 ? formData.gender : 'male';
    data["primaryHand"] = formData.primaryHand;
    data["role"] = formData.role.value;
    data["address"] = formData.address;
    data["city"] = formData.city;
    data["postalCode"] = formData.postalCode;
    data["country"] = formData.country;
    data["emergencyContactName"] = formData.emergencyContactName;
    data["emergencyContactPhone"] = formData.emergencyContactPhone;
    data["medicalConditions"] = formData.medicalConditions;
    data["allergies"] = formData.allergies;
    data["experienceLevel"] = formData.experienceLevel;
    data["stressLevel"] = formData.stressLevel;
    console.log("formatDataaaaaa", formatData);
    
    return data;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      loaderStateTrue();
      let url;
      let method;
      //let data;
      const data = formatData();
      if (roleAddEditModalProps.formType === "add") {
        // data = formatData();
        url = `${baseUrL}/clients/pro-users/store`;
        method = "post";
      } else {
        //data = formatData();
        url = `${baseUrL}/clients/pro-users/update/${formData.id}`;
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
      console.log("res=> ", response.data)
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
  const addProUser = () => {
    let roleAddEditModalPropsTemp = { ...roleAddEditModalProps };
    roleAddEditModalPropsTemp["formType"] = "add";
    roleAddEditModalPropsTemp["headerText"] = "Add Pro User";
    roleAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setRoleAddEditModalProps(roleAddEditModalPropsTemp);
    setShowModal(true);
  };
  const [selectedItem, setSelectedItem] = useState(formData.type);
  const handleChangeRole = (selectedOption) => {
    // Updating formData
    let formDataTemp = { ...formData };
    formDataTemp["role"] = selectedOption;
    setFormData(formDataTemp);

    // Handling validation
    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(selectedOption).length === 0) {
      formDataErrorTemp.role = "Role is required";
    } else {
      formDataErrorTemp.role = "";
    }
    setFormDataError(formDataErrorTemp);
  };


  const handleCheckboxChange = (value) => {
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };

    // Toggle the checkbox value in department array
    if (formDataTemp.department.includes(value)) {
      formDataTemp.department = formDataTemp.department.filter(
        (v) => v !== value
      );
    } else {
      formDataTemp.department.push(value);
    }

    // Clear error if department has values
    if (formDataTemp.department.length > 0) {
      formDataErrorTemp.department = "";
    }

    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  // const handleGenderChange = (value) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     gender: value, 
  //   }));
  // };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    let formDataTemp = { ...formData }
    formDataTemp["gender"] = event.target.value;
    setFormData(formDataTemp)
  };
  const handleHandChange = (event) => {
    setSelectedHand(event.target.value);
    let formDataTemp = { ...formData }
    formDataTemp["primaryHand"] = event.target.value;
    setFormData(formDataTemp)
  };

  const handlePrimaryHandChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      primaryHand: value,
    }));
  };

  const handleChange = (item) => {
    if (item.value === "Scenario Write") {
      handleCheckboxChange(
        selectedItem === "Scenario Write" ? "Scenario Read" : "Scenario Write"
      );
    } else if (item.value === "Scenario Read" && selectedItem == null) {
      handleCheckboxChange(item.value === "Scenario Read" && "Scenario Read");
    } else {
      handleCheckboxChange(item.value === "Scenario Read" && null);
    }
  };

  const onCellClicked = (event) => {
    // Check if the clicked cell should not trigger the row click
    if (event.column.colId !== "Action") {
      // navigate(`/admin/pro-user-details/${event.data.id}`)
      if (userData && userData.role == "admin") {
        navigate(`/admin/pro-user-details/${event.data.id}`);
      } else {
        navigate(`/pro-user-details/${event.data.id}`);
      }
    }
  };

  const dropdownRef = useRef(null);


  const handleClickOutside = (event) => {
    // Check if click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} />
          <span className="icn_bk_btn"><img src={mission_img} /></span>
          <div className="header_dashboard pro_dropdown">
            <h3 onClick={handleUsersDropdown} style={{ cursor: "pointer" }}>
              {usersDefault} <span><FontAwesomeIcon icon={faAngleDown} /></span>
            </h3>
            {expanded && (
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right show" ref={dropdownRef} >
                <span
                  className="dropdown-item dropdown-header"
                  onClick={() => {
                    setUserDefault("Pro Users");
                    setExpanded(false);
                  }}
                >
                  Pro Users
                </span>
                <div className="dropdown-divider"></div>
                <span
                  className="dropdown-item dropdown-header"
                  onClick={() => {
                    setUserDefault("Parallel Users");
                    setExpanded(false);
                  }}
                >
                  Parallel Users
                </span>
                <div className="dropdown-divider"></div>
                <span
                  className="dropdown-item dropdown-header"
                  onClick={() => {
                    setUserDefault("Instructors");
                    setExpanded(false);
                  }}
                >
                  Instructors
                </span>
              </div>
            )}
          </div>
        </div>
        {!isOnline &&
          <Button className="tablemodal_btn" onClick={addProUser}>
            <FontAwesomeIcon icon={faUserPlus} />
            Add Pro User
          </Button>}
      </div>
      <ProUserAddEdit
        showModal={showModal}
        roleData={roleData}
        department={department}
        genderOptions={genderOptions}
        primaryHandOptions={primaryHandOptions}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleChangeRole={handleChangeRole}
        handlePrimaryHandChange={handlePrimaryHandChange}
        handleSubmit={handleSubmit}
        headerText={roleAddEditModalProps.headerText}
        submitButtonText={roleAddEditModalProps.submitButtonText}
        formType={roleAddEditModalProps.formType}
        selectedItem={selectedItem}
        handleChange={handleChange}
        handleGenderChange={handleGenderChange}
        genderValue={genderValue}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedHand={selectedHand}
        setSelectedHand={setSelectedHand}
        handValue={handValue}
        handleHandChange={handleHandChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        userData={userData}
      />

      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this User"}
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
          // rowSelection="multiple"
          cacheBlockSize={10}
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
})(withNamespaces()(ProUsers));
