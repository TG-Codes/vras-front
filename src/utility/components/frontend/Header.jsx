import i18n from "../../../i18n.js";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import logo_white from "../../assets/images/logo_white.png";
import { Link, useLocation } from "react-router-dom";
import Utility from "../../utility";
import Button from "../../../utility/components/Button";
import { withNamespaces } from "react-i18next";
import Select from "react-select";
import {
  increaseFontSize,
  decreaseFontSize,
  setFontSize,
} from "../../../actions/allActions.js";
const baseUrL = process.env.REACT_APP_BASE_URL

const Header = (props) => {
  const { t, increaseFontSize, decreaseFontSize, setFontSize, fontSize, themeDisable, themeEnable } =
    props;
  const handleIncreaseFontSize = () => {
    if (fontSize < 8) {
      increaseFontSize();
    }
  };

  const handleDecreaseFontSize = () => {
    if (fontSize > -8) {
      decreaseFontSize();
    }
  };
  const resetFontSize = () => {
    setFontSize();
    window.location.reload();
  };
  const options = [
    { value: "en", label: "EN" },
    { value: "he", label: "HEB" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    return storedLanguage
      ? JSON.parse(storedLanguage)
      : { value: "en", label: "EN" };
  });

  useEffect(() => {
    console.log("useEffectCheck");
    i18n.changeLanguage(selectedLanguage.value);
  }, [selectedLanguage]);

  // useEffect(() => {
  //   const fetchPricingSettings = async () => {
  //     try {
  //       const response = await fetch("http://144.126.254.60:5000/api/site-settings/pricing")
  //       const data = await response.json()
  //       if (data.success && data.data.value == true) {
  //         setShowPricing(true)
  //       } else {
  //         setShowPricing(false)
  //       }
  //     } catch (error) {
  //       console.log("Pricing fetching error", error);
  //       showPricing(false)
  //     }
  //   }
  //   fetchPricingSettings()
  // }, [])
  const [showPricing, setShowPricing] = useState(false);
  useEffect(() => {
    const fetchPricingSettings = async () => {
      try {
        const response = await fetch(`${baseUrL}/site-settings/pricing-admin-setting`)
        const data = await response.json()
        if (data.success && data.data.value === '1') {
          setShowPricing(true)
        } else {
          setShowPricing(false)
        }
      } catch (error) {
        console.log("Pricing fetching error", error);
        setShowPricing(false)
      }
    }
    fetchPricingSettings()
  }, [])
  
  const handleChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedLanguage(selectedOption);
    localStorage.setItem("selectedLanguage", JSON.stringify(selectedOption));
    i18n.changeLanguage(selectedOption.value);
    window.location.reload();
  };
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const location = useLocation();
  useEffect(() => {
    // Close all notifications when route changes
    Utility.closeAllNotifications();
    setActiveLink(location.pathname);
  }, [location.pathname]);
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <header className="header_wrapper">
        <div className="container hdr_container">
          <Link className="navbar-brand logo" to="/">
            <img src={logo_white} alt="" />
          </Link>
          <nav className="navbar navbar-expand-lg nav_menu">
            <Button
              className={`${expanded ? "navbar-toggler" : "navbar-toggler collapsed"
                }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navHeader"
              aria-controls="navHeader"
              aria-expanded={`${expanded ? "true" : "false"}`}
              aria-label="Toggle navigation"
              onClick={handleToggle}
            >
              <i className="fa-solid fa-bars"></i>
            </Button>
            <div
              className={`${expanded
                  ? "collapse navbar-collapse show"
                  : "collapse navbar-collapse"
                }`}
              id="navHeader"
            >
              <ul className="navbar-nav navbar-left">
                <li
                  className={
                    activeLink === "/" ? "nav-item active" : "nav-item"
                  }
                  onClick={() => handleLinkClick("/")}
                >
                  <Link className={`nav-link ${i18n.language=="he"? "":""}`}to="/" onClick={handleToggle}>
                    {t("headerHomeLink")}
                  </Link>
                </li>
                <li
                  className={
                    activeLink === "/aboutUs" ? "nav-item active" : "nav-item"
                  }
                  onClick={() => handleLinkClick("/aboutUs")}
                >
                  <Link
                    className="nav-link"
                    to="/aboutUs"
                    onClick={handleToggle}
                  >
                    {t("headerAboutUsLink")}
                  </Link>
                </li>
                <li
                  className={
                    activeLink === "/ourTeam" ? "nav-item active" : "nav-item"
                  }
                  onClick={() => handleLinkClick("/ourTeam")}
                >
                  <Link
                    className="nav-link"
                    to="/ourTeam"
                    onClick={handleToggle}
                  >
                    {t("headerOurTeamLink")}
                  </Link>
                </li>
                <li
                  className={
                    activeLink === "/latestnews"
                      ? "nav-item active"
                      : "nav-item"
                  }
                  onClick={() => handleLinkClick("/latestnews")}
                >
                  <Link
                    className="nav-link"
                    to="/latestnews"
                    onClick={handleToggle}
                  >
                    {t("headerNewsLink")}
                  </Link>
                </li>
                {/* <li
                  className={
                    activeLink === "/subscriptions"
                      ? "nav-item active"
                      : "nav-item"
                  }
                  onClick={() => handleLinkClick("/subscriptions")}
                >
                  <Link
                    className="nav-link"
                    to="/subscriptions"
                    onClick={handleToggle}
                  >
                    {t("headerPricingLink")}
                  </Link>
                </li> */}
                {showPricing && (
                  <li className={activeLink === "/subscriptions" ? "nav-item active" : "nav-item"} onClick={() => handleLinkClick("/subscriptions")}>
                    <Link className="nav-link" to="/subscriptions" onClick={handleToggle}>
                      {t("headerPricingLink")}
                    </Link>
                  </li>
                )}
                <li
                  className={
                    activeLink === "/contactUs" ? "nav-item active" : "nav-item"
                  }
                  onClick={() => handleLinkClick("/contactUs")}
                >
                  <Link
                    className="nav-link"
                    to="/contactUs"
                    onClick={handleToggle}
                  >
                    {t("headerContactUsLink")}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="header_log_in">
            <ul>
              <li>
                <Link to="/login">
                  <span>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  </span>
                  {t("headerLoginLink")}
                </Link>
              </li>
              <li className="language_dropDown">
                <Select
                  options={options}
                  value={selectedLanguage}
                  onChange={handleChange}
                  placeholder={"EN"}
                />
              </li>
              {/* <li>
                <div className="accessibility">
                  <em>
                    <i className="fa-solid fa-universal-access"></i>
                  </em>
                  <div className="accessibility_dropdown">
                    <ul>
                      <li>
                        <Button onClick={handleIncreaseFontSize}><i className="fa-solid fa-magnifying-glass-plus"></i><span>Increase Text</span></Button>
                      </li>
                      <li>
                        <Button onClick={handleDecreaseFontSize}><i className="fa-solid fa-magnifying-glass-minus"></i><span>Decrease Text</span></Button>
                      </li>
                      <li>
                        <Button onClick={themeEnable}><i className="fa-solid fa-magnifying-glass-minus"></i><span>Theme</span></Button>
                      </li>
                      <li>
                        <Button onClick={() => { resetFontSize(); themeDisable() }}><i className="fa-solid fa-rotate-left"></i><span>Reset</span></Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
    fontSize: globalState.mainReducerData.fontSize,
  };
};
export default connect(mapStateToProps, {
  increaseFontSize,
  decreaseFontSize,
  setFontSize,
})(withNamespaces()(Header));
