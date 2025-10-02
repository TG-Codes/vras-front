import React, { useState } from "react";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Utility from "../../../../utility/utility";
import TextInput from "../../../../utility/components/TextInput";
import Button from "../../../../utility/components/Button";
import logo_black from "../../../../utility/assets/images/logo_black.png";
import x_twitter from "../../../../utility/assets/images/x_twitter.png";
import {toast, Bounce} from 'react-toastify';

const baseUrL = process.env.REACT_APP_BASE_URL;

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from URL parameters

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: token, // Include the token in the formData
  });

  const [formDataError, setFormDataError] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loaderStateFalse } = props;

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = { ...formDataError };
    if (formData.password === "") {
      isValid = false;
      formDataErrorTemp.password = "Password is required";
    } else if (formData.password.length < 8) {
      isValid = false;
      formDataErrorTemp.password = "Password must contain more than 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password = "Password must contain at least one capital letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password = "Password must contain at least one special character";
    } else if (!/[0-9]/.test(formData.password)) {
      isValid = false;
      formDataErrorTemp.password = "Password must contain at least one numeric value";
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let formDataTemp = { ...formData };
    let formDataErrorTemp = { ...formDataError };

    formDataTemp[name] = value;

    if (name === "password") {
      if (value === "") {
        formDataErrorTemp.password = "Password is required";
      } else if (!/[A-Z]/.test(value)) {
        formDataErrorTemp.password = "Password must contain at least one capital letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        formDataErrorTemp.password = "Password must contain at least one special character";
      } else if (!/[0-9]/.test(value)) {
        formDataErrorTemp.password = "Password must contain at least one numeric value";
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

  // const formatData = () => {
  //   return {
  //     confirmPassword: formData.confirmPassword,
  //     password: formData.password,
  //     token: formData.token,
  //   };
  // };

  const formatData = () => {
    let data = {};
    data["confirmPassword"] = formData.confirmPassword;
    data["password"] = formData.password;
    data["token"] = formData.token;
    return data;
  };

  const handleSubmit = async () => {
    const { loaderStateTrue, loaderStateFalse } = props;
    if (validateForm()) {
      loaderStateTrue();
      try {
        const data = formatData();
        const response = await axios.post(
          `${baseUrL}/admin/reset-password`,
          data
        );
        loaderStateFalse();
        // localStorage.setItem("login", true);
        toast(`Password reset successfully`, {
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
        navigate("/admin/login");
      } catch (error) {
        console.log("Error in post", error.response.data.data);
        loaderStateFalse();
        toast(`${error.response.data.data.email.message}`, {
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
      <body className="login-page">
        <div className="login-box">
        <div className="login-box-inner">
          <div className="login-logo">
            <a href="../../index2.html">
            <img src={logo_black} alt="" />
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Reset Your Password</p>
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
              <div className="input-group mb-3">
                <TextInput
                  type="text"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder=""
                  label="Confirm Password:"
                  error={formDataError.confirmPassword}
                />
              </div>
              <div className="row">
                <div className="input-group mb-3">
                  <Button
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <p className="fg_pass">
                <Link to="/admin/login">Go to login Page</Link>
              </p>
            </div>
          </div>
        </div>
        </div>

        <script src="../../plugins/jquery/jquery.min.js"></script>

        <script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="../../dist/js/adminlte.min.js?v=3.2.0"></script>
      </body>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {};
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  ResetPassword
);
