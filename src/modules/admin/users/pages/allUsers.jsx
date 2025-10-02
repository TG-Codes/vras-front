import i18next from "i18next";
import React, { useEffect } from "react";
import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import add_home_img from "../../../../utility/assets/images/add_home_work.png";
import { connect } from "react-redux";
// import { Button } from "react-bootstrap";
import Button from "../../../../utility/components/Button";
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
import { withNamespaces } from "react-i18next";
import Switch from "react-switch";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import BackButton from "../../../../utility/components/BackButton";
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const AllUsers = (props) => {
  const { userData, loaderStateTrue, loaderStateFalse, loginSuccess, t } = props;
  const navigate = useNavigate()
  const authToken = userData.token;
  const [clientID, setClientID] = useState("");
  const [filter , setFilter]= useState('')
  const [debouncedFilter] = useDebounce(filter, 300); // 300ms debounce
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  useEffect(()=>{
    resetDataGrid()
  },[debouncedFilter])
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
  const location = useLocation();
  const isOnline = location.search?.split('?')[1]?.slice(-1);
  const [filterActive, setFilterActive] = useState(false);
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // {
    //   headerName: "Select",
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 50,
    // },
    { field: "name",width:'200' },
    { field: "status", width:'100'},
    { field: "client", width:'150'},
    { field: "username", width:'200'},
    { field: "mobile", width:'150'},
    { field: "department", width:'150'},
    { field: "dateOfBirth", width:'150'},
    { field: "gender", width:'100'},
    { field: "primaryHand", width:'150'},
    { field: "address", width:'300'},
    { field: "city", width:'150'},
    { field: "postalCode", width:'150'},
    { field: "country", width:'150'},
    { field: "emergencyContactName", width:'250'},
    { field: "emergencyContactPhone", width:'250'},
    { field: "medicalConditions", width:'200'},
    { field: "allergies", width:'150'},
    { field: "experienceLevel", width:'200'},
    { field: "stressLevel", width:'150'},
  ]);

  const [editObjClient, setEditObjClient] = useState({});
  // const editClient = (e, params) => {
  //   let data = params.data;
  //   let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
  //   clientAddEditModalPropsTemp["formType"] = "edit";
  //   clientAddEditModalPropsTemp["headerText"] = "Edit Weapons";
  //   clientAddEditModalPropsTemp["submitButtonText"] = "Update";
  //   setClientAddEditModalProps(clientAddEditModalPropsTemp);
  //   setEditObjClient(data);

  //   // let formDataTemp = { ...formData };
  //   // formDataTemp["id"] = data.id;
  //   // formDataTemp["name"] = data.name;
  //   // formDataTemp["generation"] = data.generation;
  //   // formDataTemp["type"] = data.type;
  //   // formDataTemp["description"] = data.description;
  //   // formDataTemp["accuracy"] = data.accuracy;
  //   // formDataTemp["reloadTime"] = data.reloadTime;
  //   // formDataTemp["damage"] = data.damage;
  //   // formDataTemp["fireRate"] = data.fireRate;
  //   // formDataTemp["recoil"] = data.recoil;

  //   let formDataTemp = { ...formData };
  //   formDataTemp["id"] = data.id;
  //   formDataTemp["name"] = data.name;
  //   formDataTemp["generation"] = data.generation;
  //   formDataTemp["type"] = data.type;
  //   formDataTemp["description"] = data.description;
  //   formDataTemp["accuracy"] = data.accuracy;
  //   formDataTemp["reloadTime"] = data.reloadTime;
  //   formDataTemp["damage"] = data.damage;
  //   formDataTemp["fireRate"] = data.fireRate;
  //   formDataTemp["recoil"] = data.recoil;
  //   formDataTemp["magazineCapacity"] = data.magazineCapacity;
  //   formDataTemp["bulletType"] = data.bulletType;
  //   formDataTemp["bulletCount"] = data.bulletCount;
  //   formDataTemp["grenadeType"] = data.grenadeType;
  //   formDataTemp["grenadeCount"] = data.grenadeCount;
  //   formDataTemp["weight"] = data.weight;
  //   formDataTemp["length"] = data.length;
  //   formDataTemp["height"] = data.height;
  //   // formDataTemp["width"] = data.width;
  //   formDataTemp["manufacturer"] = data.manufacturer;
  //   formDataTemp["countryOfOrigin"] = data.countryOfOrigin;
  //   formDataTemp["yearOfManufacture"] = data.yearOfManufacture;
  //   formDataTemp["notes"] = data.notes;

  //   setFormData(formDataTemp);
  //   if (data.yearOfManufacture) {
  //     const yearAsDate = new Date(data.yearOfManufacture, 0, 1); // January 1st of the year
  //     setSelectedYear(yearAsDate);
  //   } else {
  //     setSelectedYear(new Date(currentYear, 0, 1)); // Default to current year if not provided
  //   }  
  //   setShowModal(true);
  // };
  const deleteClient = async (e, params) => {
    const clientId = params?.data.id;
    setShowAdminModal(true);
    setClientID(clientId);
  };
  const confrim = async () => {
    loaderStateTrue();
    try {
      const response = await axios.delete(
        `${baseUrL}/admin/weapons/destroy/${clientID}`,
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
      console.error("Error deleting client:", error);
      loaderStateFalse();
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      id: "",
      name: "",
      generation: "",
      type: "",
      description: "",
      accuracy: "",
      reloadTime: "",
      damage: "",
      fireRate: "",
      recoil: "",
      magazineCapacity: "",
      bulletType: "",
      bulletCount: "",
      grenadeType: "",
      grenadeCount: "",
      weight: "",
      length: "",
      height: "",
      // width: "",
      manufacturer: "",
      countryOfOrigin: "",
      yearOfManufacture: "",
      notes: "",
    });
    setFormDataError({
      name: "",
      generation: "",
      type: "",
      description: "",
      accuracy: "",
      reloadTime: "",
      damage: "",
      fireRate: "",
      recoil: "",
      magazineCapacity: "",
      bulletType: "",
      bulletCount: "",
      grenadeType: "",
      grenadeCount: "",
      weight: "",
      length: "",
      height: "",
      // width: "",
      manufacturer: "",
      countryOfOrigin: "",
      yearOfManufacture: "",
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
    name: "",
    generation: "",
    type: "",
    description: "",
    accuracy: "",
    reloadTime: "",
    damage: "",
    fireRate: "",
    recoil: "",
    magazineCapacity: "",
    bulletType: "",
    bulletCount: "",
    grenadeType: "",
    grenadeCount: "",
    weight: "",
    length: "",
    height: "",
    // width: "",
    manufacturer: "",
    countryOfOrigin: "",
    yearOfManufacture: "",
    notes: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    generation: "",
    type: "",
    description: "",
    accuracy: "",
    reloadTime: "",
    damage: "",
    fireRate: "",
    recoil: "",
    magazineCapacity: "",
    bulletType: "",
    bulletCount: "",
    grenadeType: "",
    grenadeCount: "",
    weight: "",
    length: "",
    height: "",
    // width: "",
    manufacturer: "",
    countryOfOrigin: "",
    yearOfManufacture: "",
    notes: "",
  });

  // const validateForm = () => {
  //   let isValid = true;
  //   let formDataErrorTemp = Object.assign({}, formDataError);
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (formData.name === "") {
  //     isValid = false;
  //     formDataErrorTemp.name = "Name is required";
  //   }
  //   // if (formData.generation === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.generation = "generation is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.generation) &&
  //     formData.generation !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.generation = "Generation is invalid";
  //   } else {
  //     formDataErrorTemp.generation = "";
  //   }

  //   // if (formData.type === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.type = "type is required";
  //   // }

  //   // if (formData.description === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.description = "description is required";
  //   // }

  //   // if (formData.accuracy === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.accuracy = "accuracy is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.accuracy) &&
  //     formData.accuracy !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.accuracy = "Accuracy is invalid";
  //   } else {
  //     formDataErrorTemp.accuracy = "";
  //   }

  //   // if (formData.reloadTime === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.reloadTime = "reloadTime is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.reloadTime) &&
  //     formData.reloadTime !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.reloadTime = "Reload time is invalid";
  //   } else {
  //     formDataErrorTemp.reloadTime = "";
  //   }

  //   // if (formData.damage === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.damage = "damage is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.damage) &&
  //     formData.damage !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.damage = "Damage is invalid";
  //   } else {
  //     formDataErrorTemp.damage = "";
  //   }

  //   // if (formData.fireRate === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.fireRate = "fireRate is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.fireRate) &&
  //     formData.fireRate !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.fireRate = "Fire Rate is invalid";
  //   } else {
  //     formDataErrorTemp.fireRate = "";
  //   }


  //   // if (formData.recoil === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.recoil = "recoil is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.recoil) &&
  //     formData.recoil !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.recoil = "Recoil is invalid";
  //   } else {
  //     formDataErrorTemp.recoil = "";
  //   }


  //   // if (formData.magazineCapacity === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.magazineCapacity = "magazineCapacity is required";
  //   // }

  //   // if (formData.bulletType === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.bulletType = "bulletType is required";
  //   // }
  //   // if (formData.bulletCount === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.bulletCount = "bulletCount is required";
  //   // }

  //   // if (formData.grenadeType === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.grenadeType = "grenadeType is required";
  //   // }

  //   // if (formData.grenadeCount === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.grenadeCount = "grenadeCount is required";
  //   // }

  //   // if (formData.weight === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.weight = "weight is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.weight) &&
  //     formData.weight !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.weight = "Weight is invalid";
  //   } else {
  //     formDataErrorTemp.weight = "";
  //   }

  //   // if (formData.length === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.length = "length is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.length) &&
  //     formData.length !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.length = "Length is invalid";
  //   } else {
  //     formDataErrorTemp.length = "";
  //   }

  //   // if (formData.height === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.height = "height is required";
  //   // }
  //   if (
  //     /^\d+$/.test(formData.height) &&
  //     formData.height !== ""
  //   ) {
  //     isValid = false;
  //     formDataErrorTemp.height = "Length is invalid";
  //   } else {
  //     formDataErrorTemp.height = "";
  //   }

  //   // if (formData.width === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.width = "width is required";
  //   // }
  //   // if (
  //   //   /^\d+$/.test(formData.width) &&
  //   //   formData.width !== ""
  //   // ) {
  //   //   isValid = false;
  //   //   formDataErrorTemp.width = "Length is invalid";
  //   // } else {
  //   //   formDataErrorTemp.width = "";
  //   // }

  //   // if (formData.manufacturer === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.manufacturer = "manufacturer is required";
  //   // }

  //   // if (formData.countryOfOrigin === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.countryOfOrigin = "countryOfOrigin is required";
  //   // }

  //   // if (formData.yearOfManufacture === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.yearOfManufacture = "yearOfManufacture is required";
  //   // }

  //   // if (formData.notes === "") {
  //   //   isValid = false;
  //   //   formDataErrorTemp.notes = "notes is required";
  //   // }

  //   setFormDataError(formDataErrorTemp);
  //   return isValid;
  // };

  // const handleInputChange = (e) => {
  //   let { name, value } = e.target;
  //   let formDataTemp = Object.assign({}, formData);
  //   let formDataErrorTemp = Object.assign({}, formDataError);
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   formDataTemp[name] = value;
  //   if (name === "name") {
  //     if (value === "") {
  //       formDataErrorTemp.name = "Name is required";
  //     } else if (!isNaN(value)) {
  //       formDataErrorTemp.name = "Name should not be a number";
  //     } else if (/[^a-zA-Z0-9\s]/.test(value)) {
  //       formDataErrorTemp.name = "Name should not contain special characters";
  //     } else {
  //       formDataErrorTemp.name = "";
  //     }
  //   }
    

  //   if (name === "generation") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.generation = "Generation must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.generation = "Generation must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.generation = "";
  //     }
  //   }
  //   // if (name === "type") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.type = "type is required";
  //   //   } else {
  //   //     formDataErrorTemp.type = "";
  //   //   }
  //   // }
  //   if (name === "type") {
  //  if (!isNaN(value)&& value !== "") {
  //       formDataErrorTemp.type = "Type should not be a number";
  //     } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //       formDataErrorTemp.type = "Type should not contain special characters";
  //     } else {
  //       formDataErrorTemp.type = "";
  //     }
  //   }


  //   // if (name === "description") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.description = "description is required";
  //   //   } else {
  //   //     formDataErrorTemp.description = "";
  //   //   }
  //   // }
  //   if (name === "description") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.description = "Description should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.description = "Description should not contain special characters";
  //        } else {
  //          formDataErrorTemp.description = "";
  //        }
  //      }

  //   // if (name === "accuracy") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.accuracy = "accuracy is required";
  //   //   } else {
  //   //     formDataErrorTemp.accuracy = "";
  //   //   }
  //   // }
  //   if (name === "accuracy") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.accuracy = "Accuracy must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.accuracy = "Accuracy must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.accuracy = "";
  //     }
  //   }

  //   // if (name === "reloadTime") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.reloadTime = "reloadTime is required";
  //   //   } else {
  //   //     formDataErrorTemp.reloadTime = "";
  //   //   }
  //   // }
  //   if (name === "reloadTime") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.reloadTime = "Reload time must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.reloadTime = "Reload time must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.reloadTime = "";
  //     }
  //   }

  //   // if (name === "damage") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.damage = "damage is required";
  //   //   } else {
  //   //     formDataErrorTemp.damage = "";
  //   //   }
  //   // }
  //   if (name === "damage") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.damage = "Damage must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.damage = "Damage must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.damage = "";
  //     }
  //   }

  //   // if (name === "fireRate") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.fireRate = "fireRate is required";
  //   //   } else {
  //   //     formDataErrorTemp.fireRate = "";
  //   //   }
  //   // }
  //   if (name === "fireRate") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.fireRate = "Fire Rate must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.fireRate = "Fire Rate must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.fireRate = "";
  //     }
  //   }

  //   // if (name === "recoil") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.recoil = "recoil is required";
  //   //   } else {
  //   //     formDataErrorTemp.recoil = "";
  //   //   }
  //   // }
  //   if (name === "recoil") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.recoil = "Recoil must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.recoil = "Recoil must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.recoil = "";
  //     }
  //   }

  //   if (name === "magazineCapacity") {
  //    if (!/^\d+$/.test(value)&& value !== "") {
  //       formDataErrorTemp.magazineCapacity = "Magazine Capacity must be an integer";
  //     } else {
  //       formDataErrorTemp.magazineCapacity = "";
  //     }
  //   }
    

  //   // if (name === "bulletType") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.bulletType = "bulletType is required";
  //   //   } else {
  //   //     formDataErrorTemp.bulletType = "";
  //   //   }
  //   // }
  //   if (name === "bulletType") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.bulletType = "Bullet type should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.bulletType = "Bullet type should not contain special characters";
  //        } else {
  //          formDataErrorTemp.bulletType = "";
  //        }
  //      }

    

  //   // if (name === "bulletCount") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.bulletCount = "bulletCount is required";
  //   //   }
  //   //   // else if (!emailRegex.test(value)) {
  //   //   //   formDataErrorTemp.email = "Invalid email address";
  //   //   // }
  //   //   else {
  //   //     formDataErrorTemp.bulletCount = "";
  //   //   }
  //   // }
  //   if (name === "bulletCount") {
  //     if (!/^\d+$/.test(value)&& value !== "") {
  //        formDataErrorTemp.bulletCount = "Bullet count must be an integer";
  //      } else {
  //        formDataErrorTemp.bulletCount = "";
  //      }
  //    }
  //   // if (name === "grenadeType") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.grenadeType = "grenadeType is required";
  //   //   } else {
  //   //     formDataErrorTemp.grenadeType = "";
  //   //   }
  //   // }
  //   if (name === "grenadeType") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.grenadeType = "Grenade type should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.grenadeType = "Grenade type should not contain special characters";
  //        } else {
  //          formDataErrorTemp.grenadeType = "";
  //        }
  //      }

  //   // if (name === "grenadeCount") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.grenadeCount = "grenadeCount is required";
  //   //   } else {
  //   //     formDataErrorTemp.grenadeCount = "";
  //   //   }
  //   // }
  //   if (name === "grenadeCount") {
  //     if (!/^\d+$/.test(value)&& value !== "") {
  //        formDataErrorTemp.grenadeCount = "Grenade count must be an integer";
  //      } else {
  //        formDataErrorTemp.grenadeCount = "";
  //      }
  //    }

  //   // if (name === "weight") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.weight = "weight is required";
  //   //   } else {
  //   //     formDataErrorTemp.weight = "";
  //   //   }
  //   // }
  //   if (name === "weight") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.weight = "Weight must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.weight = "Weight must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.weight = "";
  //     }
  //   }


  //   // if (name === "length") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.length = "length is required";
  //   //   } else {
  //   //     formDataErrorTemp.length = "";
  //   //   }
  //   // }
  //   if (name === "length") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.length = "Length must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.length = "Length must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.length = "";
  //     }
  //   }

  //   // if (name === "height") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.height = "height is required";
  //   //   } else {
  //   //     formDataErrorTemp.height = "";
  //   //   }
  //   // }
  //   if (name === "height") {
  //     if (isNaN(value)&& value !== "") {
  //       formDataErrorTemp.height = "Height must be a number";
  //     } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //       formDataErrorTemp.height = "Height must have exactly two decimal places";
  //     } else {
  //       formDataErrorTemp.height = "";
  //     }
  //   }

  //   // if (name === "width") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.fireRate = "width is required";
  //   //   } else {
  //   //     formDataErrorTemp.fireRate = "";
  //   //   }
  //   // }
  //   // if (name === "width") {
  //   //   if (isNaN(value)&& value !== "") {
  //   //     formDataErrorTemp.width = "Width must be a number";
  //   //   } else if (!/^\d+\.\d{2}$/.test(value)&& value !== "") {
  //   //     formDataErrorTemp.width = "Width must have exactly two decimal places";
  //   //   } else {
  //   //     formDataErrorTemp.width = "";
  //   //   }
  //   // }

  //   // if (name === "manufacturer") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.manufacturer = "manufacturer is required";
  //   //   } else {
  //   //     formDataErrorTemp.manufacturer = "";
  //   //   }
  //   // }
  //   if (name === "manufacturer") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.manufacturer = "Manufacturer should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.manufacturer = "Manufacturer should not contain special characters";
  //        } else {
  //          formDataErrorTemp.manufacturer = "";
  //        }
  //      }

  //   // if (name === "countryOfOrigin") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.countryOfOrigin = "countryOfOrigin is required";
  //   //   } else {
  //   //     formDataErrorTemp.countryOfOrigin = "";
  //   //   }
  //   // }
  //   if (name === "countryOfOrigin") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.countryOfOrigin = "Country of origin should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.countryOfOrigin = "Country of origin should not contain special characters";
  //        } else {
  //          formDataErrorTemp.countryOfOrigin = "";
  //        }
  //      }

  //   if (name === "yearOfManufacture") {
  //     if (value == "") {
  //       formDataErrorTemp.yearOfManufacture = "yearOfManufacture is required";
  //     } else {
  //       formDataErrorTemp.yearOfManufacture = "";
  //     }
  //   }

  //   // if (name === "notes") {
  //   //   if (value == "") {
  //   //     formDataErrorTemp.notes = "notes is required";
  //   //   } else {
  //   //     formDataErrorTemp.notes = "";
  //   //   }
  //   // }
  //   if (name === "notes") {
  //     if (!isNaN(value)&& value !== "") {
  //          formDataErrorTemp.notes = "Notes should not be a number";
  //        } else if (/[^a-zA-Z0-9\s]/.test(value)&& value !== "") {
  //          formDataErrorTemp.notes = "Notes should not contain special characters";
  //        } else {
  //          formDataErrorTemp.notes = "";
  //        }
  //      }
  //   setFormData(formDataTemp);
  //   setFormDataError(formDataErrorTemp);
  // };
  // const currentYear = new Date().getFullYear();
  // const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  // const handleYearChange = (date) => {
  //   if (date) {
  //     const year = date.getFullYear().toString();
  //     setSelectedYear(year);
  //   } else {
  //     setSelectedYear(currentYear.toString());
  //   }
  // };
  // // const formatData = () => {
  //   let data = {};
  //   data["name"] = formData.name;
  //   data["generation"] = formData.generation;
  //   data["type"] = formData.type;
  //   data["description"] = formData.description;
  //   data["accuracy"] = formData.accuracy;
  //   data["reloadTime"] = formData.reloadTime;
  //   data["damage"] = formData.damage;
  //   data["fireRate"] = formData.fireRate;
  //   data["recoil"] = formData.recoil;
  //   data["magazineCapacity"] = formData.magazineCapacity;
  //   data["bulletType"] = formData.bulletType;
  //   data["bulletCount"] = formData.bulletCount;
  //   data["grenadeType"] = formData.grenadeType;
  //   data["grenadeCount"] = formData.grenadeCount;
  //   data["weight"] = formData.weight;
  //   data["length"] = formData.length;
  //   data["height"] = formData.height;
  //   // data["width"] = formData.width;
  //   data["manufacturer"] = formData.manufacturer;
  //   data["countryOfOrigin"] = formData.countryOfOrigin;
  //   data["yearOfManufacture"] = selectedYear;
  //   data["notes"] = formData.notes;
  //   return data;
  // };
  // const handleChangeSubscription = (event) => {
  //   console.log("event", event);
  //   let formDataTemp = { ...formData }
  //   formDataTemp["subscriptionId"] = event
  //   setFormData(formDataTemp);

  // }

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     loaderStateTrue();
  //     let url;
  //     let method;
  //     let data;

  //     if (clientAddEditModalProps.formType === "add") {
  //       data = formatData();
  //       url = `${baseUrL}/admin/weapons/store`;
  //       method = "post";
  //     } else {
  //       let { password, confirmPassword, ...newObj } = formatData();
  //       data = newObj;
  //       url = `${baseUrL}/admin/weapons/update/${formData.id}`;
  //       method = "put";
  //     }
  //     addEditPostData(url, data, method);
  //   }
  // };

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
      setShowModal(false);
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
    let clientAddEditModalPropsTemp = { ...clientAddEditModalProps };
    clientAddEditModalPropsTemp["formType"] = "add";
    clientAddEditModalPropsTemp["headerText"] = "Add Weapons";
    clientAddEditModalPropsTemp["submitButtonText"] = "Submit";
    setClientAddEditModalProps(clientAddEditModalPropsTemp);
    setShowModal(true);
  };

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/total-pro-users?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (debouncedFilter) {
          url += `keywords=${encodeURIComponent(debouncedFilter)}`;
        }
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        if (filterActive) {
          url += `&isOnline=1`
        }
        url += `&_start=${startRow + 1}&_end=${endRow}`;
        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            params.successCallback(
              response.data.data.users,
              parseInt(response.data.data.total)
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
  const [startDate, setStartDate] = useState(new Date());
  const startDateString = startDate.toLocaleDateString("en-GB");
  const [selectedValue, setSelectedValue] = useState("active");
  const onFilterChange = (checked) => {
    setFilterActive(checked);
    if (checked == false) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete('isOnline');
      navigate(`?${currentParams.toString()}`, { replace: true });
    }
    // if (gridApi) {
    //   gridApi.setDatasource(datasource);
    // }
    // filterActiveRef.current = checked;
    // resetDataGrid()
  };
  const onCellClicked = (event) => {
    // Check if the clicked cell should not trigger the row click
    if (event.column.colId !== "Action") {
      navigate(`/admin/pro-user-details/${event.data.id}`);
    }
  };
  useEffect(() => {
    if (isOnline == 1) {
      setFilterActive(true);
    }
    resetDataGrid()
  }, [filterActive])
  return (
    <>
      <div className="globaltable_holder">
        <div>
          <div className="table_modal_open">
          <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={add_home_img}/></span>
             <h3>Pro Users</h3>
            </div>

            <div className="switch_button resp_position">
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: '12px',
                      color: 'white',
                      paddingRight: '10px',
                      paddingTop: '2px',
                    }}
                  >
                    All
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: 12,
                      color: 'white',
                      paddingTop: '2px',
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: 12,
                      color: '#FFF',
                    }}
                  >

                  </div>
                }
                uncheckedHandleIcon={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      fontSize: 12,
                      color: '#FFF',
                    }}
                  >

                  </div>
                }

              />
              <input
            className="dep_search"
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter data..."
            />
            </div>
            {/* <Button className="tablemodal_btn" onClick={addClient}>
              <FontAwesomeIcon icon={faUserPlus} /> {t("addWeapons")}
            </Button> */}
          </div>
          {/* <WeaponsAddEdit
            formData={formData}
            formDataError={formDataError}
            showModal={showModal}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            //  subscriptionData={subscriptionData}
            headerText={clientAddEditModalProps.headerText}
            submitButtonText={clientAddEditModalProps.submitButtonText}
            formType={clientAddEditModalProps.formType}
            editObjWeapon={editObjClient}
            //  handleChangeSubscription={handleChangeSubscription}
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            currentYear={currentYear}
          /> */}
          {/* <ConfirmationAlert
            showAdminModal={showAdminModal}
            closeConfirmationAlert={closeConfirmationAlert}
            confirm={confrim}
            confirmationText={"delete this Weapon"}
            headerText={"Delete?"}
          /> */}
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "calc(100vh - 320px)" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            rowModelType="infinite"
            onGridReady={onGridReady}
            components={components}
            cacheBlockSize={10}
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
})(withNamespaces()(AllUsers));
// export default Weapons
