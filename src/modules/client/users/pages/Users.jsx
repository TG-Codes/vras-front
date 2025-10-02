import React, { useEffect, useRef } from "react";
import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
import UsersAddEdit from "../../../../utility/components/clients/UsersAddEdit";
import { toast, Bounce } from "react-toastify";
import UserPermissionList from "../../../../utility/components/clients/UserPermissionList";
import BackButton from "../../../../utility/components/BackButton";
import mission_img from "../../../../utility/assets/images/mission.png";

const baseUrL = process.env.REACT_APP_BASE_URL;

const Users = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse } = props;
  const [permissions, setPermissions] = useState([]);
  const filteredPermission = permissions.filter((item)=>{
    return item.module === "user" && item.type === "write"
  })
  useEffect(() => {
    if (
      userData.role === "user" &&
      typeof userData.permissions === "string" &&
      userData.permissions !== "{}"
    ) {
      setPermissions(JSON.parse(userData.permissions));
    }
  }, []);
  const authToken = userData.token;
  const [userID, setUserID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  };
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      name: "",
      permissions: [],
      fullName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
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
      notes: "",
      experienceLevel: "",
      stressLevel: "",
    });
    setCheckedValues([])
    setDateOfBirth(yesterday())
    setFormDataError({
      name: "",
      permissions: [],
      fullName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      mobile: "",
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
      notes: "",
      experienceLevel: "",
      stressLevel: "",
    });
  };
  const closeConfirmationAlert = () => {
    setShowAdminModal(false);
  };
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
  const columnDefs = [
    // { field: "fullName" },
    // { field: "name" },
    { headerName: 'Name', field: 'fullName' },
    { field: "email" },
    // { field: "lastname" },
    { field: "mobile" },
    { field: "username" },
    // { field: "password" },
    { field: "dateOfBirth" },
    { field: "gender" },
    { field: "primaryHand" },
    { field: "address" },
    { field: "city" },
    { field: "postalCode" },
    { field: "country" },
    { field: "emergencyContactName" },
    { field: "emergencyContactPhone" },
    { field: "medicalConditins" },
    { field: "allergies" },
    { field: "notes" },
    { field: "experienceLevel" },
    { field: "stressLevel" },
    // { field: "confirmPassword" },
    // {
    //   field: "Action",
    //   cellRenderer: (params) => {
    //     if (params.data) {
    //       return (
    //         <>
    //           {userData.role === "client" && (
    //             <div>
    //               <React.Fragment>
    //                 <button
    //                   onClick={(e) => editUsers(e, params)}
    //                   className="action_button edt_btn"
    //                 >
    //                   <FontAwesomeIcon icon={faEdit} />
    //                 </button>
    //                 <button
    //                   onClick={(e) => deleteUsers(e, params)}
    //                   className="action_button del_btn"
    //                 >
    //                   <FontAwesomeIcon icon={faTrash} />
    //                 </button>
    //               </React.Fragment>
    //               <button onClick={(e) => permissionInfo(e, params)}
    //               className="action_button info_btn"
    //               >
    //                 <FontAwesomeIcon icon={faInfoCircle} />
    //               </button>
    //             </div>
    //           )}
    
    //           {userData.role === "user" && filteredPermission.length>0 && (
    //             <div>
    //             <React.Fragment>
    //               <button
    //                 onClick={(e) => editUsers(e, params)}
    //                 className="action_button edt_btn"
    //               >
    //                 <FontAwesomeIcon icon={faEdit} />
    //               </button>
    //               <button
    //                 onClick={(e) => deleteUsers(e, params)}
    //                 className="action_button del_btn"
    //               >
    //                 <FontAwesomeIcon icon={faTrash} />
    //               </button>
    //             </React.Fragment>
    //             <button onClick={(e) => permissionInfo(e, params)}
    //             className="action_button info_btn"
    //             >
    //               <FontAwesomeIcon icon={faInfoCircle} />
    //             </button>
    //           </div>
    //           )}
    //         </>
    //       );
    //     } else {
    //       return null;
    //     }
    //   },
    // }
    
  ];
  const [showpermissionModal, setShowPermissionModal] = useState(false);
  const closePermissionModal = () => {
    setShowPermissionModal(false);
  };
  const [permissionListData, setPermissionListData] = useState([]);
  const permissionInfo = (e, params) => {
    if (params.data.role === "client"){
      setPermissionListData([
        {
            "value": 49,
            "label": "User",
            "module": "Module 1",
            "type": "write"
        },
        {
            "value": 50,
            "label": "User Read",
            "module": "Module 1",
            "type": "read"
        },
        {
            "value": 13,
            "label": "Session",
            "module": "Module 3",
            "type": "write"
        },
        {
            "value": 52,
            "label": "Session Read",
            "module": "Module 3",
            "type": "read"
        },
        {
            "value": 16,
            "label": "Scenario",
            "module": "Module 4",
            "type": "write"
        },
        {
            "value": 53,
            "label": "Scenario Read",
            "module": "Module 4",
            "type": "read"
        },
        {
            "value": 48,
            "label": "Target",
            "module": "Module 2",
            "type": "write"
        },
        {
            "value": 51,
            "label": "Target Read",
            "module": "Module 2",
            "type": "read"
        }
      ])
    }else{
      setPermissionListData(JSON.parse(params.data.permissions))
    }
    
    setShowPermissionModal(true);
  };
  const [getPermissions, setGetPermissions] = useState([]);

  // useEffect(()=>{
  //   fetchData()
  // },[])
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${baseUrL}/permissions`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.data.data.length > 0) {
        let permissionArr = [];
        response.data.data.map((item, index) => {
          let _hash = {};
          _hash["value"] = item.id;
          _hash["label"] = item.name;
          _hash["module"] = item.module;
          _hash["type"] = item.type;
          permissionArr.push(_hash);
        });
        setGetPermissions(permissionArr);
      }
    } catch (error) {
      console.log("error in permissions", error);
    }
  };
  // const [userPermission, setUserPermission]=useState([])
  // const permissionOfusers = userPermission.permissions;
  // console.log('permissionOfUsers', permissionOfusers)
  // const permissionInJson = userPermission.map((item)=>{
  //   return JSON.parse(item)
  // })
  // console.log('permissionInJson', permissionInJson)
  // console.log('userPermission', userPermission)
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/clients/pro-users?isOnline=1&role=user&isPro=0`;
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
            // setUserPermission(response.data.data.users)
            params.successCallback(
              response.data.data.users,
              parseInt(response.data.data.total)
            );
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
  });
  const deleteUsers = async (e, params) => {
    const userID = params?.data.id;
    setShowAdminModal(true);
    setUserID(userID);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/users/destroy/${userID}`,
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
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      loaderStateFalse();
    }
  };
  const [editObjUser, setEditObjUser] = useState({});
 const [checkedValues, setCheckedValues]= useState([]);
 const [paramsData, setparamsData] = useState([]);
  const editUsers = (e, params) => {
    fetchData();
    let data = params.data;
    const editDate = new Date('2024-05-26')
    setparamsData(data)
    let userAddEditModalPropsTemp = { ...userAddEditModalProps };
    userAddEditModalPropsTemp["formType"] = "edit";
    userAddEditModalPropsTemp["headerText"] = "Edit User";
    userAddEditModalPropsTemp["submitButtonText"] = "Update";
    setUserAddEditModalProps(userAddEditModalPropsTemp);
    setEditObjUser(data);

    let formDataTemp = { ...formData };
    formDataTemp["id"] = data.id;
    formDataTemp["name"] = data.name.split(" ")[0];
    formDataTemp["avatar"] = data.image;
    formDataTemp["fullName"] = data.fullName;
    formDataTemp["lastName"] = data.name.split(" ")[1];
    formDataTemp["email"] = data.email;
    formDataTemp["username"] = data.username;
    formDataTemp["password"] = data.password;
    formDataTemp["confirmPassword"] = data.confirmPassword;
    formDataTemp["mobile"] = data.mobile;
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
    formDataTemp["notes"] = data.notes;
    formDataTemp["experienceLevel"] = data.experienceLevel;
    formDataTemp["stressLevel"] = data.stressLevel;

    let jsonData;
    if (data.role==="user") {
      jsonData = JSON.parse(data.permissions);
    }else{
      jsonData = [
        {
            "value": 49,
            "label": "User",
            "module": "Module 1",
            "type": "write"
        },
        {
            "value": 50,
            "label": "User Read",
            "module": "Module 1",
            "type": "read"
        },
        {
            "value": 13,
            "label": "Session",
            "module": "Module 3",
            "type": "write"
        },
        {
            "value": 52,
            "label": "Session Read",
            "module": "Module 3",
            "type": "read"
        },
        {
            "value": 16,
            "label": "Scenario",
            "module": "Module 4",
            "type": "write"
        },
        {
            "value": 53,
            "label": "Scenario Read",
            "module": "Module 4",
            "type": "read"
        },
        {
            "value": 48,
            "label": "Target",
            "module": "Module 2",
            "type": "write"
        },
        {
            "value": 51,
            "label": "Target Read",
            "module": "Module 2",
            "type": "read"
        }
      ]
    }
    setCheckedValues(jsonData.map((permission) => permission))
      const permission = jsonData?.map((jsonData) => ({
        label: jsonData?.label,
        value: jsonData?.value,
        module: jsonData?.module,
        type: jsonData?.type,
      }));
    
      formDataTemp["permissions"] = permission;
    

    setFormData(formDataTemp);
    setDateOfBirth(editDate)
    setShowModal(true);
  };
  const [userAddEditModalProps, setUserAddEditModalProps] = useState({});
  const addUser = () => {
    fetchData();
    let userAddEditModalPropsTemp = { ...userAddEditModalProps };
    userAddEditModalPropsTemp["formType"] = "add";
    userAddEditModalPropsTemp["headerText"] = "Add User";
    userAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setUserAddEditModalProps(userAddEditModalPropsTemp);
    setShowModal(true);
  };
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    permissions: [],
    fullName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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
    notes: "",
    experienceLevel: "",
    stressLevel: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    permissions: [],
    fullName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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
    notes: "",
    experienceLevel: "",
    stressLevel: "",
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name === "") {
      isValid = false;
      formDataErrorTemp.name = "First name is required";
    }else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name = "First name can only contain alphanumeric characters and spaces";
    }
    
    if (formData.lastName === "") {
      isValid = false;
      formDataErrorTemp.lastName = "Last name is required";
    }else if (!/^[a-zA-Z0-9\s]+$/.test(formData.lastName)) {
      isValid = false;
      formDataErrorTemp.lastName = "Last name can only contain alphanumeric characters and spaces";
    }
    if (formData.permissions == null || formData.permissions.length === 0) {
      isValid = false;
      formDataErrorTemp.permissions = "Permission is required";
  }
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }

    if (formData.username === "") {
      isValid = false;
      formDataErrorTemp.username = "Username is required";
    }else if (!/^[a-zA-Z0-9\s]+$/.test(formData.username)) {
      isValid = false;
      formDataErrorTemp.username = "Username can only contain alphanumeric characters and spaces";
    }
    
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "Mobile is required";
    }

    // if (formData.address === "") {
    //   isValid = false;
    //   formDataErrorTemp.address = "address is required";
    // }

    // if (formData.city === "") {
    //   isValid = false;
    //   formDataErrorTemp.city = "city is required";
    // }

    // if (formData.postalCode === "") {
    //   isValid = false;
    //   formDataErrorTemp.postalCode = "postalCode is required";
    // }
    if (
      !/^[a-zA-Z0-9]+$/.test(formData.postalCode) &&
      formData.postalCode !== ""
    ) {
      isValid = false;
      formDataErrorTemp.postalCode = "Postal Code is invalid";
    } else {
      formDataErrorTemp.postalCode = "";
    }

    // if (formData.country === "") {
    //   isValid = false;
    //   formDataErrorTemp.country = "country is required";
    // }

    // if (formData.emergencyContactName === "") {
    //   isValid = false;
    //   formDataErrorTemp.emergencyContactName =
    //     "emergencyContactName is required";
    // }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.emergencyContactName) && formData.emergencyContactName !=="") {
      isValid = false;
      formDataErrorTemp.emergencyContactName = "Emergency Contact Name can only contain alphanumeric characters and spaces";
    }

    // if (formData.emergencyContactPhone === "") {
    //   isValid = false;
    //   formDataErrorTemp.emergencyContactPhone =
    //     "emergencyContactPhone is required";
    // }

    // if (formData.medicalConditions === "") {
    //   isValid = false;
    //   formDataErrorTemp.medicalConditions = "medicalConditions is required";
    // }

    // if (formData.allergies === "") {
    //   isValid = false;
    //   formDataErrorTemp.allergies = "allergies is required";
    // }

    // if (formData.notes === "") {
    //   isValid = false;
    //   formDataErrorTemp.notes = "notes is required";
    // }

    // if (formData.experienceLevel === "") {
    //   isValid = false;
    //   formDataErrorTemp.experienceLevel = "experienceLevel is required";
    // }

    // if (formData.stressLevel === "") {
    //   isValid = false;
    //   formDataErrorTemp.stressLevel = "stressLevel is required";
    // }

    // if (formData.permissions === "") {
    //   isValid = false;
    //   formDataErrorTemp.permissions = "permissions is required";
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
        formDataErrorTemp.name = "First name is required";
      }else if (/\d/.test(value)) {
        formDataErrorTemp.name = "First name cannot contain numbers";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "First name should not contain special characters";
      } else {
        formDataErrorTemp.name = "";
      }
    }

  

    if (name === "lastName") {
      if (value == "") {
        formDataErrorTemp.lastName = "Last Name is required";
      }else if (/\d/.test(value)) {
        formDataErrorTemp.lastName = "Last name cannot contain numbers";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Last Name should not contain special characters";
      } else {
        formDataErrorTemp.lastName = "";
      }
    }

    if (name === "username") {

      if (value == "") {
        formDataErrorTemp.username = "Username is required";
      } else {
        formDataErrorTemp.username = "";
      }
    }
    if (name === "permissions") {
      if (value == null || value ==0) {
        formDataErrorTemp.permissions = "Permission is required";
      } else {
        formDataErrorTemp.permissions = "";
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

    // if (name === "password") {
    //   if (value == "") {
    //     formDataErrorTemp.password = "password is required";
    //   } else {
    //     formDataErrorTemp.password = "";
    //   }
    // }

    // if (name === "confirmPassword") {
    //   if (value == "") {
    //     formDataErrorTemp.confirmPassword = "confirmPassword is required";
    //   } else {
    //     formDataErrorTemp.confirmPassword = "";
    //   }
    // }

    if (name === "mobile") {
      if (value == "") {
        formDataErrorTemp.mobile = "Mobile Number is required";
      }else if (!/^\d{10}$/.test(value)) {
        formDataErrorTemp.mobile = "Please provide valid Mobile Number";
      } else {
        formDataErrorTemp.mobile = "";
      }
    }

    // if (name === "dateOfBirth") {
    //   if (value == "") {
    //     formDataErrorTemp.dateOfBirth = "dateOfBirth is required";
    //   } else {
    //     formDataErrorTemp.dateOfBirth = "";
    //   }
    // }

    // if (name === "gender") {
    //   if (value == "") {
    //     formDataErrorTemp.gender = "gender is required";
    //   } else {
    //     formDataErrorTemp.gender = "";
    //   }
    // }

    // if (name === "primaryHand") {
    //   if (value == "") {
    //     formDataErrorTemp.primaryHand = "primaryHand is required";
    //   } else {
    //     formDataErrorTemp.primaryHand = "";
    //   }
    // }

    if (name === "address") {
      if (value == "") {
        formDataErrorTemp.address = "address is required";
      } else {
        formDataErrorTemp.address = "";
      }
    }

    if (name === "city") {
      if (value == "") {
        formDataErrorTemp.city = "city is required";
      } else {
        formDataErrorTemp.city = "";
      }
    }

    // if (name === "postalCode") {
    //   if (value == "") {
    //     formDataErrorTemp.postalCode = "postalCode is required";
    //   } else {
    //     formDataErrorTemp.postalCode = "";
    //   }
    // }
    if (name === "postalCode") {
      if (!/^[a-zA-Z0-9]+$/.test(value) && value !== "") {
        formDataErrorTemp.postalCode = "Postal Code is invalid";
      } else {
        formDataErrorTemp.postalCode = "";
      }
    }

    if (name === "country") {
      if (value == "") {
        formDataErrorTemp.country = "country is required";
      } else {
        formDataErrorTemp.country = "";
      }
    }

    if (name === "emergencyContactName") {
      if (value == "") {
        formDataErrorTemp.emergencyContactName =
          "emergencyContactName is required";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.emergencyContactName = "Emergency Contact Name should not contain special characters";
      } else {
        formDataErrorTemp.emergencyContactName = "";
      }
    }

    // if (name === "emergencyContactPhone") {
    //   if (value == "") {
    //     formDataErrorTemp.emergencyContactPhone =
    //       "emergencyContactPhone is required";
    //   } else {
    //     formDataErrorTemp.emergencyContactPhone = "";
    //   }
    // }
    if (name === "emergencyContactPhone") {
      if (!/^\d{10}$/.test(value) && value !=="") {
        formDataErrorTemp.emergencyContactPhone =
          "Please provide valid Emergency Contact Number";
      } else {
        formDataErrorTemp.emergencyContactPhone = "";
      }
    }

    // if (name === "medicalConditions") {
    //   if (value == "") {
    //     formDataErrorTemp.medicalConditions = "medicalConditions is required";
    //   } else {
    //     formDataErrorTemp.medicalConditions = "";
    //   }
    // }

    // if (name === "allergies") {
    //   if (value == "") {
    //     formDataErrorTemp.allergies = "allergies is required";
    //   } else {
    //     formDataErrorTemp.allergies = "";
    //   }
    // }

    // if (name === "notes") {
    //   if (value == "") {
    //     formDataErrorTemp.notes = "notes is required";
    //   } else {
    //     formDataErrorTemp.notes = "";
    //   }
    // }

    // if (name === "experienceLevel") {
    //   if (value == "") {
    //     formDataErrorTemp.experienceLevel = "experienceLevel is required";
    //   } else {
    //     formDataErrorTemp.experienceLevel = "";
    //   }
    // }
    if (name === "experienceLevel") {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        formDataErrorTemp.experienceLevel = "Experience Level must have decimal value";
      } else {
        formDataErrorTemp.experienceLevel = "";
      }
  }
    // if (name === "stressLevel") {
    //   if (value == "") {
    //     formDataErrorTemp.stressLevel = "stressLevel is required";
    //   } else {
    //     formDataErrorTemp.stressLevel = "";
    //   }
    // }
    if (name === "stressLevel") {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        formDataErrorTemp.stressLevel = "Stress Level must have decimal value";
      } else {
        formDataErrorTemp.stressLevel = "";
      }
  }
    // if (name === "permissions") {
    //   if (value == "") {
    //     formDataErrorTemp.permissions = "permissions is required";
    //   } else {
    //     formDataErrorTemp.permissions = "";
    //   }
    // }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };
  const [selectedValue, setSelectedValue] = useState("male");
  const genderValue = ["male","female"]
  const [handValue, setHandValue]=useState("right")
  const handArray = ["right", "left"]
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
     setSelectedImage(imageFile);
    setImageLabel("Change Image");
  
    // if (imageFile) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(imageFile);
    //   reader.onload = () => {
    //     const base64Image = reader.result.split(',')[1]; // Extract base64 data from result
    //     // Now you have the image in base64 format, you can use it as needed
    //     console.log("Base64 Image:", base64Image);
    //     setSelectedImage({name:base64Image})
    //     // Call your function to handle the base64 image data, e.g., handleSubmit(base64Image);
    //   };
    //   reader.onerror = (error) => {
    //     console.error('Error reading the file:', error);
    //   };
    // }
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
  
  const [dateOfBirth, setDateOfBirth] = useState(yesterday());
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };
  const formattedDateOfBirth = formatDate(dateOfBirth);
  const [selectedObjects, setSelectedObjects] = useState([]);
  

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const selectedObject = getPermissions.find((item) => item.value === value);
  
    if (event.target.checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: [...prevFormData.permissions, selectedObject],
      }));
      setCheckedValues((prevCheckedValues) => [
        ...prevCheckedValues,
        selectedObject,
      ]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: prevFormData.permissions.filter(
          (obj) => obj.value !== value
        ),
      }));
      setCheckedValues((prevCheckedValues) =>
        prevCheckedValues.filter((obj) => obj.value !== value)
      );
    }
  };
  
  const formatData = () => {
    let passowrd = generateRandomPassword(12);
    let data = {};
    data["name"] = formData.name + " " + formData.lastName;
    data["permissions"] = JSON.stringify(formData.permissions);
    // data["avatar"] = selectedImage;
    // data["fullName"] = formData.fullName;
    // data["lastName"] = formData.lastName;
    data["email"] = formData.email;
    data["username"] = formData.username;
    data["password"] = passowrd;
    data["confirmPassword"] = passowrd;
    data["mobile"] = formData.mobile;
    data["dateOfBirth"] = formData.dateOfBirth;
    data["gender"] = selectedValue;
    data["primaryHand"] = handValue;
    data["address"] = formData.address;
    data["city"] = formData.city;
    data["postalCode"] = formData.postalCode;
    data["country"] = formData.country;
    data["emergencyContactName"] = formData.emergencyContactName;
    data["emergencyContactPhone"] = formData.emergencyContactPhone;
    data["medicalConditions"] = formData.medicalConditions;
    data["allergies"] = formData.allergies;
    data["notes"] = formData.notes;
    data["experienceLevel"] = formData.experienceLevel;
    data["stressLevel"] = formData.stressLevel;
    return data;
  };
  const handleChangePermissions = (event) => {
    let formDataTemp = { ...formData };
    formDataTemp["permissions"] = event;
    setFormData(formDataTemp);
    let formDataErrorTemp = { ...formDataError };
    if (Object.keys(event).length === 0) {
      formDataErrorTemp.permissions = "Permission is required";
    } else {
      formDataErrorTemp.permissions = "";
    }
    setFormDataError(formDataErrorTemp);
  };
  const handleSubmit = async () => {
    if (validateForm(userAddEditModalProps.formType)) {
    loaderStateTrue();
    let url;
    let method;
    let data;
    if (userAddEditModalProps.formType === "add") {
      data = formatData();
      url = `${baseUrL}/users/store`;
      method = "post";
    } else {
      let { password, confirmPassword, ...newObj } = formatData();
      data = newObj;
      url = `${baseUrL}/users/update/${formData.id}`;
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
      closeModal()
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
  const checkboxdata = getPermissions;
  const rowHeight=70
  const headerHeight=60
  return (
    <>
    <div className="globaltable_holder">
      {/* {userData.role === "client" && ( */}
        <div className="table_modal_open">
        <div className="back_btn_caption_hold">
        <BackButton className={"back-button"} />
        <span className="icn_bk_btn"><img src={mission_img}/></span>
          <h3>Online Users</h3>
          </div>
          {/* <button className="tablemodal_btn" onClick={addUser}>
            <FontAwesomeIcon icon={faUserPlus} /> Add Users
          </button> */}
        </div>
      {/* )} */}

      {/* {userData.role === "user" &&
       filteredPermission.length>0 && (
        <div className="table_modal_open">
        <h3>Users</h3>
        <button className="tablemodal_btn" onClick={addUser}>
          <FontAwesomeIcon icon={faUserPlus} /> Add Users
        </button>
      </div>
        )} */}

      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowModelType="infinite"
          onGridReady={onGridReady}
          components={components}
          cacheBlockSize={10}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
        />
      </div>
      {/* <UsersAddEdit
        showModal={showModal}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        headerText={userAddEditModalProps.headerText}
        submitButtonText={userAddEditModalProps.submitButtonText}
        formType={userAddEditModalProps.formType}
        editObjUser={editObjUser}
        setEditObjUser={setEditObjUser}
        handleInputChange={handleInputChange}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        genderValue={genderValue}
        handValue={handValue}
        setHandValue={setHandValue}
        handArray={handArray}
        value1={"male"}
        value2={"female"}
        handleSubmit={handleSubmit}
        selectedImage={selectedImage}
        imageLabel={imageLabel}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        handleImageClick={handleImageClick}
        getPermissions={getPermissions}
        handleCheckboxChange={handleCheckboxChange}
        checkedValues={checkedValues}
        paramsData={paramsData}
        handleChangePermissions={handleChangePermissions}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        yesterday={yesterday}
      /> */}
      {/* <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this User?"}
        headerText={"Delete?"}
      />
      <UserPermissionList
        showModal={showpermissionModal}
        closeModal={closePermissionModal}
        permissionListData={permissionListData}
      /> */}
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  Users
);
