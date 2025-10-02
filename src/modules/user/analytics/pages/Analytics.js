import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BackButton from "../../../../utility/components/BackButton";
import analytics_img from "../../../../utility/assets/images/analytics.png";
import noData_img from "../../../../utility/assets/images/nodataimg.jpg";

ChartJS.register(ArcElement, Tooltip, Legend);
const baseUrL = process.env.REACT_APP_BASE_URL;

const UserAnalyticsData = (props) => {
  const {userData}= props;
  const paramsData = useParams();
  console.log("params", paramsData);

  const navigate = useNavigate()
  const authToken = userData.token;
  const [analyticsData, setAnalyticsData] = useState({});
  
  useEffect(()=>{
    fetchMissionData();
  },[]);

  const fetchMissionData = async () => {
    try {
      const response = await axios.get(`${baseUrL}/users/analytics-data`, {
        headers: {
          Authorization: authToken
        }
      });
      const missionData = response.data.data.totalData;
      setAnalyticsData(missionData);
      console.log("Analytics data:", missionData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChartClick = () => {
    if (paramsData?.slug) {
      navigate(`/mission-details/${paramsData?.slug}`);
    }
  };

  const userMissionsData = {
    labels: [
      'Assault Time', 'Total Terrorist', 'Bullets Fired', 'Bullets on Terrorist', 
      'Bullets on Crowd', 'Accuracy', 'Casualties', 'Survived', 
      'Confirmed Kills', 'Players Damage', 'Response Time'
    ],
    datasets: [{
      label: 'Mission Data',
      data: [
        analyticsData.assaultTime ? parseFloat(analyticsData.assaultTime) : 0, 
        analyticsData.totalTerrorist || 0, 
        analyticsData.bulletsFired || 0, 
        analyticsData.bulletsOnTerrorist || 0,
        analyticsData.bulletsOnCrowd || 0, 
        analyticsData.accuracy || 0, 
        analyticsData.casualities || 0, 
        analyticsData.survived || 0,
        analyticsData.confirmedKills || 0, 
        analyticsData.playersDamage || 0, 
        analyticsData.responseTime ? parseFloat(analyticsData.responseTime) : 0
      ],
      backgroundColor: [
        'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 
        'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)',
        'rgb(255, 99, 71)', 'rgb(0, 255, 127)', 'rgb(70, 130, 180)', 
        'rgb(238, 130, 238)', 'rgb(245, 222, 179)'
      ],
      hoverOffset: 4
    }]
  };

  return (
      <div className="globaltable_holder">
        {/* Other elements */}
        <div className="table_modal_open" 
          // style={{width: "25%", borderRadius: "5px", color: "#403f3f", backgroundColor: "#e3e3e3"}}
          >
            <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={analytics_img}/></span>
             <h3>Personalised Analytics</h3>
             </div>
          </div>
          <div className="pieChart">
            {Object.keys(analyticsData).length > 0 ? (
              <Doughnut data={userMissionsData} onClick={handleChartClick} />
            ) : (
              <div className="noData">
              <img src={noData_img} alt="No Data Image" srcset="" />
            </div>
            )}
          </div>
    
      </div>
  );
};

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData,
  };
};

export default connect(mapStateToProps, {})(UserAnalyticsData);
