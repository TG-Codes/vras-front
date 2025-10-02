import React from "react";
import i18n from "../i18n.js";
import Header from "../utility/components/admin/Header";
import Sidebar from "../utility/components/admin/Sidebar";
import { connect } from "react-redux";
import Footer from "../utility/components/admin/Footer";
import InnerHeader from "../utility/components/admin/InnerHeader";
import { toggleSidebar } from "../actions/allActions";
import { faHandLizard } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
const AuthLayout = ({ activeSidebar, children, userData, toggleSidebar }) => {
  const styles = {
    contentWrapper: {
      minHeight: 'auto',
      height: 'calc(100vh - 170px)',
      important: true,
    },
  };
  const navigate = useNavigate();
const location=useLocation()
    const handleBack = () => {
        navigate(-1); 
    };

  const hostname = window.location.hostname;
  // const storedLanguage = localStorage.getItem("selectedLanguage");
  // console.log("stored lang auth:", storedLanguage);
  console.log("i18n lang auth", i18n.language);
  return (
    <>
        <div
          className={
            ` ${activeSidebar
                ? "font_dashboard"
                : "font_dashboard sidemenu_expand"}
              ${i18n.language == "en"?
                "":
                ""
              }
                `
          }
        >
          <div className="wrapper_outer">
          <Sidebar />
          <div className="wrapper">
            <Header />
            
            <div className="content-wrapper" style={styles.contentWrapper}>
              {/* <InnerHeader /> */}
              {/* {!location.pathname.includes('dashboard')&&<div className="back-button" onClick={handleBack}>
                <i className="fa fa-arrow-left"></i> 
            </div>} */}
              <section className="content">{children}</section>
            </div>
          </div>
          <div className="overlay" onClick={()=>toggleSidebar(!activeSidebar)}></div>
          <Footer/>
          </div>
        </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {
    activeSidebar: globalState.mainReducerData.activeSidebar,
    userData: globalState.mainReducerData.userData
  };
};

export default connect(mapStateToProps, {toggleSidebar})(AuthLayout);