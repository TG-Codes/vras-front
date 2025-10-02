import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/Auth";
const Analytics = lazy(() =>
  import("../modules/user/analytics/pages/Analytics")
);
const LiveSessions = lazy(() =>
  import("../modules/user/liveSessions/LiveSessions")
);
const UserMissions = lazy(() =>
  import("../modules/user/missions/pages/UserMissions")
);
const UserMissionDetails = lazy(() =>
  import("../modules/user/missionDetails/UserMissionDetais")
);
const OnlineUsers = lazy(() =>
  import("../modules/instructor/onlineUsers/pages/OnlineUsers")
);
const Dashboard = lazy(() =>
  import("../modules/user/dashboard/pages/dashboard")
);
const Profile = lazy(() =>
  import("../modules/user/profile/pages/profile")
);



const UserRoutes = () => {


  return (
    <Routes>
       <Route
          path="/user/*"
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
                path="missions"
                element={
                  <AuthLayout>
                    <Suspense fallback={<Loading />}>
                      <UserMissions />
                    </Suspense>
                  </AuthLayout>
                }
              />
               <Route
                path="mission-details/:slug?"
                element={
                  <AuthLayout>
                    <Suspense fallback={<Loading />}>
                      <UserMissionDetails />
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
                path="analytics"
                element={
                  <AuthLayout>
                    <Suspense fallback={<Loading />}>
                      <Analytics />
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

export default UserRoutes;


