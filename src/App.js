import "./App.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Routes from "./routes";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { loaderStateTrue, loaderStateFalse } from "./actions/allActions";
import { withNamespaces } from 'react-i18next';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import i18n from "./i18n";

const App = (props) => {
  const { loaderStateFalse } = props;
  useEffect(() => {
    loaderStateFalse();
  }, [loaderStateFalse]);
  const { isLoading } = props;
  const options = [
    { value: 'en', label: 'English' },
    { value: 'he', label: 'Hebrew' },
  ]
  const [selectedLanguage, setSelectedLanguage] = useState(
    options.find(lang => lang.value === i18n.language) // Initial language
  );
  const handleChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    i18n.changeLanguage(selectedOption.value); // Change language in i18next
    window.location.reload()
  };

  useEffect(() => {
    // Dynamically load Hebrew CSS if the language is 'he' and it hasn't been loaded yet
    if (i18n.language === "he" ) {
      import("./utility/assets/css/hebrew.css")
        .then(() => {
          console.log("Hebrew CSS loaded");
        })
        .catch(err => {
          console.error("Error loading Hebrew CSS", err);
        });

    } else {
      console.log("Here");

      import("./utility/assets/css/custom.css")
 
    }
    const script = document.createElement('script');

    script.setAttribute('data-account', '68mFOCIT8L'); // Mandatory attribute
    script.setAttribute('src', 'https://cdn.userway.org/widget.js');

    if (i18n.language) {
      script.setAttribute('data-language', i18n.language); // Dynamically set language
    }

    document.body.appendChild(script);
  }, [i18n.language]);
  return (
    <LoadingOverlay active={isLoading} spinner text="Loading your content..." styles={{
      overlay: (base) => ({
        ...base,
        zIndex: 9999,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }),
    }}>
      <ToastContainer />
      {/* <div className="language-dropdown">
      <Select options={options} value={selectedLanguage} onChange={handleChange}/>
      </div> */}
      <HashRouter>
        <Routes />
      </HashRouter>
    </LoadingOverlay>
  );
};

const mapStateToProps = (globalState) => {
  return {
    isLoading: globalState.mainReducerData.loaderState,
  };
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse })(withNamespaces()(App));
