import axios from "axios";
import { async } from "q";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePreventBack from "../../../../utility/hooks/useRedirect";
import { getHeaders } from "../../../../utility/http";
// import { Chart } from "../../../../utility/Chart";
const baseUrL = process.env.REACT_APP_BASE_URL;

const Dashboard = (props) => {
  const {userData}= props;
  usePreventBack({userData})
  const navigate = useNavigate()
const authToken = userData.token;
const [data, setData]= useState([]);
const [ onlineUsers, setOnlineUsers ]= useState([])
const [pendingMissions, setPendingMissions ] = useState([])
useEffect(()=>{
  fetchData()
  fetchusersData()
  fetchPendingMissions()
},[])
const fetchData = async()=>{
  try {
    const headers = await getHeaders(
      {
        Authorization: authToken,
      }
    );
    const response = await axios.get(`${baseUrL}/clients/pro-users?isOnline=1&isPro=1&role=user`,
    
    {
      // headers: {
      //   Authorization: authToken
      // }

      headers: headers

    }
    )
    setData(response.data.data.total)
  }
  catch (error){
    console.log(error)
  }
}
const fetchusersData = async()=>{
  try {
    const response = await axios.get(`${baseUrL}/clients/pro-users?isOnline=1&isPro=0&role=user`,
    {
      headers: {
        Authorization: authToken
      }
    }
    )
    setOnlineUsers(response.data.data.total)
  }
  catch (error){
    console.log(error)
  }
}
const fetchPendingMissions = async()=>{
  try {
    const response = await axios.get(`${baseUrL}/clients/missions?status=inactive`,
    {
      headers: {
        Authorization: authToken
      }
    }
    )
    setPendingMissions(response.data.data.total)
  }
  catch (error){
    console.log(error)
  }
}
const linkToUsers = ()=>{
  navigate("/users")
}
const linkToMissions = ()=>{
  navigate('/missions?status=inactive')
}
const linkToProUsers = ()=> {
  navigate('/pro-users?isOnline=1')
}
return (
  <div>
    {/* {userData.role === "client" ? ( */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={()=> navigate('/online-activities')}>
            <p>Online Activities</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>0</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={linkToUsers}>
            <p>Online Users</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>{onlineUsers}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={linkToMissions}>
            <p>Pending Missions</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>{pendingMissions}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={linkToProUsers}>
            <p>Online Pro Users</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>{data}</h3>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6">
            <div className="small-box purple_box" style={{cursor: "pointer"}} onClick={linkToUsers}>
            <p>Pro Users</p>
              <div className="inner">
              <span><i className="fa-solid fa-users"></i></span>
                <h3>{data}</h3>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div>
          <Chart
          />
        </div> */}
      </div>
    {/* ) : (
      <div>Dashboard</div>
    )} */}
  </div>
);

};
const mapStateToProps = (globalState) => {
  console.log("globallll", globalState);
  
  return {
    userData: globalState.mainReducerData.userData,
  };

};
export default connect(mapStateToProps, {

})(Dashboard);
