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
import login_bp from "../../../../utility/assets/images/login_bp.png";
import login_ban from "../../../../utility/assets/images/login_ban.jpg";
import { toast, Bounce } from "react-toastify";

const baseUrL = process.env.REACT_APP_BASE_URL;

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: token,
  });

  const [formDataError, setFormDataError] = useState({
    password: "",
    confirmPassword: "",
  });

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
  const formatData = () => {
    let data = {};
    data["confirmPassword"] = formData.confirmPassword;
    data["password"] = formData.password;
    data["token"] = formData.token;
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { loaderStateTrue, loaderStateFalse } = props;
    if (validateForm()) {
      loaderStateTrue();
      try {
        const data = formatData();
        const response = await axios.post(`${baseUrL}/reset-password`, data);

        loaderStateFalse();
        navigate("/login");
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
        console.log(error, "error")
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

  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={login_ban} alt="" />
        </div>
        <div className="banner_txt">
          <h1>Welcome to our reset password Page</h1>
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
                <h2>Retrieve your account</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum dummy text of the printing
                  and typesetting industry
                </p>
                <form>
                <div className="login_input">
                  {/* <label>Username / e-mail</label>
                                    <input type="text" className="form-control" placeholder="Write your Username"/> */}
                 <TextInput
                        type="password"
                        name="password"
                       value={formData.password}
                       onChange={handleInputChange}
                         label="New Password:"
                         labelType="lower"
                         error={formDataError.password}
                       />
                </div>
                <div className="login_input">
                  {/* <label>Username / e-mail</label>
                                    <input type="text" className="form-control" placeholder="Write your Username"/> */}
                 <TextInput
                         type="password"
                        name="confirmPassword"
                         value={formData.confirmPassword}
                         onChange={handleInputChange}
                         label="Confirm Password:"
                         labelType="lower"
                         error={formDataError.confirmPassword}
                       />
                </div>
                {/* <div className="login_input">
                  
                 <TextInput
                        type="password"
                        name="password"
                       value={formData.password}
                       onChange={handleInputChange}
                         label="New Password:"
                         error={formDataError.password}
                       />
                </div> */}

                  <div className="login_form_row">
                    <div className="login_lost_password">
                      <Link to="/login">Go to login Page</Link>
                    </div>
                  </div>
                  <div className="login_submit">
                    {/* <input type="submit" value="Login" className="black_btn"/> */}
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="black_btn"
                    >
                      Submit
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
  return {};
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  ResetPassword
);
