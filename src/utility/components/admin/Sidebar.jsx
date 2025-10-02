import i18n from "../../../i18n.js";
import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo_white from "../../assets/images/logo_white.png";
import { toggleSidebar } from "../../../actions/allActions";
import { withNamespaces } from "react-i18next";
const Sidebar = (props) => {
  const { userData,accessibleUsers,currentPosition, toggleSidebar, activeSidebar, t}= props;
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    if (
      userData.role === "user" &&
      typeof userData.permissions === "string" &&
      userData.permissions !== "{}"
    ) {
      setPermissions(JSON.parse(userData.permissions));
    }
  }, []);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-collapse">
        <div className="side_bar_top">
          <a className="brand-link">
            <span className="brand-text font-weight-light">
              <img src={logo_white} alt="" />
            </span>
          </a>
          <ul className="navbar-nav side_trigger">
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
                data-widget="pushmenu"
                role="button"
                onClick={() => {
                  toggleSidebar(!activeSidebar);
                }}
              >
                <i class="fa-solid fa-chevron-left"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar">
          {/* <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/clients" className="nav-link">
                  <i className="nav-icon fas fa-info"></i>
                  <p>Clients</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/roles" className="nav-link">
                  <i className="nav-icon fas fa-info"></i>
                  <p>Roles</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/subscriptions" className="nav-link">
                  <i className="nav-icon fas fa-info"></i>
                  <p>Subscriptions</p>
                </Link>
              </li>
            </ul>
          </nav> */}
          <nav className="mt-2">
            {userData && userData.role === "admin" ? (
              <ul
                className="nav nav-pills nav-sidebar"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/admin/dashboard"
                    className={
                      activeLink === "/admin/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/dashboard");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">{t("dashboardLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/clients"
                    className={
                      activeLink === "/admin/clients"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/clients");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-users"></i>
                    </em>
                    <span className="navigation-text">{t("clientLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/roles"
                    className={
                      activeLink === "/admin/roles"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/roles");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-user-lock"></i>
                    </em>
                    <span className="navigation-text">{t("roleLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/subscriptions"
                    className={
                      activeLink === "/admin/subscriptions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/subscriptions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-circle-dollar-to-slot"></i>
                    </em>
                    <span className="navigation-text">{t("subscriptionLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/environment-scenario"
                    className={
                      activeLink === "/admin/environment-scenario"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/environment-scenario");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-circle-half-stroke"></i>
                    </em>
                    <span className="navigation-text">{t("environmentScenarioLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/weapons"
                    className={
                      activeLink === "/admin/weapons"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/admin/weapons");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-gun"></i>
                    </em>
                    <span className="navigation-text">{t("weaponLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/cms"
                    className={
                      activeLink === "/admin/cms"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/cms")}
                  >
                    <em><i className="fas fa-tasks"></i></em>
                    <span className="navigation-text">CMS</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/blogs"
                    className={
                      activeLink === "/admin/blogs"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/blogs")}
                  >
                    <em><i className="fa-solid fa-blog"></i></em>
                    <span className="navigation-text">{t("blogs")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/testimonial"
                    className={
                      activeLink === "/admin/testimonial"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/testimonial")}
                  >
                    <em><i className="fas fa-comments"></i></em>
                    <span className="navigation-text">{t("testimonialLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/videos"
                    className={
                      activeLink === "/admin/videos"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/videos")}
                  >
                    <em><i className="fa-solid fa-video"></i></em>
                    <span className="navigation-text">{t("videosLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/logos"
                    className={
                      activeLink === "/admin/logos"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/logos")}
                  >
                    <em><i className="fa-solid fa-image"></i></em>
                    <span className="navigation-text">{t("logoLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/setting"
                    className={
                      activeLink === "/admin/setting"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/setting")}
                  >
                    <em><i className="fa-solid fa-wrench"></i></em>
                    <span className="navigation-text">{t("settingLink")}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/admins"
                    className={
                      activeLink === "/admin/admin"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => handleLinkClick("/admin/admin")}
                  >
                    <em><i className="fa-regular fa-user"></i></em>
                    <span className="navigation-text">{t("adminsLink")}</span>
                  </Link>
                </li>
              </ul>
            ) : userData && userData.role === "client" && currentPosition=='client'  ? (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={
                      activeLink === "/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/dashboard");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/departments"
                    className={
                      activeLink === "/departments"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/departments");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-building"></i>
                    </em>
                    <span className="navigation-text">Departments</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/missions"
                    className={
                      activeLink === "/missions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/missions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-bullseye"></i>
                    </em>
                    <span className="navigation-text">Missions</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/pro-users"
                    className={
                      activeLink === "/pro-users"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/pro-users");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-user-check"></i>
                    </em>
                    <span className="navigation-text">Pro Users</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/live-sessions"
                    className={
                      activeLink === "/live-sessions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/live-sessions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-video"></i>
                    </em>
                    <span className="navigation-text">Live Sessions</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    to="/users"
                    className={
                      activeLink === "/users" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/users");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-users"></i>
                    </em>
                    <span className="navigation-text">Users</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/target"
                    className={
                      activeLink === "/target" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/target");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-regular fa-circle-dot"></i>
                    </em>
                    <span className="navigation-text">Targets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/session"
                    className={
                      activeLink === "/session" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/session");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </em>
                    <span className="navigation-text">Sessions</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/scenarios"
                    className={
                      activeLink === "/scenarios"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/scenarios");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="fa-solid fa-tablet-screen-button"></i>
                    </em>
                    <span className="navigation-text">Scenarios</span>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/warehouse"
                    className={
                      activeLink === "/warehouse"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/warehouse");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-warehouse"></i>
                    </em>
                    <span className="navigation-text">Warehouse</span>
                  </Link>
                </li>
              </ul>
            ) :accessibleUsers.includes('instructor') &&  currentPosition=='instructor'?(<>
             <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/instructor/dashboard"
                    className={
                      activeLink === "/instructor/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/instructor/dashboard");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">Dashboard</span>
                  </Link>
                </li> 
                <li className="nav-item">
                  <Link
                    to="/instructor/online-users"
                    className={
                      activeLink === "/instructor/online-users"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/instructor/online-users");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-regular fa-user" style={{color: "#63E6BE"}}></i>
                    </em>
                    <span className="navigation-text">Online Users</span>
                  </Link>
                </li> 
                {/* <li className="nav-item">
                  <Link
                    to="/instructor/missions"
                    className={
                      activeLink === "/instructor/missions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/instructor/missions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-bullseye"></i>
                    </em>
                    <span className="navigation-text">Missions</span>
                  </Link>
                </li>  */}
                <li className="nav-item">
                  <Link
                    to="/instructor/sessions"
                    className={
                      activeLink === "/instructor/sessions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/instructor/sessions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-video"></i>
                    </em>
                    <span className="navigation-text">Live Sessions</span>
                  </Link>
                </li> 
               
              </ul>
            </>):accessibleUsers.includes('user') &&  currentPosition=='user'?(<>
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/user/dashboard"
                    className={
                      activeLink === "/user/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/user/dashboard");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">Dashboard</span>
                  </Link>
                </li> 
                {/* <li className="nav-item">
                  <Link
                    to="/user/online-users"
                    className={
                      activeLink === "/user/online-users"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/instructor/online-users");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">Online Users</span>
                  </Link>
                </li>  */}
                <li className="nav-item">
                  <Link
                    to="/user/missions"
                    className={
                      activeLink === "/user/missions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/user/missions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-bullseye"></i>
                    </em>
                    <span className="navigation-text">Missions</span>
                  </Link>
                </li> 
                <li className="nav-item">
                  <Link
                    to="/user/live-sessions"
                    className={
                      activeLink === "/user/live-sessions"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/user/live-sessions");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-video"></i>
                    </em>
                    <span className="navigation-text">Live Sessions</span>
                  </Link>
                </li> 
                <li className="nav-item">
                  <Link
                    to="/user/analytics"
                    className={
                      activeLink === "/user/analytics"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/user/analytics");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                    <i className="fa-solid fa-chart-pie"></i>
                    </em>
                    <span className="navigation-text">Analytics</span>
                  </Link>
                </li> 
              </ul>
            </>): (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={
                      activeLink === "/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      handleLinkClick("/dashboard");
                      if (window.innerWidth < 778) {
                        toggleSidebar(!activeSidebar);
                      }
                    }}
                  >
                    <em>
                      <i className="nav-icon fas fa-home"></i>
                    </em>
                    <span className="navigation-text">Dashboard</span>
                  </Link>
                </li>
                {permissions.some(
                  (permission) =>
                    permission.module === "user" ||
                    permission.label === "User Read"
                ) && (
                  <li className="nav-item">
                    <Link
                      to="/users"
                      className={
                        activeLink === "/users" ? "nav-link active" : "nav-link"
                      }
                      onClick={() => {
                        handleLinkClick("/users");
                        if (window.innerWidth < 778) {
                          toggleSidebar(!activeSidebar);
                        }
                      }}
                    >
                      <em>
                        <i className="fa-solid fa-users"></i>
                      </em>
                      <span className="navigation-text">Users</span>
                    </Link>
                  </li>
                )}
                {permissions.some(
                  (permission) =>
                    permission.module === "target" ||
                    permission.label === "Target Read"
                ) && (
                  <li className="nav-item">
                    <Link
                      to="/target"
                      className={
                        activeLink === "/target"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => {
                        handleLinkClick("/target");
                        if (window.innerWidth < 778) {
                          toggleSidebar(!activeSidebar);
                        }
                      }}
                    >
                      <em>
                      <i className="fa-regular fa-circle-dot"></i>
                    </em>
                    <span className="navigation-text">Targets</span>
                    </Link>
                  </li>
                )}
                {permissions.some(
                  (permission) =>
                    permission.module === "session" ||
                    permission.label === "Session Read"
                ) && (
                  <li className="nav-item">
                    <Link
                      to="/session"
                      className={
                        activeLink === "/session"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => {
                        handleLinkClick("/session");
                        if (window.innerWidth < 778) {
                          toggleSidebar(!activeSidebar);
                        }
                      }}
                    >
                       <em>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </em>
                    <span className="navigation-text">Sessions</span>
                    </Link>
                  </li>
                )}
                {permissions.some(
                  (permission) =>
                    permission.module === "scenario" ||
                    permission.label === "Scenario Read"
                ) && (
                  <li className="nav-item">
                    <Link
                      to="/scenarios"
                      className={
                        activeLink === "/scenarios"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => {
                        handleLinkClick("/scenarios");
                        if (window.innerWidth < 778) {
                          toggleSidebar(!activeSidebar);
                        }
                      }}
                    >
                      <em>
                      <i className="fa-solid fa-tablet-screen-button"></i>
                    </em>
                    <span className="navigation-text">Scenarios</span>
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {
    activeSidebar: globalState.mainReducerData.activeSidebar,
    userData: globalState.mainReducerData.userData,
    accessibleUsers:globalState.mainReducerData.accessibleUsers,
    currentPosition:globalState.mainReducerData.currentPosition
  };
};
export default connect(mapStateToProps, { toggleSidebar })(
  withNamespaces()(Sidebar)
);
