import i18n from "../../../i18n.js";
import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Utility from "../../utility";
import { setCurrentPosition, toggleSidebar } from "../../../actions/allActions";
import {
  loginSuccess,
  logoutSuccess,
  loaderStateTrue,
  loaderStateFalse,
} from "../../../actions/allActions";
import { toast, Bounce } from "react-toastify";
import img from "../../assets/images/jadon-kelly-Qo_2hhoqC3k-unsplash.jpg";
import signoutimg from "../../assets/images/sign_out_alt_solid.svg";
import gear from "../../assets/images/gear-solid.svg";
import ChangePassword from "./ChangePassword";
import ConfirmationAlert from "../ConfirmationAlert";
import UserProfileModal from "../user/UserProfileModal";
import { withNamespaces } from "react-i18next";
import Select from "react-select";
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;

const Header = ({
  toggleSidebar,
  activeSidebar,
  loginSuccess,
  userData,
  loaderStateFalse,
  loaderStateTrue,
  t,
}) => {
  const text = userData?.fullName
  const authToken = userData.token;
  const options = [
    { value: "en", label: "EN" },
    { value: "he", label: "HEB" },
  ];
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    options.find((lang) => lang.value === i18n.language)
  );
  const handleChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    i18n.changeLanguage(selectedOption.value); // Change language in i18next
    window.location.reload();
  };
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const [roleExpanded, setRoleExpanded] = useState(false);
  const handleRoleToggle = () => {
    setRoleExpanded(!roleExpanded);
  };
  const dropdownRef = useRef(null);
  const roleDropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expanded &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setExpanded(!expanded);
      }
    };
    const handleRoleClickOutside = (event) => {
      if (
        roleExpanded &&
        roleDropDownRef.current &&
        !roleDropDownRef.current.contains(event.target)
      ) {
        setRoleExpanded(!roleExpanded);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleRoleClickOutside);

    return () => {
      document.removeEventListener("mousemove", handleClickOutside);
      document.removeEventListener("mousemove", handleRoleClickOutside);
    };
  }, [expanded, roleExpanded]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    if (userData && userData.role != "admin") {
      fetchData();
    }
    if (text && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = 100;
      canvas.height = 100;

      // Add background color
      context.fillStyle = "#ccc";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      context.font = "bold 60px Arial";
      context.fillStyle = "#000";
      context.textAlign = "center";
      context.textBaseline = "middle";

      // Draw the first letter of the text on the canvas
      const firstLetter = text.charAt(0).toUpperCase();
      context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

      // Convert canvas to image and set it to state
      const image = canvas.toDataURL();
      setImageSrc(image);
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/profile`, {
        headers: {
          Authorization: authToken,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleLogout = () => {
  //   // logoutSuccess(userData);
  //   loginSuccess({});
  //   // alert("check");
  //   toast(`🦄 Ypu've logged out successfully`, {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //     });
  //   const loginURL = `${protocolURL}${frontendDomain}/#/login`;
  //   const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login`;
  //   if (userData.role === "admin") {
  //     window.location.href = adminLoginURL;
  //   } else {
  //     window.location.href = loginURL;
  //   }
  // };
  const handleLogout = async () => {
    let url;
    if (userData.role === "admin") {
      url = `${baseUrL}/admin/logout`;
    } else if (userData.role === "client" || userData.role === "instructor" || userData.role === "user") {
      url = `${baseUrL}/logout`;
    }
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: authToken,
        },
      });
      loginSuccess({});
      localStorage.clear();
      toast(`You've logged out successfully`, {
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
      const loginURL = `${protocolURL}${frontendDomain}/#/testloader?userlogout=true`;
      const adminLoginURL = `${protocolURL}${frontendDomain}/#/testloader?adminlogout=true`;
      if (userData.role === "admin") {
        window.location.href = adminLoginURL;
      } else {
        window.location.href = loginURL;
      }
    } catch (error) {
      console.error("Error logging out:", error);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 422) {
          // if (error.response.status === 404) {
          loginSuccess({});
          const loginURL = `${protocolURL}${frontendDomain}/#/login?userlogout=true`;
          const adminLoginURL = `${protocolURL}${frontendDomain}/#/admin/login?adminlogout=true`;
          if (userData.role === "admin") {
            window.location.href = adminLoginURL;
          } else {
            window.location.href = loginURL;
          }
        }
      }
    }
  };
  const handleLogoutModal = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("logout", "false");

    // Construct the URL with query params before the hash
    const newUrl = `${currentUrl.search}`;

    // Use history.pushState to update the URL without reloading the page
    window.history.pushState({}, "", newUrl);

    // Navigate to the desired route
    // navigate('/dashboard');
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      password: "",
      currentPassword: "",
      confirmPassword: "",
    });
    setFormDataError({
      password: "",
      currentPassword: "",
      confirmPassword: "",
    });
  };
  const [showAdminModal, setShowAdminModal] = useState(false);
  // const closeConfirmationAlert = () => {
  //   setShowAdminModal(false);
  // };
  const closeConfirmationAlert = () => {
    // Remove the 'logout' query parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("logout");

    // Construct the URL without the 'logout' parameter
    const newUrl = `${currentUrl.origin}${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;

    // Use history.replaceState to update the URL without reloading the page
    window.history.replaceState({}, "", newUrl);

    // Close the modal
    setShowAdminModal(false);
  };
  // const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwNDI0NDU0fQ.u7RQNkcBW2mYp64zH2Qt60HmoNFYzohvg4Dl5AuKMJ8`;

  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataError, setFormDataError] = useState({
    // email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  // const { loaderStateFalse } = props;

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (formData.email === "") {
    //   isValid = false;
    //   formDataErrorTemp.email = "Email is required";
    // }
    // if (formData.password === "") {
    //   isValid = false;
    //   formDataErrorTemp.password = "Password is required";
    // }
    if (formData.currentPassword === "") {
      isValid = false;
      formDataErrorTemp.currentPassword = "Current Password is required";
    }
    if (formData.password === "") {
      isValid = false;
      formDataErrorTemp.password = "Password is required";
    } else if (formData.password.length < 8) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain more than 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one capital letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one special character";
    } else if (!/[0-9]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password =
        "Password must contain at least one numeric value";
    } else {
      formDataErrorTemp.password = "";
    }

    if (formData.confirmPassword === "") {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      isValid = false;
      formDataErrorTemp.confirmPassword = "Passwords do not match";
    } else {
      formDataErrorTemp.confirmPassword = "";
    }
    setFormDataError(formDataErrorTemp);
    return isValid;
  };
  const dispatch = useDispatch();

  const handleRoleSwitch = (role, path) => {
    dispatch(setCurrentPosition(role));
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formDataTemp[name] = value;
    // if (name === "email") {
    //   if (value === "") {
    //     formDataErrorTemp.email = "Email is required";
    //     // } else if (!emailRegex.test(value)) {
    //     //   formDataErrorTemp.email = "Invalid email address";
    //     // } else {
    //     formDataErrorTemp.email = "";
    //   }
    // }
    // if (name === "password") {
    //   if (value === "") {
    //     formDataErrorTemp.password = "Password is required";
    //   } else {
    //     formDataErrorTemp.password = "";
    //   }
    // }
    if (name === "currentPassword") {
      if (value === "") {
        formDataErrorTemp.currentPassword = "currentPassword is required";
      } else {
        formDataErrorTemp.currentPassword = "";
      }
    }
    if (name === "password") {
      if (value === "") {
        formDataErrorTemp.password = "Password is required";
      } else if (!/[A-Z]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one capital letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one special character";
      } else if (!/[0-9]/.test(value)) {
        formDataErrorTemp.password =
          "Password must contain at least one numeric value";
      } else {
        formDataErrorTemp.password = "";
        // Check if confirmPassword is filled and validate matching passwords
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        } else {
          formDataErrorTemp.confirmPassword = "";
        }
      }
    }

    if (name === "confirmPassword") {
      if (value === "") {
        formDataErrorTemp.confirmPassword = "Confirm Password is required";
      } else {
        formDataErrorTemp.confirmPassword = "";
        // Check if password is filled and validate matching passwords
        if (formData.password && formData.password !== value) {
          formDataErrorTemp.confirmPassword = "Passwords do not match";
        }
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    // data["email"] = formData.email;
    data["password"] = formData.password;
    data["currentPassword"] = formData.currentPassword;
    data["confirmPassword"] = formData.confirmPassword;
    return data;
  };

  const handleSubmit = async () => {
    // const { loaderStateTrue, loaderStateFalse } = props;
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        let url;
        if (userData.role === "admin") {
          url = `${baseUrL}/admin/change-password`;
        } else  {
          url = `${baseUrL}/change-password`;
        }
        const response = await axios.post(url, data, {
          headers: {
            Authorization: authToken,
          },
        });
        setFormData({
          password: "",
          currentPassword: "",
          confirmPassword: "",
        });
        loaderStateFalse();
        // setShowModal(false)
        closeModal();
        toast(`Password changed successfully`, {
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
    }
  };

  return (
    <>
      <div className="header_dashboard">
        <div className="side_trigger">
          <Link
            to="#"
            data-widget="pushmenu"
            role="button"
            onClick={() => {
              toggleSidebar(!activeSidebar);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Link>
        </div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
              onClick={handleLogout}
            >
              <i className="fas fa-th-large"></i>
            </Link>
            </div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item d-none d-sm-inline-block">
            <div className="nav-link">Your Login code is {userData.code}</div>
            </li> */}
            <li
              className={
                roleExpanded ? "nav-item dropdown show" : "nav-item dropdown"
              }
              ref={roleDropDownRef}
            >
              <button
                className="nav-link"
                data-toggle="dropdown"
                aria-expanded={roleExpanded ? "true" : "false"}
                onClick={handleRoleToggle}
              >
                <em>
                  {/* <img
                    src={img}
                    alt="User Avatar"
                  // className="img-size-50 mr-3 img-circle"
                  /> */}
                  {/* Hidden Canvas */}
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                  {/* Display Image */}
                  {imageSrc && <img src={imageSrc} alt="First Letter" />}
                </em>
              </button>
              {userData && userData.role === "client" ? (
                <div
                  className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${roleExpanded ? "show" : ""
                    }`}
                  style={{ left: "inherit", right: "0px" }}
                >
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('client', '/dashboard');
                          }}
                          to="/dashboard"
                        >
                          Client
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('instructor', '/instructor/dashboard');
                          }}
                          to="/instructor/dashboard"
                        >
                          Instructor
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('user', '/user/dashboard');
                          }}
                          to="/user/dashboard"
                        >
                          User
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                </div>
              ) : userData.role === "instructor" ? (
                <div
                  className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${roleExpanded ? "show" : ""
                    }`}
                  style={{ left: "inherit", right: "0px" }}
                >
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('instructor', '/instructor/dashboard');
                          }}
                          to="/instructor/dashboard"
                        >
                          Instructor
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('user', '/user/dashboard');
                          }}
                          to="/user/dashboard"
                        >
                          User
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                </div>
              ) : userData?.role !== "admin" ? (
                <div
                  className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${roleExpanded ? "show" : ""
                    }`}
                  style={{ left: "inherit", right: "0px" }}
                >
                  <div className="dropdown-item">
                    <div className="media">
                      <div className="media-body">
                        <Link
                          className="dropdown-item-title"
                          role="button"
                          onClick={() => {
                            setRoleExpanded(!roleExpanded);
                            handleRoleSwitch('user', '/user/dashboard');
                          }}
                          to="/user/dashboard"
                        >
                          User
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                </div>
              ) : (
                <></>
              )}
            </li>
            <li
              className={
                expanded ? "nav-item dropdown show" : "nav-item dropdown"
              }
              ref={dropdownRef}
            >
              <button
                className="nav-link"
                data-toggle="dropdown"
                aria-expanded={expanded ? "true" : "false"}
                onClick={handleToggle}
              >
                {/* <span className="user_nm">{t("adminHeaderHello")} {userData.name}</span> */}
                <em>
                  {/* <img
                    src={gear}
                    alt="User Avatar"
                    // className="img-size-50 mr-3 img-circle"
                  /> */}
                  <i className="fa-solid fa-gear"></i>
                </em>
              </button>
              <div
                className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${expanded ? "show" : ""
                  }`}
                style={{ left: "inherit", right: "0px" }}
              >
                {userData && userData.role !== "admin" ? (
                  <>
                    <span className="dropdown-item dropdown-header">
                      Your Login code is <b>{userData.code}</b>
                    </span>

                    {/* <div className="dropdown-item">
                      <div className="media">
                        <div className="media-body">
                          <Link
                            className="dropdown-item-title"
                            role="button"
                            onClick={() => setExpanded(!expanded)}
                            to="/profile"
                          >
                            Profile
                          </Link>
                        </div>
                      </div>
                    </div> */}
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item">
                      <div className="media">
                        <div className="media-body">
                          <Link
                            role="button"
                            className="dropdown-item-title"
                            onClick={() => setShowModal(true)}
                          >
                            {t("adminHeaderChangepassword")}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    {/* <div className="dropdown-item">
                      <div className="media">
                        <div className="media-body">
                          <Link
                            className="dropdown-item-title"
                            role="button"
                            onClick={() => {
                              setShowAdminModal(true);
                              handleLogoutModal();
                            }}
                          >
                            {t("logOut")}
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </>
                ) : (
                  <>
                    <div className="dropdown-item">
                      <div className="media">
                        <div className="media-body">
                          <Link
                            role="button"
                            className="dropdown-item-title"
                            onClick={() => setShowModal(true)}
                          >
                            {t("adminHeaderChangepassword")}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    {/* <div className="dropdown-item">
                      <div className="media">
                        <div className="media-body">
                          <Link
                            className="dropdown-item-title"
                            role="button"
                            onClick={() => setShowAdminModal(true)}
                          >
                            {t("logOut")}
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </li>
            <li className={"nav-item dropdown"}>
              <button
                className="nav-link"
                data-toggle="dropdown"
                onClick={() => setShowAdminModal(true)}
              // aria-expanded={expanded ? "true" : "false"}
              >
                <em>
                  {/* <img
                    src={signoutimg}
                    alt="User Avatar"
                    // className="img-size-50 mr-3 img-circle"
                  /> */}
                  {/* <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" /> */}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </em>
              </button>
            </li>
            {/* {userData?.role == 'admin' && 
            <li className="language_dropDown">
              <Select
                options={options}
                value={selectedLanguage}
                onChange={handleChange}
                placeholder={"EN"}
              />
            </li>} */}
          </ul>
        </nav>
      </div>

      <UserProfileModal
        showModal={showProfileModal}
        closeModal={closeProfileModal}
        headerText={"Profile"}
        submitButtonText={"Update"}
        formData={data}
      />
      <ChangePassword
        formData={formData}
        formDataError={formDataError}
        showModal={showModal}
        closeModal={closeModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirmationText={"Log Out?"}
        headerText={"Log Out"}
        confirm={handleLogout}
      />
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {
    activeSidebar: globalState.mainReducerData.activeSidebar,
    userData: globalState.mainReducerData.userData,
    accessibleUsers: globalState.mainReducerData.accessibleUsers
  };
};

export default connect(mapStateToProps, {
  toggleSidebar,
  loginSuccess,
  logoutSuccess,
  loaderStateTrue,
  loaderStateFalse,
})(withNamespaces()(Header));