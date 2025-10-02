import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { withNamespaces } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { P } from "../../../utility/components/Typography";
import { connect } from "react-redux";
import axios from "axios";
import BackButton from "../../../utility/components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import client_img from "../../../utility/assets/images/client.png";
const baseUrL = process.env.REACT_APP_BASE_URL;
const imageUrL = process.env.REACT_APP_IMAGE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const ProUserDetails = (props) => {
  const { userData } = props;
  const authToken = userData.token;
  const paramsData = useParams();
  const [proUsers, setProUsers] = useState([]);
 const [filteredDepartmentsData, setFilteredDepartmentsData] = useState([])
 console.log("filteredDepartmentsData ", filteredDepartmentsData)
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Example 1",
      description: "Demo Desc",
    },
    {
      id: 2,
      name: "Example 2",
      description: "Demo Desc",
    },
    {
      id: 3,
      name: "Example 3",
      description: "Demo Desc",
    },
    {
      id: 4,
      name: "test",
      description: "Demo Desc",
    },
  ]);
  const rowHeight = 70;
  const headerHeight = 60;
  const proUserColumnDefs = [{ field: "name" }];
  const [filter, setFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 300); // 300ms debounce
  const [deptDebouncedFilter] = useDebounce(deptFilter, 300); // 300ms debounce

  const [filteredData, setFilteredData] = useState(proUsers?.departments);
  const [deptFilteredData, setDeptFilteredData] = useState(departments)
  useEffect(() => {
    fetchUserData();
    // if (debouncedFilter) {
    //   setFilteredData(
    //     proUsers.filter(item =>
    //       Object.values(item).some(value =>
    //         value.toString().toLowerCase().includes(debouncedFilter.toLowerCase())
    //       )
    //     )
    //   );
    // } else {
    //   setFilteredData(proUsers);
    // }
    // if (deptDebouncedFilter) {
    //   setDeptFilteredData(
    //     departments.filter(item =>
    //       Object.values(item).some(value =>
    //         value.toString().toLowerCase().includes(deptDebouncedFilter.toLowerCase())
    //       )
    //     )
    //   );
    // } else {
    //   setDeptFilteredData(departments)
    // }
  //   if (Array.isArray(proUsers)) {
  //     console.log("ifBlock")
  //     if (proUsers[0]?.departments) {
  //       setFilteredDepartmentsData(proUsers[0]?.departments)
  //     } else {
  //       setFilteredDepartmentsData([])
  //     }
  // } else {
  //   setFilteredDepartmentsData([])
  // }
  }, []);
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrL}/clients/departments/${paramsData?.slug}/pro-users`,
        {
          // params: {id},
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.data.success) {

        setProUsers(response.data.data);


      }
    } catch (error) {
      console.error(error);
    }
  };
  let departmentGrid;
  if (Array.isArray(proUsers)) {
    
    if (proUsers[0]?.departments) {
      console.log("ifBlock", proUsers[0]?.departments)
      departmentGrid=proUsers[0]?.departments
    } else {
      departmentGrid=[]
    }
} else {
  departmentGrid=[]
}
  return (
    <>
      {/* <h3>{proUsers?.fullName}</h3> */}
      <div className="client-details-holder">
      <div className="container-fluid">
        <div className="details_pg_head table_modal_open">
        <div className="back_btn_caption_hold">
           <BackButton className={"back-button"}/>
           <span className="icn_bk_btn"><img src={client_img}/></span>
           <h3>Pro users Details</h3>
         </div>
           {/* <button className="tablemodal_btn"  onClick={(e) => editClient(e,slug)}>
           <FontAwesomeIcon icon={faUserPlus} />
           Edit Client
           </button> */}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-6 col-md-12">
            <Link
              className="small-box purple_box"
              to={userData && userData.role == "admin" ? `/admin/personalized-analytics/${paramsData?.slug}` : `/personalized-analytics/${paramsData?.slug}`}
            >
              <P>Personalised Analytics</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                {/* <h3>0</h3> */}
              </div>
            </Link>
          </div>
          <div className="col-lg-6 col-md-12">
            <Link
              className="small-box purple_box"
              to={userData && userData.role == "admin" ? `/admin/recordings/${paramsData?.slug}` : `/recordings/${paramsData?.slug}`}
            >
              <P>Recordings</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                {/* <h3>0</h3> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="globaltable_holder double_table">
        <div>
          <div className="table_modal_open">
            <h3>Departments</h3>

          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={proUserColumnDefs}
              rowData={departmentGrid}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              rowSelection="multiple"
            />
          </div>
        </div>
        <div>
          <div className="col-lg-12 col-md-12">
            <Link
              className="small-box purple_box"
              to={userData && userData.role == "admin" ? `/admin/pending-mission/${paramsData?.slug}` : `/pending-mission/${paramsData?.slug}`}
            >
              <P>Pending Missions</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                {/* <h3>2</h3> */}
              </div>
            </Link>

          </div>

        </div>
      </div>
      </div>
    </>
  );
};

// export default ProUserDetails;
const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, {
})(withNamespaces()(ProUserDetails));