import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/Auth";
import DefaultLayout from "../layout/default";
import { connect } from "react-redux";
import InstructorRoutes from "./instructorRoutes";
import UserRoutes from "./userRoutes";
import MissionAddEdit from "../utility/components/clients/MissionAddEdit";
// import ProUsersDepartment from "../modules/client/dpartmentsInner/proUsersDepartment";
const OnlineActivities=lazy(() => import("../modules/client/onlineActivities/OnlineActivities"));
const ProUsersDepartment=lazy(() => import("../modules/client/dpartmentsInner/proUsersDepartment"));
const Recordings=lazy(() => import("../modules/client/proUserInner/Recordings"));
const PendingMissions=lazy(() => import("../modules/client/proUserInner/PendingMissions"));
const PersonalisedAnalytics=lazy(() => import("../modules/client/proUserInner/PersonalisedAnalytics"));
const Missions = lazy(() => import("../modules/client/missions/pages/Missions"));
const MissionDetails = lazy(() => import("../modules/client/missionDetails/MissionDetails"));
const Departments = lazy(() => import("../modules/client/departments/pages/Departments"));
const ProUsers = lazy(() => import("../modules/client/proUsers/pages/ProUsers"));
const LiveSessions = lazy(() => import("../modules/client/liveSessions/pages/LiveSessions"));
const Warehouse = lazy(() => import("../modules/client/warehouse/pages/Warehouse"));
const Dashboard = lazy(() =>
  import("../modules/client/dashboard/pages/Dashboard")
);
const Users = lazy(() => import("../modules/client/users/pages/Users"));
const Target = lazy(() => import("../modules/client/target/pages/target"));
const Sessions = lazy(() =>
  import("../modules/client/sessions/pages/sessions")
);
const Scenario = lazy(() =>
  import("../modules/client/scenarios/pages/scenario")
);
const Home = lazy(() => import("../modules/frontend/home/pages/home"));
const Profile = lazy(() => import("../modules/client/profile/pages/Profile"));
const NotFound = lazy(() => import("../modules/frontend/notFound/page/notFound"));
// import NotFound from "../modules/frontend/notFound/page/notFound";
const DepartmentDetails= lazy(() => import("../modules/client/departmentDetails/DepartmentDetails"));
const LiveSessionsDetails= lazy(() => import("../modules/client/liveSessionsDetails/LiveSessionsDetails"));
const ProUserDetails= lazy(() => import("../modules/client/proUserDetails/ProUserDetails"));
const ClientRoutes = (props) => {
  const { userData ,accessibleUsers} = props;
  const [permissions, setPermissions]=useState([])
  // useEffect(() => {
  //   if (userData.role === "user" && typeof userData.permissions === "string" && userData.permissions !== "{}") {
  //     setPermissions(JSON.parse(userData.permissions));
  //     console.log("userData in clientRoute", permissions);
  //   }
  // }, [userData.role, userData.permissions, permissions]);
  
  // if (userData && userData.role === "user" && typeof userData.permissions === "string" && userData.permissions !== "{}") {
  //   setPermissions(JSON.parse(userData.permissions));
  //   console.log("userData in clientRoute", permissions);
  // }

  useEffect(() => {
    if (userData && userData.role === "user" && typeof userData.permissions === "string" && userData.permissions !== "{}") {
      setPermissions(JSON.parse(userData.permissions));
    }
    // console.log("hello")
  }, []);
  
  // const permissions = JSON.parse(userData.permissions);
  // console.log("userData in clientRoute", permissions);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Routes>
            <Route
              path="dashboard/:userData?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Dashboard />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="profile"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Profile />
                  </Suspense>
                </AuthLayout>
              }
            />
            {userData.role === "user" ? (
              <>
                {permissions.some(
                  (permission) =>
                    permission.module === "user" ||
                    permission.label === "User Read"
                ) && (
                  <Route
                    path="users"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Users />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                )}
               
                {permissions.some(
                  (permission) =>
                    permission.module === "target" ||
                    permission.label === "Target Read"
                ) && (
                  <Route
                    path="target"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Target />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                )}
                {permissions.some(
                  (permission) =>
                    permission.module === "session" ||
                    permission.label === "Session Read"
                ) && (
                  <Route
                    path="session"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Sessions />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                )}
                {permissions.some(
                  (permission) =>
                    permission.module === "scenario" ||
                    permission.label === "Scenario Read"
                ) && (
                  <Route
                    path="scenarios"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Scenario />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                )}
              </>
            ) : (
              <>
                <Route
                    path="departments"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Departments />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                   <Route
                    path="department-details/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <DepartmentDetails />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="missions"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Missions />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                   <Route
                    path="pro-users"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <ProUsers />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                   <Route
                    path="live-sessions"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <LiveSessions />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="warehouse"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Warehouse />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                <Route
                  path="users"
                  element={
                    <AuthLayout>
                      <Suspense fallback={<Loading />}>
                        <Users />
                      </Suspense>
                    </AuthLayout>
                  }
                />
                <Route
                  path="target"
                  element={
                    <AuthLayout>
                      <Suspense fallback={<Loading />}>
                        <Target />
                      </Suspense>
                    </AuthLayout>
                  }
                />
                <Route
                  path="session"
                  element={
                    <AuthLayout>
                      <Suspense fallback={<Loading />}>
                        <Sessions />
                      </Suspense>
                    </AuthLayout>
                  }
                />
                <Route
                  path="scenarios"
                  element={
                    <AuthLayout>
                      <Suspense fallback={<Loading />}>
                        <Scenario />
                      </Suspense>
                    </AuthLayout>
                  }
                />
                <Route
                    path="pro-user-details/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <ProUserDetails />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="pro-userwise-departments/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <ProUsersDepartment />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                   <Route
                    path="personalized-analytics/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <PersonalisedAnalytics />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="pending-mission/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <PendingMissions />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="mission-details/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <MissionDetails />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                   <Route
                    path="recordings/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <Recordings />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="live-session/:slug?"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <LiveSessionsDetails />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="online-activities"
                    element={
                      <AuthLayout>
                        <Suspense fallback={<Loading />}>
                          <OnlineActivities />
                        </Suspense>
                      </AuthLayout>
                    }
                  />
              </>
            )}

            {!accessibleUsers.includes('instructor') && !accessibleUsers.includes('user') &&<Route
              path="*"
              element={
                // <DefaultLayout>
                  <Suspense fallback={<Loading />}>
                    <NotFound />
                  </Suspense>
                // </DefaultLayout>
              }
            />}
          </Routes>
        }
      />

    </Routes>
    // <>Hello</>
  );
};

const Loading = () => {
  return (
    <div className="wrapper">
       <div className="mainLoader">
        <div className="loader_1"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
    accessibleUsers:globalState.mainReducerData.accessibleUsers
  };
};
export default connect(mapStateToProps, {})(ClientRoutes);
// export default ClientRoutes;
