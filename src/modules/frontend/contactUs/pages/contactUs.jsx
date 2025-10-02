import i18n from "../../../../i18n.js";
import React from "react";
import { useState } from "react";
import {
  loaderStateTrue,
  loaderStateFalse,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import Utility from "../../../../utility/utility";
import TextInput from "../../../../utility/components/TextInput";
import TextAreaInput from "../../../../utility/components/TextAreaInput";
import Dropdown from "../../../../utility/components/Dropdown";
import Button from "../../../../utility/components/Button";
import contact_ban from "../../../../utility/assets/images/contact_ban.jpg";
import contact_bp from "../../../../utility/assets/images/contact_bp.png";
import { withNamespaces } from "react-i18next";
import { P, HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive } from "../../../../utility/components/Typography.jsx";
const baseUrL = process.env.REACT_APP_BASE_URL;

const ContactUs = (props) => {
  const { loaderStateTrue, loaderStateFalse, t } = props;
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    mobile: "",
    email: "",
    message: "",
    module: "",
    agency: "",
  });

  const [formDataError, setFormDataError] = useState({
    name: "",
    lastname: "",
    mobile: "",
    email: "",
    message: "",
    module: "",
    agency: "",
  });

  // const { loaderStateFalse } = props;

  const validateForm = () => {
    let isValid = true;
    let formDataErrorTemp = Object.assign({}, formDataError);

    if (formData.lastname.trim() === "") {
      isValid = false;
      formDataErrorTemp.lastname = "Last Name is required";
    } else if (/^\s+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.lastname = "Cannot put blankspace";
    }
    if (formData.name.trim() === "") {
      isValid = false;
      formDataErrorTemp.name = "First Name is required";
    } 
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      isValid = false;
      formDataErrorTemp.name = "Name can only contain alphanumeric characters and spaces";
    }
    if (formData.mobile === "") {
      isValid = false;
      formDataErrorTemp.mobile = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      isValid = false;
      formDataErrorTemp.mobile = "Please provide valid Phone Number";
    }
    if (formData.email === "") {
      isValid = false;
      formDataErrorTemp.email = "Email is required";
    }
    if (formData.message === "") {
      isValid = false;
      formDataErrorTemp.message = "Message is required";
    }
    /*if (formData.module === "") {
      isValid = false;
      formDataErrorTemp.module = "Module is required";
    }*/
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
      if (value === "") {
        formDataErrorTemp.name = "First Name is required";
      }else if (/[^a-zA-Z0-9\s]/.test(value)) {
        formDataErrorTemp.name = "Name should not contain special characters";
      } else if (value.trim() === "") {
        formDataErrorTemp.name = "Cannot put blank space";
      } else {
        formDataErrorTemp.name = "";
      }
    }

    if (name === "lastname") {
      if (value === "") {
        formDataErrorTemp.lastname = "Last Name is required";
      } else if (value.trim() === "") {
        formDataErrorTemp.lastname = "Cannot put blank space";
      } else {
        formDataErrorTemp.lastname = "";
      }
    }

    if (name === "mobile") {
      if (value === "") {
        formDataErrorTemp.mobile = "Phone Number is required";
      } else if (!/^\d{10}$/.test(value)) {
        formDataErrorTemp.mobile = "Please provide valid Phone Number";
      } else {
        formDataErrorTemp.mobile = "";
      }
    }

    if (name === "email") {
      if (value === "") {
        formDataErrorTemp.email = "Email is required";
      } else if (!emailRegex.test(value)) {
        formDataErrorTemp.email = "Invalid email address";
      } else {
        formDataErrorTemp.email = "";
      }
    }
    if (name === "message") {
      if (value === "") {
        formDataErrorTemp.message = "Message is required";
      } else {
        formDataErrorTemp.message = "";
      }
    }
    if (name === "module") {
      if (value == "") {
        formDataErrorTemp.module = "Module is required";
      } else {
        formDataErrorTemp.module = "";
      }
    }
    setFormData(formDataTemp);
    setFormDataError(formDataErrorTemp);
  };

  const formatData = () => {
    let data = {};
    data["name"] = formData.name + " " + formData.lastname;
    // data["name"] = formData.name;
    data["mobile"] = formData.mobile;
    data["email"] = formData.email;
    data["message"] = formData.message;
    data["agency"] = formData.agency;
    data["interest"] = formData.module;
    return data;
  };
  //const formString = JSON.stringify(formatData)

  const handleSubmit = async () => {
    
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/contact-mail`,
          data: data,
        });
        setFormData({
          name: "",
          lastname: "",
          mobile: "",
          email: "",
          message: "",
          module: "",
          agency: "",
        });
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
    }
  };
  const staticModules = [
    {
      value: "Purchasing a System",
      label: "Purchasing a System",
    },
    // {
    //   value: "Example 02",
    //   label: "Example 02",
    // },
    // {
    //   value: "Example 03",
    //   label: "Example 03",
    // },
    // {
    //   value: "Example 04",
    //   label: "Example 04",
    // },
  ];

  const [selectedOption, setSelectedOption] = useState(formData.module);
  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    handleInputChange({
      target: { name: "module", value: selectedOption.value },
    });
  };
  const valueGetter = selectedOption.value
    ? selectedOption.value
    : formData.module;

  return (
    <>
      <section className="banner_main about_ban">
        <div className="inner_banner_img">
          <img src={contact_ban} alt="" />
        </div>
        <div className="banner_txt">
          <HeaderOne>{t("contactUsTitle")}</HeaderOne>
        </div>
      </section>

      <section className="contact_us">
        <div className="contact_back_pic">
          <img src={contact_bp} alt="" />
        </div>
        <div className="container">
          <div className="contact_inner">
            <div className="row justify-content-between">
              <div className="col-lg-4">
                <div className="contact_details">
                  <HeaderTwo variant="default-second">{t("contactUsQuestion")}</HeaderTwo>
                  <P>
                    {t("contactUsQuestionDesc")}
                  </P>
                  <div className="cnct_address">
                    <div className="cntct_box">
                      <div className="cnct_row">
                        <span className="fig">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <div className="cnct_dtls_inner">
                          <label>{t("contactUsCallUsNow")}</label>
                          <a href="tel:+972
                          544495423">+972
                          544495423</a>
                        </div>
                      </div>
                      <div className="cnct_row">
                        <span className="fig">
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <div className="cnct_dtls_inner">
                          <label>{t("contactUsEmail")}</label>
                          <a href="mailto:info@VRAS.com">VRASISR@Gmail.com</a>
                        </div>
                      </div>
                      {/* <div className="cnct_row">
                        <span className="fig">
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <div className="cnct_dtls_inner">
                          <label>{t("contactUsAddress")}</label>
                          <P variant="small-plus">12, down street london. 1234567</P>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact_form">
                  <HeaderThree>
                    Contact<span>With Us!</span>
                  </HeaderThree>
                  {/* <form> */}
                  <div className="cntct_form_holder">
                    <div className="row">
                      <div className="col-md-6">
                        <TextInput
                          type="text"
                          name="name"
                          label="First Name*"
                          labelType="lower"
                          value={formData.name}
                          onChange={handleInputChange}
                          error={formDataError.name}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextInput
                          type="text"
                          name="lastname"
                          label="Last Name*"
                          labelType="lower"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          error={formDataError.lastname}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextInput
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          label="Email*"
                          labelType="lower"
                          error={formDataError.email}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextInput
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          label="Phone Number*"
                          labelType="lower"
                          error={formDataError.mobile}
                        />
                      </div>
                      <div className="col-md-6">
                        {/* <label>Agency/Organization</label>
                        <input type="text" /> */}
                        <TextInput
                          type="text"
                          name="agency"
                          value={formData.agency}
                          onChange={handleInputChange}
                          label="Agency/Organization"
                          labelType="lower"
                          error={formDataError.agency}
                        />
                      </div>
                      <div className="col-md-6">
                        <label>I’m Interested in</label>
                        <Dropdown
                          // label="I’m Interested in:"
                          value={{ label: valueGetter }}
                          // selectedOption={setSelectedOption}
                          onChange={(setSelectedOption) => {
                            handleDropdownChange(setSelectedOption);
                          }}
                          options={staticModules.map((res) => ({
                            label: res.value,
                            value: res.value,
                          }))}
                          error={formDataError.module}
                          // handleDropdownChange={handleDropdownChange}
                        />
                      </div>
                      <div className="col-md-12 col-12">
                        {/* <label>Message</label>
                        <textarea
                          placeholder="Write Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          error={formDataError.message}
                        ></textarea> */}
                        <TextAreaInput
                          type="text"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          label="Message*"
                          error={formDataError.message}
                        />
                      </div>
                      <div className="col-md-12 col-12">
                        {/* <input
                          type="submit"
                          value="Submit"
                          className="frm_submit"
                        /> */}
                        <Button
                          // type="submit"
                          // value="Submit"
                          children={"Submit"}
                          className="frm_submit"
                          onClick={handleSubmit}
                        />
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
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
  withNamespaces()(ContactUs)
);
