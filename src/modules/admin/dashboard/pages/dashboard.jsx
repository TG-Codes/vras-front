import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usePreventBack from "../../../../utility/hooks/useRedirect";
import { withNamespaces } from "react-i18next";
import {P} from "../../../../utility/components/Typography";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Dashboard = (props) => {
  const { userData, t, activeClients, activeSidebar } = props;
  usePreventBack({userData})
  const authToken = userData.token;
  const [data, setData] = useState([])
  const [proUsersData, setProUsersData] = useState([])
  const [onlineClients, setOnlineClients] = useState([])
  const [onlineProUsers, setOnlineProUsers] = useState([])
  useEffect(() => {
    fetchData()
    fetchUsersData()
    fetchOnlineClients()
    fetchOnlineUsersData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/clients`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      // console.log("response in dashboard ",response.data.data.total)
      setData(response.data.data)

    } catch (error) {
      console.log(error)
      console.log(error.status)
    }
  }
  const fetchOnlineClients = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/clients?isOnline=1`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      // console.log("response in dashboard ",response.data.data.total)
      setOnlineClients(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }
  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/total-pro-users?`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      // console.log("response in dashboard ",response.data.data.total)
      setProUsersData(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }
  const fetchOnlineUsersData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/admin/total-pro-users?isOnline=1`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      // console.log("response in dashboard ",response.data.data.total)
      setOnlineProUsers(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }
  const navigate = useNavigate()
  const handleClientLink = ()=>{
    navigate("/admin/clients")
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Link className="small-box purple_box" to="/admin/clients">
            <P>{t("clientLink")}</P>
            <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
              <h3>{data.total}</h3>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6">
          <Link className="small-box purple_box" to="/admin/clients?isOnline=1">
            <P>{t("onlineClientLink")}</P>
            <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
              <h3>{onlineClients.total}</h3>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6">
          <Link className="small-box purple_box" to="/admin/all-pro-users">
            <P>{t("usersLink")}</P>
            <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
              <h3>{proUsersData.total}</h3>
            </div>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6">
          <Link className="small-box purple_box" to="/admin/all-pro-users?isOnline=1">
            <P>{t("onlineUsersLink")}</P>
            <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
              <h3>{onlineProUsers.total}</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
    activeClients: globalState.mainReducerData.activeClients,
    activeSidebar: globalState.mainReducerData.activeSidebar,
  };
};
export default connect(mapStateToProps, {

})(
  withNamespaces()(Dashboard)
);
