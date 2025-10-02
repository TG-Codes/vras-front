import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import DefaultLayout from "../layout/default";
// import OurTeam from "../modules/frontend/ourTeam/ourTeam";
// import NewsDetails from "../modules/frontend/newsDetails/pages/newsDetails";
import "react-loading-skeleton/dist/skeleton.css";
const PageLoading = lazy(() => import("../utility/components/PageLoading"));
const HomeLoader = lazy(() => import("../utility/components/frontend/pageLoader/HomeLoader"));
const LoginLoader = lazy(() => import("../utility/components/frontend/pageLoader/LoginLoader"));
const AboutUsLoader = lazy(() => import("../utility/components/frontend/pageLoader/AboutUsLoader"));
const NewsDetailsLoader = lazy(() => import("../utility/components/frontend/pageLoader/NewsDetailsLoader"));
const LatestNewsLoader = lazy(() => import("../utility/components/frontend/pageLoader/LatestNewsLoader"));
const ContactUsLoader = lazy(() => import("../utility/components/frontend/pageLoader/ContactUsLoader"));
const OurTeamLoader = lazy(() => import("../utility/components/frontend/pageLoader/OurTeamLoader"));
const SubscriptionLoader = lazy(() => import("../utility/components/frontend/pageLoader/SubscriptionLoader"));

const Home = lazy(() => import("../modules/frontend/home/pages/home"));
const AboutUs = lazy(() => import("../modules/frontend/aboutUs/pages/aboutUs"));
const ContactUs = lazy(() =>
  import("../modules/frontend/contactUs/pages/contactUs")
);
const PrivacyPolicy = lazy(() =>
  import("../modules/frontend/privacyPolicy/pages/privacyPolicy")
);
const TermsAndConditions = lazy(() =>
  import("../modules/frontend/termsAndConditions/pages/termsAndConditions")
);
const News = lazy(() => import("../modules/frontend/news/pages/news"));
const NewsDetails = lazy(() =>
  import("../modules/frontend/newsDetails/pages/newsDetails")
);
const OurTeam = lazy(() => import("../modules/frontend/ourTeam/ourTeam"));
const Subscription = lazy(() =>
  import("../modules/frontend/subscription/pages/subscription")
);
const Login = lazy(() => import("../modules/frontend/login/pages/login"));
const AdminLogin = lazy(() => import("../modules/admin/login/pages/login"));
const ForgotPassword = lazy(() =>
  import("../modules/frontend/forgotPassword/pages/forgotPassword")
);
const AdminForgotPassword = lazy(() =>
  import("../modules/admin/forgotPassword/pages/forgotPassword")
);
const ResetPassword = lazy(() =>
  import("../modules/frontend/resetPassword/pages/resetPassword")
);
const AdminResetPassword = lazy(() =>
  import("../modules/admin/resetPassword/pages/resetPassword")
);
const Dashboard = lazy(() =>
  import("../modules/admin/dashboard/pages/dashboard")
);
const NotFound = lazy(() =>
  import("../modules/frontend/notFound/page/notFound")
);

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const FrontendRoutes = (props) => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeletonLoading(false);
    }, 1000);
  }, []);
  const {userData}= props;
  const redirect = () =>{
    if (Object.keys(userData).length > 0 && userData.role==="admin" ){
      setTimeout(()=>{
        return window.location.href=`${protocolURL}admin.${frontendDomain}/#/admin/dashboard`
      },3000)
    }
  }
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <Home />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/aboutUs"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <AboutUs />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/contactUs"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <ContactUs />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/privacyPolicy"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <PrivacyPolicy />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/termsAndConditions"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <TermsAndConditions />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <Subscription />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/ourTeam"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <OurTeam />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/newsDetails/:slug?"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <NewsDetails />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/latestnews"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <News />
              </Suspense>
            </DefaultLayout>
          }
        />
        {/* { userData && Object.keys(userData).length === 0 ?  ( */}
        <Route
          path="/login"
          element={
            <DefaultLayout>
              <Suspense fallback={<LoginLoader />}>
                <Login />
              </Suspense>
            </DefaultLayout>
          }
        />
        {/* ):(<Route
          path="/login"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <PageLoading />
              </Suspense>
            </DefaultLayout>
          }
        />)} */}
        <Route
          path="/forgotPassword"
          element={
            <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <ForgotPassword />
              </Suspense>
            </DefaultLayout>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            // <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <ResetPassword />
              </Suspense>
            // </DefaultLayout>
          }
        />
        {/* admin login routes are written here because, in adminroutes it will not work as there will be 
    no data inside of userData initially, and all of the admin routes requires userdata */}
    {/* { userData && Object.keys(userData).length === 0 ?  ( */}
    <Route
    path="/admin/login"
    element={
      <Suspense fallback={<PageLoading />}>
        <AdminLogin />
      </Suspense>
    }
  />
  {/* ):(
    <Route
    path="/admin/login"
    element={
      <Suspense fallback={<PageLoading />}>
        <PageLoading />
      </Suspense>
    }
  />
  )
  } */}
        <Route
          path="/admin/forgotPassword"
          element={
            <Suspense fallback={<PageLoading />}>
              <AdminForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="/admin/reset-password/:token"
          element={
            <Suspense fallback={<PageLoading />}>
              <AdminResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/testloader"
          element={
            <Suspense fallback={<PageLoading />}>
              <OurTeamLoader />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            // <DefaultLayout>
              <Suspense fallback={<PageLoading />}>
                <NotFound />
              </Suspense>
            // </DefaultLayout>
          }
        />
      </Routes>
    </>
  );
};
const Loading = () => {
  return (
    <>
      <div className="wrapper loader-box">
        <div className="spinner"></div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};
export default connect(mapStateToProps, {})(
  FrontendRoutes
);
// export default FrontendRoutes;
