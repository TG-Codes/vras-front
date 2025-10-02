import i18n from "../../../../i18n.js";
import React, { useState } from "react";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Utility from "../../../../utility/utility";
import TextInput from "../../../../utility/components/TextInput";
import Button from "../../../../utility/components/Button";
import login_ban from "../../../../utility/assets/images/login_ban.jpg";
import login_bp from "../../../../utility/assets/images/login_bp.png";
import { withNamespaces } from "react-i18next";
import { P, HeaderOne } from "../../../../utility/components/Typography.jsx";

const baseUrL = process.env.REACT_APP_BASE_URL;
const ForgotPassword = (props) => {
  const { loaderStateTrue, loaderStateFalse, t } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: "",
  });

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
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
        // } else {
        formDataErrorTemp.email = "";
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["email"] = formData.email;
    return data;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/forgot-password`,
          data: data,
        });
        setFormData({
          email: "",
        });
        loaderStateFalse();
        // navigate("/login");
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
      } catch (userResponse) {
        console.log(
          "error in post",
          userResponse.response.data.data.email.message
        );
        loaderStateFalse();
        // Utility.toastNotifications(
        //   userResponse.response.data.data.email.message,
        //   "Error",
        //   "error"
        // );
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
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={login_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>{t("forgotPasswordTitle")}</HeaderOne>
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
                <h2>{t("forgotpasswordHeading")}</h2>
                <P>
                 {t("forgotPasswordDesc")}
                </P>
                {/* <form> */}
                <div className="login_input">
                  {/* <label>Username / e-mail</label>
                                    <input type="text" className="form-control" placeholder="Write your Username"/> */}
                 <TextInput
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      label="Email:"
                      error={formDataError.email}
                      labelType="lower"
                    />
                </div>

                <div className="login_form_row">
                  <div className="login_lost_password">
                    <Link to="/login">{t("loginLink")}</Link>
                  </div>
                </div>
                <div className="login_submit">
                  {/* <input type="submit" value="Login" className="black_btn"/> */}
                  <Button onClick={handleSubmit} className="black_btn">
                    {t("submitButton")}
                  </Button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {};
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  withNamespaces()(ForgotPassword)
);
