import axios from "axios";
import { async } from "q";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePreventBack from "../../../../utility/hooks/useRedirect";
import LiveSessions from "../../../client/liveSessions/pages/LiveSessions";
import { AgGridReact } from "ag-grid-react";
import Button from "../../../../utility/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bubble_img from "../../../../utility/assets/images/bubble_chart.png"
// import { Chart } from "../../../../utility/Chart";
const baseUrL = process.env.REACT_APP_BASE_URL;
// const rowData = [
//   {
//     id: 1,
//     sessions: "Mission 1",
//     join: "Join Now",
//   },
//   {
//     id: 2,
//     sessions: "Mission 2",
//     join: "Join Now",
//   },
// ];
const Dashboard = (props) => {
  const rowHeight = 70;
  const { userData } = props;
  const [ rowData, setRowData] = useState([])
  const[ missionsData, setMissionData ] = useState([])
  console.log("missionsData ", missionsData)
  const fetchLiveSessionData = async ()=> {
    try {
      const response = await axios.get(`${baseUrL}/users/live-sessions`, {
        headers : {
          Authorization: authToken
        }
      })
      setRowData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchMissionsData = async ()=> {
    try {
      const response = await axios.get(`${baseUrL}/users/missions?status=inactive&page=1&length=1000`, {
        headers : {
          Authorization: authToken
        }
      })
      setMissionData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", width: "685" },
    {
      field: "Action",
      cellRenderer: (params) => {
        if (params.data) {
          return (
            <>
              {true&& (
                <div>
                  <Button
                    onClick={(e) => joinLiveSession(e, params)}
                    className="action_button edt_btn"
                  >
                    Join Now <FontAwesomeIcon icon="fa-solid fa-play" />
                  </Button>
                </div>
              )}
            </>
          );
        } else {
          return null;
        }
      },
    },
    // { field: "join", width: "685" },
  ]);
  const joinLiveSession = (e, params)=> {
    console.log("join session")
  }
  usePreventBack({ userData });
  const navigate = useNavigate();
  const authToken = userData.token;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
    fetchLiveSessionData()
    fetchMissionsData()
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/users`, {
        headers: {
          Authorization: authToken,
        },
      });
      setData(response.data.data.total);
    } catch (error) {
      console.log(error);
    }
  };
  const linkToUsers = () => {
    navigate("/online-users");
  };
  return (
    <>
    <div className="client-details-holder">
    {/* <div className="back_btn_caption_hold">
    <h3>    
              <span style={{marginRight:"10px"}}>
                <img src={bubble_img} />
                </span>Departments
            </h3>
            </div> */}
      {/* {userData.role === "client" ? ( */}
      <div className="globaltable_holder">
      <div className="table_modal_open">
      <div className="back_btn_caption_hold">
           {/* <BackButton className={"back-button"} /> */}
          <span className="icn_bk_btn"><img src={bubble_img}/></span>
           <h3>Live Sessions</h3>
        </div>
        {/* <Button className="tablemodal_btn" onClick={addDepartment}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add Department
        </Button> */}
      </div>
      <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              //   onGridReady={onGridReady}
              rowHeight={rowHeight}
              rowData={rowData}
              header=""
              //   rowModelType="infinite"
              //   rowSelection="multiple"
              //   components={components}
            />
          </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-lg-6 col-md-6">
            <div
              className="small-box purple_box"
              style={{ cursor: "pointer" }}
              // onClick={() => navigate("/user/missions?status=inactive")}
            >
              <p>Previous Analytics</p>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                {/* <h3>05</h3> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div
              className="small-box purple_box"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/user/missions?status=inactive")}
            >
              <p>Pending Missions</p>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                <h3>{missionsData?.total}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};
export default connect(mapStateToProps, {})(Dashboard);
