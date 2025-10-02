import i18n from "../../../i18n.js";
import React, { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import logo_white from "../../../utility/assets/images/logo_white.png";
import { connect } from "react-redux";
import { loaderStateFalse, loaderStateTrue } from "../../../actions/allActions";
import { Link } from "react-router-dom";
import Button from "../Button";
import axios from "axios";
import Utility from "../../utility";
import TextInput from "../TextInput";
import { P, HeaderOne, HeaderTwo, HeaderThree, HeaderFour, HeaderFive, HeaderSix } from "../Typography";
import { withNamespaces } from "react-i18next";
const baseUrL = process.env.REACT_APP_BASE_URL;
const Footer = (props) => {
  const { loaderStateTrue, loaderStateFalse, t } = props;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(()=>{
    fetchLinkedinData()
    fetchYoutubeData()
  }, [])
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
      } else if (!emailRegex.test(value)) {
        formDataErrorTemp.email = "Invalid email address";
      } else {
        formDataErrorTemp.email = "";
      }
    }
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
    
    if (validateForm()) {
      loaderStateTrue();
      try {
        let data = formatData();
        const response = await axios({
          method: "post",
          url: `${baseUrL}/newsletter-subscribe`,
          data: data,
        });
        setFormData({
          email: "",
          // password: "",
        });
        loaderStateFalse();
        // navigate("/login");
        localStorage.setItem("login", true);
        if (response?.data?.success) {
          toast(
            `Subscription confirmed! We'll keep you updated on the latest news.`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
        }
      } catch (res) {
        if (res?.response?.status === 422) {
          if (res.response?.data?.data?.email?.rule == "unique")
            toast(`Dont worry! you are already subscribed.`, {
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
        } else {
          // Utility.toastNotifications(
          //   "Sorry! Something went wrong.",
          //   "Error",
          //   "error"
          // );
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
        loaderStateFalse();
      }
    }
  };
  const [linkedinData, setLinkedinData]= useState([])
  const [youtubeData, setYoutubeData]= useState([])
  const fetchLinkedinData = async ()=>{
    try{
      const response = await axios.get(`${baseUrL}/site-settings/linkedin`)
      setLinkedinData(response.data.data)
    } catch(error){
      console.log(error)
    }
  }
  const fetchYoutubeData = async ()=>{
    try{
      const response = await axios.get(`${baseUrL}/site-settings/youtube`)
      setYoutubeData(response.data.data)
    } catch(error){
      console.log(error)
    }
  }
  const linkedinLink = ()=>{
    window.open(linkedinData.value)
  }
  const youtubeLink = ()=>{
    window.open(youtubeData.value)
  }
  return (
    <>
      <footer className="footer_outer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="footer_logo">
                  <Link to="#">
                    <img src={logo_white} alt="" />
                  </Link>
                </div>
                <div className="footer_content">
                  <P>
                    {t("footerDesc")}
                  </P>
                </div>
                <div className="footer_social">
                  <P>{t("footerSocial")}</P>
                  <ul>
                    <li>
                      <Link to="#" role="button" onClick={linkedinLink}>
                        <i className="fa-brands fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" role="button" onClick={youtubeLink}>
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="ftr_list">
                  <div className="ftr_hdng">
                    <HeaderSix variant="default-second">{t("footerOffice")}</HeaderSix>
                  </div>
                  <div className="footer_address">
                    <ul>
                      {/* <li>
                        <span>
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <P>12, down street london. 1234567</P>
                      </li> */}
                      <li>
                        <span>
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <Link to="mailto:VRASISR@Gmail.com">VRASISR@Gmail.com</Link>
                      </li>
                      <li>
                        <span>
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <Link to="tel:+ 972
                        544495423">+972
                        544495423</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3">
                <div className="ftr_list">
                  <div className="ftr_hdng">
                    <HeaderSix variant="default-second">{t("footerLink")}</HeaderSix>
                  </div>
                  <ul>
                    <li>
                      <Link to="/" onClick={scrollToTop}>
                        {t("headerHomeLink")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/aboutUs" onClick={scrollToTop}>
                        {t("headerAboutUsLink")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/ourTeam" onClick={scrollToTop}>
                        {t("headerOurTeamLink")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/latestnews" onClick={scrollToTop}>
                        {t("headerNewsLink")}
                      </Link>
                    </li>
                    <li>
                      <Link to="/contactUs" onClick={scrollToTop}>
                        {t("headerContactUsLink")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-5">
                <div className="ftr_list">
                  <div className="ftr_hdng">
                    <HeaderSix variant="default-second">{t("footerNewsLetter")}</HeaderSix>
                  </div>
                  <div className="ftr_news_form">
                    <TextInput
                      type="text"
                      name="email"
                      placeholder="Enter email address"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={formDataError.email}
                    />
                    <Button
                      children={t("submitButton")}
                      className="frm_submit"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ftr_btm">
          <div className="container">
            <div className="copyright">
              <p>VRAS® 2024 All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {};
};
export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(
  withNamespaces()(Footer)
);
