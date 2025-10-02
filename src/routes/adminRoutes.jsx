import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/Auth";
import DefaultLayout from "../layout/default";
import Home from "../modules/frontend/home/pages/home";
const UserwiseDepartment = lazy(() =>
  import("../modules/admin/users/pages/userwiseDepartment"))
const DepartmentUsers = lazy(() =>
  import("../modules/admin/users/pages/departmentUsers"))
const AllUsers = lazy(() =>
  import("../modules/admin/users/pages/allUsers")
);
const Recordings = lazy(() =>
  import("../modules/client/proUserInner/Recordings")
);
const PersonalisedAnalytics = lazy(() =>
  import("../modules/client/proUserInner/PersonalisedAnalytics")
);
const PendingMissions = lazy(() =>
  import("../modules/client/proUserInner/PendingMissions")
);
const ProUserDetails = lazy(() =>
  import("../modules/client/proUserDetails/ProUserDetails")
);
const ProUsers = lazy(() =>
  import("../modules/client/proUsers/pages/ProUsers")
);
const ClientEnvironments = lazy(() =>
  import("../modules/admin/clientDetailsInner/ClientEnvironments")
);
const ClientAnalytics = lazy(() =>
  import("../modules/admin/clientDetailsInner/ClientAnalytics")
);
const CLientOnlineActivities = lazy(() =>
  import("../modules/admin/clientDetailsInner/CLientOnlineActivities")
);
const ClientRecordings = lazy(() =>
  import("../modules/admin/clientDetailsInner/ClientRecordings")
);
const ClientRelevantInformation = lazy(() =>
  import("../modules/admin/clientDetailsInner/ClientRelevantInformation")
);
const ClientScenarios = lazy(() =>
  import("../modules/admin/clientDetailsInner/ClientScenarios")
);
const ClientDetails = lazy(() =>
  import("../modules/admin/clientDetails/clientDetails")
);
const EnvironmentScenarios = lazy(() =>
  import("../modules/admin/environmentScenarios/pages/environmentScenarios")
);
const Dashboard = lazy(() =>
  import("../modules/admin/dashboard/pages/dashboard")
);
const Roles = lazy(() => import("../modules/admin/roles/pages/roles"));
const Clients = lazy(() => import("../modules/admin/clients/pages/clients"));
const Subscriptions = lazy(() =>
  import("../modules/admin/subscriptions/pages/subscriptions")
);
const Weapons = lazy(() => import("../modules/admin/weapons/pages/weapons"));
const Cms = lazy(() => import("../modules/admin/CMS/pages/cms"));
const Blogs = lazy(() => import("../modules/admin/blog/pages/blogs"));
const Videos = lazy(() => import("../modules/admin/videos/pages/videos"));
const Testimonials = lazy(() =>
  import("../modules/admin/testimonials/pages/testimonials")
);
const NotFound = lazy(() =>
  import("../modules/frontend/notFound/page/notFound")
);
const Logos = lazy(() => import("../modules/admin/logos/pages/logos"));
const Settings = lazy(() => import("../modules/admin/settings/pages/Settings"));
const Admins = lazy(() => import("../modules/admin/createAdmin/pages/createAdmin"));
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
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
              path="roles"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Roles />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="clients"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Clients />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="subscriptions"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Subscriptions />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="weapons"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Weapons />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="cms"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Cms />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="blogs"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Blogs />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="testimonial"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Testimonials />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="videos"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Videos />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="logos"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Logos />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="setting"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Settings />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="admins"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <Admins />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="environment-scenario"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <EnvironmentScenarios />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-details/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientDetails />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-environment/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientEnvironments />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-scenario/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientScenarios />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-analytics/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientAnalytics />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-recordings/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientRecordings />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-online-activities/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <CLientOnlineActivities />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-details/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientDetails />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="client-relevantinfo/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <ClientRelevantInformation />
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
              path="all-pro-users"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <AllUsers />
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
              path="department-users/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <DepartmentUsers />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="users-department/:slug?"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <UserwiseDepartment />
                  </Suspense>
                </AuthLayout>
              }
            />
            <Route
              path="*"
              element={
                <AuthLayout>
                  <Suspense fallback={<Loading />}>
                    <NotFound />
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

export default AdminRoutes;
