import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import logo_black from "../../../../utility/assets/images/logo_black.png";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Utility from "../../../../utility/utility";
import TextInput from "../../../../utility/components/TextInput";
import Button from "../../../../utility/components/Button";
import { toast, Bounce } from "react-toastify";
import x_twitter from "../../../../utility/assets/images/x_twitter.png";

const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;

const Login = (props) => {
  const {userData} = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: "",
    password: "",
  });

  // const { loaderStateFalse } = props;
  useEffect(()=>{
    if (userData && Object.keys(userData).length > 0){
      redirectToDashboard(userData)
    }
  },[])
  const redirectToDashboard = (data) => {
    let path = "";
    let queryParams = encodeObjectToUrl(data);
    const dashboardURL = `${protocolURL}admin.${frontendDomain}/#/${path}/${queryParams}`;
    // return false;
    window.location.href = dashboardURL;
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
        // } else if (!emailRegex.test(value)) {
        //   formDataErrorTemp.email = "Invalid email address";
        } else {
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

  const handleSubmit = async () => {
    const { loaderStateTrue, loaderStateFalse, loginSuccess, userData } = props;
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/admin/login`,
          data: data,
        });
        loginSuccess(response.data.data)
        redirectToDashboard(response.data.data);
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
        console.log(
          "error in post",
          
        );
        if (userResponse.response.status == 422) {
          let resData = userResponse.response.data;
          if (resData.success === false) {
            let formDataErrorTemp = { ...formDataError };
            let responseData = resData.data;
            formDataErrorTemp.email = resData.data.username.message;
            formDataErrorTemp.password = resData.data.username.message;
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
      <div className="login-page">
        <div className="login-box">
          <div className="login-box-inner">
          <div className="login-logo">
            <a href="../../index2.html">
            <img src={logo_black} alt="" />
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg"><b>Welcome,</b><span>Sign in to continue!</span></p>
              <div className="input-group mb-3">
                <TextInput
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="UserName/Email:"
                  placeholder=""
                  error={formDataError.email}
                />
              </div>
              <div className="input-group mb-3">
                <TextInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  label="Password:"
                  placeholder=""
                  error={formDataError.password}
                />
              </div>
              <div className="row">
                <div className="input-group mb-3">
                  <Button
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </div>
              </div>
              <p className="fg_pass">
                <Link to="/admin/forgotPassword">forgot password ?</Link>
              </p>
            </div>
          </div>
        </div>

        <script src="../../plugins/jquery/jquery.min.js"></script>

        <script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="../../dist/js/adminlte.min.js?v=3.2.0"></script>
      </div>
      </div>
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
})(Login);
