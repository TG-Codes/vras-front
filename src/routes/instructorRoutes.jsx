import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/Auth";
import { connect } from "react-redux";
import NotFound from "../modules/frontend/notFound/page/notFound";
// import Livesessiondetails from "../modules/instructor/liveSessionDetails/Livesessiondetails";
const Livesessiondetails = lazy(()=> import("../modules/instructor/liveSessionDetails/Livesessiondetails"))
const Sessions = lazy(() =>
  import("../modules/instructor/sessions/pages/Sessions")
);
const OnlineUsers = lazy(() =>
  import("../modules/instructor/onlineUsers/pages/OnlineUsers")
);
const Dashboard = lazy(() =>
  import("../modules/instructor/dashboard/pages/Dashboard")
);
const InstructorMissions = lazy(() =>
  import("../modules/instructor/missions/instructorMissions")
);
const InstructorMissionDetails = lazy(() =>
  import("../modules/instructor/missionDetails/InstructorMissionDetails")
);
const Views = lazy(() =>
  import("../modules/instructor/livSessionDetailsInner/views")
);
const Analytics = lazy(() =>
  import("../modules/instructor/livSessionDetailsInner/analytics")
);
const InstructorRoutes = (props) => {
  const { userData } = props;

  return (
    <Routes>
      <Route
        path="/instructor/*"
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
              path="online-users"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <OnlineUsers />
                  </Suspense>
                </AuthLayout>
              }
            />
              <Route
              path="sessions"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Sessions/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="live-session-details/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Livesessiondetails/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="mission-details/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <InstructorMissionDetails/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="missions"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <InstructorMissions/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="views"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Views/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="analytics"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Analytics/>
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        }
      />
    </Routes>
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
  };
};
export default connect(mapStateToProps, {})(InstructorRoutes);
