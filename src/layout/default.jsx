import React, { useState } from "react";
import i18n from "../i18n.js";
import { connect } from "react-redux";
import Header from "../utility/components/frontend/Header";
import Footer from "../utility/components/frontend/Footer";
const DefaultLayout = ({ children }) => {
  const [lightBackground, setLightBackground]= useState(false)
  const themeEnable = ()=>{
    setLightBackground(true)
  }
  const themeDisable = ()=>{
    setLightBackground(false)
  }
  // const storedLanguage = localStorage.getItem("selectedLanguage");
  // console.log("stored lang default:", storedLanguage);

  console.log("i18n lang default", i18n.language);

  return (
    <div className={`${lightBackground==true? "light-theme": ""} ${i18n.language== "en" ? "":""}`}>
    <Header themeEnable={themeEnable} themeDisable={themeDisable} />
      <div>{children}</div>
    <Footer />
    </div>
  );
};
const mapStateToProps = (globalState) => {
  return {
   
  };
};

export default connect(mapStateToProps,{})(DefaultLayout);
