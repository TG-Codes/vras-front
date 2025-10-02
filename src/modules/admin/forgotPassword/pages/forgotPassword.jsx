import React, { useState } from "react";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Utility from "../../../../utility/utility";
import logo_black from "../../../../utility/assets/images/logo_black.png";
import TextInput from "../../../../utility/components/TextInput";
import Button from "../../../../utility/components/Button";
import { toast, Bounce } from "react-toastify";
import x_twitter from "../../../../utility/assets/images/x_twitter.png";

const baseUrL = process.env.REACT_APP_BASE_URL;

const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    // password: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: "",
    // password: "",
  });

  const { loaderStateFalse } = props;

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      isValid = false;
      formDataErrorTemp.email = "Invalid email address";
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
        }
        else if (!emailRegex.test(value)) {
          formDataErrorTemp.email = "Invalid email address";
        } else {
        formDataErrorTemp.email = "";
      }
    }
    // if (name === "password") {
    //   if (value === "") {
    //     formDataErrorTemp.password = "Password is required";
    //   } else {
    //     formDataErrorTemp.password = "";
    //   }
    // }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["email"] = formData.email;
    // data["password"] = formData.password;
    return data;
  };
  //const formString = JSON.stringify(formatData)

  const handleSubmit = async () => {
    const { loaderStateTrue, loaderStateFalse } = props;
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/admin/forgot-password`,
          data: data,
        });
        setFormData({
          email: "",
          // password: "",
        });
        loaderStateFalse();
        // navigate("/admin/login");
        // localStorage.setItem("login", true);
      } catch (userResponse) {
        console.log(
          "error in post",
          userResponse.response.data.data.email.message
        );
        loaderStateFalse();
        if (userResponse.response.status == 422) {
          let resData = userResponse.response.data;
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
        toast(`${userResponse.response.data.data.email.message}`, {
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
     
      <body className="login-page" >
        <div className="login-box">
         <div className="login-box-inner">
          <div className="login-logo">
            <a href="../../index2.html">
              <img src={logo_black} alt="" />
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Submit your valid e-mail address</p>
              <div className="input-group mb-3">
                <TextInput
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email:"
                  placeholder=""
                  error={formDataError.email}
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
  ForgotPassword
);
