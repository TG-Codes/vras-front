import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./utility/assets/css/slick.css";
import "./utility/assets/css/style.css";
// import "admin-lte/dist/css/adminlte.min.css";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./utility/assets/css/bootstrap.min.css";
//import 'admin-lte/dist/js/adminlte.min.js';
//import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./utility/assets/css/all.css";
// import './utility/assets/css/hebrew.css';
import "./utility/assets/css/custom.css";
import "./utility/assets/css/fonts.css";
import "./utility/assets/css/responsive.css";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={false}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
//StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
