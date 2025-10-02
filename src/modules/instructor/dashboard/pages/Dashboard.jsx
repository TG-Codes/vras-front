import axios from "axios";
import { async } from "q";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePreventBack from "../../../../utility/hooks/useRedirect";
import LiveSessions from "../../../client/liveSessions/pages/LiveSessions";
import Sessions from "../../sessions/pages/Sessions";

// import { Chart } from "../../../../utility/Chart";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Dashboard = (props) => {
  const {userData}= props;
  usePreventBack({userData})
  const navigate = useNavigate()
const authToken = userData.token;
const [data, setData]= useState([]);
useEffect(()=>{
  fetchData()
},[])
const fetchData = async()=>{
  try {
    const response = await axios.get(`${baseUrL}/instructors/pro-users?isOnline=1&isPro=1`,
    {
      headers: {
        Authorization: authToken
      }
    }
    )
    console.log("response.data.data ", response.data)
    setData(response.data.data.total)
  }
  catch (error){
    console.log(error)
  }
}
const linkToUsers = ()=>{
  navigate("/instructor/online-users")
}
return (
  <div>
    {/* {userData.role === "client" ? ( */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={()=> navigate("/instructor/missions?status=inactive")}>
            <p>Pending Missions</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                {/* <h3>05</h3> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={linkToUsers}>
            <p>Online Pro Users</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>{data}</h3>
              </div>
            </div>
          </div>
        
          
        </div>
  <Sessions />
      </div>
   
  </div>
);

};
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, {

})(Dashboard);
