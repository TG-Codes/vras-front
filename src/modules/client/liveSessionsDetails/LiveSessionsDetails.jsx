import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Link, useParams } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { P } from "../../../utility/components/Typography";
import { connect } from "react-redux";
import axios from "axios";
import BackButton from "../../../utility/components/BackButton";
import deployed_code_account from "../../../utility/assets/images/deployed_code_account.png"
const baseUrL = process.env.REACT_APP_BASE_URL
const LiveSessionDetails = (props) => {
  const{ userData } = props;
  const authToken = userData.token
  const paramsData = useParams();
  const [ liveSessionDetails , setLiveSessionDetails] = useState([])
  console.log("liveSessionDetails ", liveSessionDetails)
  const [proUsers, setProUsers] = useState([
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
  ]);
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
  useEffect(()=>{
    fetchLiveSessionDetails()
},[])
  const fetchLiveSessionDetails = async ()=> {
    try {
        const response = await axios.get(`${baseUrL}/clients/live-sessions/show/${paramsData.slug}`, {
            headers: {
                Authorization: authToken
            }
        })
        setLiveSessionDetails(response.data.data)

    } catch (err) {
        console.log(err)
    }
}
  const rowHeight = 70;
  const headerHeight = 60;
  const proUserColumnDefs = [{ field: "name" },
    {
      headerName: "No. of Departments",
      valueGetter: (params) =>
        params.data && params.data.departments
          ? params.data.departments.length
          : null,
    },
  ];
  const [filter, setFilter] = useState('');
  const [deptFilter, setDeptFilter]= useState('')
  const [debouncedFilter] = useDebounce(filter, 300); // 300ms debounce
  const [deptDebouncedFilter] = useDebounce(deptFilter, 300); // 300ms debounce

  const [filteredData, setFilteredData] = useState(liveSessionDetails?.users);
  const [deptFilteredData, setDeptFilteredData] = useState(departments)
  useEffect(() => {
    if (debouncedFilter) {
      setFilteredData(
        liveSessionDetails?.users.filter(item =>
          Object.values(item).some(value =>
            value.toString().toLowerCase().includes(debouncedFilter.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(liveSessionDetails?.users);
    }
    if (deptDebouncedFilter) {
      setDeptFilteredData(
        departments.filter(item =>
          Object.values(item).some(value =>
            value.toString().toLowerCase().includes(deptDebouncedFilter.toLowerCase())
          )
        )
      );
    } else {
      setDeptFilteredData(departments)
    }
  }, [debouncedFilter, deptDebouncedFilter, proUsers, departments, liveSessionDetails?.users]);
  return (
    <>
      <div className="container-fluid">
      <div className="details_pg_head table_modal_open">
        <div className="back_btn_caption_hold">
           <BackButton className={"back-button"}/>
           <span className="icn_bk_btn"><img src={deployed_code_account}/></span>
           <h3>Live Session Details</h3>
         </div>
           {/* <button className="tablemodal_btn"  onClick={(e) => editClient(e,slug)}>
           <FontAwesomeIcon icon={faUserPlus} />
           Edit Client
           </button> */}
        </div>
        <div className="row">
         
          <div className="col-lg-6 col-md-12">
            <Link
              className="small-box purple_box"
              to={`#`}
            >
              <P>Views</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                {/* <h3>2</h3> */}
              </div>
            </Link>
          </div>
          <div className="col-lg-6 col-md-12">
            <Link
              className="small-box purple_box"
              to={`#`}
            >
              <P>Analytics</P>
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
      <div className="globaltable_holder">
        <div>
          <div className="table_modal_open">
            <h3>Trainees</h3>
            
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={proUserColumnDefs}
              // onGridReady={onGridReady}
              rowData={filteredData}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              rowSelection="multiple"
            />
          </div>
        </div>
        <div>
         
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState)=> {
  return {
    userData: globalState.mainReducerData.userData
  }
}
export default connect(mapStateToProps, {})(LiveSessionDetails);
