import React, { useEffect } from "react";
import FrontendRoutes from "./frontendRoutes";
import AdminRoutes from "./adminRoutes";
import ClientRoutes from "./clientRoutes";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { loginSuccess, setCurrentPosition } from "../actions/allActions";
import InstructorRoutes from "./instructorRoutes";
import UserRoutes from "./userRoutes";
import RoleSwitchHandler from "../utility/RoleSwitchHandler";
import i18n from "../i18n";

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const Index = ({
  userData,
  loginSuccess,
  accessibleUsers,
  currentPosition,
}) => {
  const currentLocation =
    window.location.href === "http://rajesh.localhost:3000/#/dashboard";
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split("/");
  const mainDomain = window.location.host === frontendDomain;
  const determineRouteClass = (path) => {
    if (path.startsWith("/admin")) {
      return "admin-page";
    } else if (path.startsWith("/dashboard")) {
      return "admin-page";
    } else if (path.startsWith("/instructor")) {
      return "admin-page";
    } else if (path.startsWith("/user")) {
      return "admin-page";
    } else {
      return "";
    }
  };
  // useEffect(() => {
  //   const routeClass = determineRouteClass(location.pathname);
  //   document.body.className = routeClass;

  //   return () => {
  //     document.body.className = "";
  //   };
  // }, [location.pathname]);
  useEffect(() => {
    const routeClass = determineRouteClass(location.pathname);
  
    // Preserve hebrewClass and append route-specific class
    if (i18n.language === "he") {
      document.body.className = `hebrewClass ${routeClass}`.trim();
    } else {
      document.body.className = routeClass;
    }
  
    return () => {
      // Preserve hebrewClass even after cleanup
      if (i18n.language === "he") {
        document.body.className = "hebrewClass";
      } else {
        document.body.className = "";
      }
    };
  }, [location.pathname, i18n.language]);
  
  useEffect(() => {
    // if (userData && Object.keys(userData).length === 0) {
    if (window.location.href.includes("userlogout=true")) {
      loginSuccess({});
      navigate("/login");
    }
    // }
    if (window.location.href.includes("adminlogout=true")) {
      loginSuccess({});
      navigate("/admin/login");
    }
    if (i18n.language === "he") {
      document.body.className = "hebrewClass";
    }
  


  }, []);

  useEffect(() => {
    if (currentLocation && userData && Object.keys(userData).length > 0) {
      window.location.href = `${protocolURL}${userData.client.slug}.${frontendDomain}/#/dashboard`;
      if (userData.role === "client") {
        window.location.href = `${protocolURL}${userData.client.slug}.${frontendDomain}/#/dashboard`;
      }
      if (userData.role === "instructor") {
        window.location.href = `${protocolURL}${userData.client.slug}.${frontendDomain}/#/instructor/dashboard`;
      }
      if (userData.role === "user") {
        window.location.href = `${protocolURL}${userData.client.slug}.${frontendDomain}/#/user/dashboard`;
      }
      if (userData.role === "admin") {
        window.location.href = `${protocolURL}admin.${frontendDomain}/#/dashboard`;
      }
    }
  }, []);
  function isBase64(str) {
    try {
      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  }

  function checkIfBase64(str) {
    if (str.length % 4 !== 0) {
      return false;
    }

    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(str)) {
      return false;
    }

    try {
      const decoded = atob(str);

      // Check for non-printable characters to avoid misinterpreting plain text as base64
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i);
        if (charCode < 32 || charCode > 126) {
          // Non-printable or extended ASCII character found
          return false;
        }
      }

      return true;
    } catch (e) {
      return false;
    }
  }
  const dispatch=useDispatch();
  useEffect(() => {
    const lastPathValue = pathParts[pathParts.length - 1];

    if (checkIfBase64(lastPathValue)) {
      if (isBase64(lastPathValue) && lastPathValue) {
        const adminLoggedInData = JSON.parse(atob(lastPathValue));
        loginSuccess(adminLoggedInData).then(() => {
          console.log(adminLoggedInData, "adminLoggedInData");
          if (adminLoggedInData) {
            if (adminLoggedInData.role === "admin") {
              navigate("/admin/dashboard");
            } else if (adminLoggedInData.role === "client") {
              navigate("/dashboard");
              dispatch(setCurrentPosition("client"));
            } else if (adminLoggedInData.role === "instructor") {
              navigate("/instructor/dashboard");
              dispatch(setCurrentPosition("instructor"));
            } else if (adminLoggedInData.role === "user") {
              navigate("/user/dashboard");
              dispatch(setCurrentPosition("user"));
            } else {
              navigate("/dashboard");
            }
          }
        });
      }
    }
  }, []);

  const hostname = window.location.hostname;


  const frontendPaths = [
    "/signup",
    "/",
    "/about",
    "/contact",
    "/",
    "/admin/forgotpassword",
  ];
  const isFrontendRoute = frontendPaths?.includes(location.pathname);

  return (
    <>
      {/* <RoleSwitchHandler/> */}
      {userData && Object.keys(userData).length > 0 && (
        <>
          {userData.role && hostname.split(".")[0].includes(userData.role) && (
            <AdminRoutes />
          )}
          {(userData.role !== "admin" && (currentPosition == "client"))&& <ClientRoutes />}
        </>
      )}
      {isFrontendRoute && userData.role === "admin"
        ? window.location.assign(
            `${protocolURL}admin.${frontendDomain}/#/admin/dashboard`
          )
        : isFrontendRoute && userData.role === "client"
        ? window.location.assign(
            `${protocolURL}${userData.client.slug}.${frontendDomain}/#/dashboard`
          )
        : mainDomain && <FrontendRoutes />}
      {(currentPosition == "instructor" ) && <InstructorRoutes />}
      {currentPosition == "user" && <UserRoutes />}
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
    accessibleUsers: globalState.mainReducerData.accessibleUsers,
    currentPosition: globalState.mainReducerData.currentPosition,
  };
};

export default connect(mapStateToProps, { loginSuccess })(Index);
