import i18n from "../../../../i18n.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Utility from "../../../../utility/utility";
import { toast, Bounce } from "react-toastify";
import TextInput from "../../../../utility/components/TextInput";
import Button from "../../../../utility/components/Button";
import login_ban from "../../../../utility/assets/images/login_ban.jpg";
import login_bp from "../../../../utility/assets/images/login_bp.png";
import { withNamespaces } from "react-i18next";
import { P, HeaderOne } from "../../../../utility/components/Typography.jsx";
import { getExpiryDetails } from "../../../../utility/http.js";
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const Login = (props) => {
  const { loaderStateTrue, loaderStateFalse, loginSuccess, userData, t } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formDataError, setFormDataError] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    if (userData && Object.keys(userData).length > 0){
      redirectToDashboard(userData)
    }
  },[userData])
  const redirectToDashboard = (data) => {
    // const regex = /[^a-zA-Z]/g;
    // const formattedName = data.fullName.replace(regex, '').toLowerCase();
    let path = "";
    let queryParams = encodeObjectToUrl(data);
    const adminDashboardURL = `${protocolURL}admin.${frontendDomain}/#/${path}/${queryParams}`;
    const dashboardURL = `${protocolURL}${data?.client?.slug}.${frontendDomain}/#/${path}/${queryParams}`;
    const userDashboardURL = `${protocolURL}${data?.client?.slug}.${frontendDomain}/#/${path}/${queryParams}`;
    // return false;
    if (data?.role == "admin") {
      window.location.href = adminDashboardURL;
    }
    else if (data.role === "client") {
      window.location.href = dashboardURL;
    } else {
      window.location.href = userDashboardURL;
    }
  };
  const encodeObjectToUrl = (obj) => {
    // const queryString =  Object.keys(obj)
    //   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    //   .join('&');
    return btoa(JSON.stringify(obj));
  };
  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }
    // else if (!emailRegex.test(formData.email)) {
    //   isValid = false;
    //   formDataErrorTemp.email = "Invalid email address";
    // }

    if (formData.password === "") {
      isValid = false;
      formDataErrorTemp.password = "Password is required";
    }
    setFormDataError(formDataErrorTemp);
    return isValid;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = Object.assign({}, formData);
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formDataTemp[name] = value;
    if (name === "email") {
      if (value === "") {
        formDataErrorTemp.email = "Email is required";
      }
      // else if (!emailRegex.test(value)) {
      //   formDataErrorTemp.email = "Invalid email address";
      // }
      else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "password") {
      if (value === "") {
        formDataErrorTemp.password = "Password is required";
      } else {
        formDataErrorTemp.password = "";
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["username"] = formData.email;
    data["password"] = formData.password;
    return data;
  };
  //const formString = JSON.stringify(formatData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/login`,
          data: data,
        });
        let finalResponse = response?.data?.data || {}
        finalResponse["expiresIn"] = getExpiryDetails()
        // loginSuccess(response?.data?.data)
        // redirectToDashboard(response?.data?.data);
        loginSuccess(finalResponse)
        redirectToDashboard(finalResponse);
        // Utility.toastNotifications(
        //   response.data.message,
        //   "Success",
        //   "success"
        // );
        loaderStateFalse();
        // setTimeout(()=>{
        //   redirectToDashboard(response.data.data.role);
        // },3000)
      } catch (userResponse) {
        console.log("userResponse", userResponse);
        console.log(
          "error in post",
          userResponse.response.data.data.username.message
        );
        loaderStateFalse();
        toast(`${userResponse.response.data.data.username.message}`, {
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
    } else {
      console.log("else");
    }
  };

  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={login_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>{t("loginPageTitle")}</HeaderOne>
        </div>
      </section>

      <section className="login_sec">
        <div className="login_back_pic">
          <img src={login_bp} alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="login_form">
                <h2>{t("loginHeading")}</h2>
                <P>
                  {t("loginDescription")}
                </P>
                <form>
                  <div className="login_input">
                    {/* <label>Username / e-mail</label>
                                    <input type="text" className="form-control" placeholder="Write your Username"/> */}
                  <TextInput
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Username/Email:"
                    error={formDataError.email}
                    labelType="lower"
                  />
                </div>
                <div className="login_input">
                  {/* <label>Username</label>
                                    <input type="password" className="form-control" placeholder="Write your Password"/> */}
                  <TextInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    label="Password:"
                    labelType="lower"
                    error={formDataError.password}
                    // onKeyPress={(e) => {
                    //   if (e.key === "Enter") {
                    //     handleSubmit();
                    //   }
                    // }}
                  />
                </div>
                <div className="login_form_row">
                  {/* <div className="login_checkbox">
                                        <label className="checkbox_area">Remember me 
                                            <input type="checkbox"/>
                                            <span className="login_checkmark"></span>
                                        </label>
                                    </div> */}
                    <div className="login_lost_password">
                      <Link to="/forgotPassword">{t("forgotPasswordLink")}</Link>
                    </div>
                  </div>
                  <div className="login_submit">
                    {/* <input type="submit" value="Login" className="black_btn"/> */}
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="black_btn"
                    >
                      {t("loginButton")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(
  withNamespaces()(Login)
);
