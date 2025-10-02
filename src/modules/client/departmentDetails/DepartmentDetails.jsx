import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { P } from "../../../utility/components/Typography";
import axios from "axios";
import { loaderStateFalse, loaderStateTrue, loginSuccess } from "../../../actions/allActions";
import proUserImg from "../../../utility/assets/images/prousericon.png";
import departmentImg from "../../../utility/assets/images/departmenticon.png";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import BackButton from "../../../utility/components/BackButton";
import deployed_code_account from "../../../utility/assets/images/deployed_code_account.png"
const baseUrL = process.env.REACT_APP_BASE_URL
const DepartmentDetails = (props) => {
  const {userData}=props;
  const authToken = userData.token
  const paramsData = useParams();
  const navigate = useNavigate()
  const [singleDepartmentData, setSIngleDepartmentData] = useState([])
  console.log("singleDepartmentData=>, ", singleDepartmentData)
  const [proUsers, setProUsers] = useState([]);
  const mappedProUsers = proUsers?.map((item)=> {
    return {
      name: item.user.name,
      id: item.userId
    }
  })

  // const filteredProUsers = proUsers?.map((item)=>{
  //   return item.users
  // })
  // console.log("filteredProUsers ", filteredProUsers)
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
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/clients/departments?`;
      const { startRow, endRow, sortModel } = params;
  
      // Add debounced filter to URL if it's not empty
  
      // Add sorting parameters if sortModel exists
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `&_sort=${colId}&_order=${sort}`;
      }

      const pageSize = endRow - startRow;
      const pageNumber = Math.floor(startRow / pageSize) + 1;
  
      // Add pagination parameters
      url += `page=${pageNumber}&length=${pageSize}`;

      if (deptDebouncedFilter) {
        url += `&keywords=${encodeURIComponent(deptDebouncedFilter)}`;
      }
  
      // Perform the API request
      axios.get(url, {
        headers: {
          Authorization: authToken,
        },
      })
      .then(response => {
        params.successCallback(
          response.data.data.departments,
          parseInt(response.data.data.total)
        );
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        params.failCallback();
      });
    },
  };
  const resetDataGrid = () => {
    if (gridApi && datasource) {
      gridApi.setDatasource(datasource);
    }
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });
  const rowHeight = 70;
  const headerHeight = 60;
  const proUserColumnDefs = [
    { field: "name" }, 
    // { field: "description" }
  ];
  const [filter, setFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 300); // 300ms debounce
  const [deptDebouncedFilter] = useDebounce(deptFilter, 300); // 300ms debounce

  const [filteredData, setFilteredData] = useState(proUsers);
  const [deptFilteredData, setDeptFilteredData] = useState(departments);
  useEffect(()=>{
    fetchSingleDepartment()
    fetchdepartmentwiseUsers()
  },[])
  useEffect(()=>{
    fetchdepartmentwiseUsers()
  },[debouncedFilter])
  useEffect(() => {
    if (debouncedFilter) {
      setFilteredData(
        mappedProUsers.filter((item) =>
          Object.values(item).some((value) =>
            value
              .toString()
              .toLowerCase()
              .includes(debouncedFilter.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(mappedProUsers);
    }
    if (deptDebouncedFilter) {
      setDeptFilteredData(
        departments.filter((item) =>
          Object.values(item).some((value) =>
            value
              .toString()
              .toLowerCase()
              .includes(deptDebouncedFilter.toLowerCase())
          )
        )
      );
    } else {
      setDeptFilteredData(departments);
    }
  }, [debouncedFilter, deptDebouncedFilter, proUsers, departments]);
  useEffect(()=>{
    resetDataGrid()
  },[deptDebouncedFilter])
  const fetchSingleDepartment = async ()=>{
    try {
      const response = await axios.get(`${baseUrL}/clients/departments/show/${paramsData?.slug}`, {
        headers: {
          Authorization: authToken
        }
      })
      setSIngleDepartmentData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchdepartmentwiseUsers = async ()=> {
    let url = `${baseUrL}/clients/departments/pro-users/${paramsData?.slug}`
    if (debouncedFilter){
      url+= `?keywords=${encodeURIComponent(debouncedFilter)}`
    }
    try{
      const response = await axios.get(url, {
        headers: {
          Authorization: authToken
        }
      })
      setProUsers(response.data.data)
    } catch (err){
      console.log(err)
    }
  }
const onRowClick = (e, params)=> {
  // console.log("e.data.id ", e.data)
  navigate(`/pro-userwise-departments/${e.data.id}`)
}
  return (
    <>
    <div className="client-details-holder">
    {/* <div className="container-fluid">
        <div className="details_pg_head table_modal_open">
        <div className="back_btn_caption_hold">
           <BackButton className={"back-button"}/>
           <span className="icn_bk_btn"><img src={deployed_code_account}/></span>
           <h3>department Details</h3>
         </div>
        </div>
      </div> */}
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <Link
              className="small-box purple_box"
              to={`/personalized-analytics/1`}
            >
              <P>Environment</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                <h3>2</h3>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link
              className="small-box purple_box"
              to={`/personalized-analytics/1`}
            >
              <P>Scenario</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                <h3>2</h3>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link
              className="small-box purple_box"
              to={`/personalized-analytics/1`}
            >
              <P>Analytics</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                <h3>2</h3>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link className="small-box purple_box" to={`/pending-mission/1`}>
              <P>Recordings</P>
              <div className="inner">
                <span>
                  <i className="fa-solid fa-users"></i>
                </span>
                <h3>2</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Link
            className="small-box purple_box"
            to={`/personalized-analytics/1`}>
            <P>Online Activity</P>
            <div className="inner">
              <span>
                <i className="fa-solid fa-users"></i>
              </span>
              <h3>2</h3>
            </div>
          </Link>
        </div>
        <div className="col-lg-6 col-md-12">
          <Link
            className="small-box purple_box"
            to={`/personalized-analytics/1`}
          >
            <P>Relevant Informations</P>
            <div className="inner">
              <span>
                <i className="fa-solid fa-users"></i>
              </span>
              <h3>2</h3>
            </div>
          </Link>
        </div>
      </div> */}
      <div className="globaltable_holder double_table">
        <div>
          <div className="table_modal_open">
            <h3>                 
              <span style={{marginRight:"10px"}}>
                 <img src={proUserImg} />
              </span>
              Pro Users
            </h3>
            <input
            className="dep_search"
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="pro users"
          />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={proUserColumnDefs}
              // onGridReady={onGridReady}
              rowData={mappedProUsers}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              // rowSelection="multiple"
              // rowModelType="infinite"
              cacheBlockSize={10}
              onRowClicked={onRowClick}
            />
          </div>
        </div>
        <div>
          <div className="table_modal_open">
            <h3>    
              <span style={{marginRight:"10px"}}>
                <img src={departmentImg} />
                </span>Departments
            </h3>
            <input
            className="dep_search"
            type="text"
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            placeholder="departments"
            />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 320px)" }}
          >
            <AgGridReact
              columnDefs={proUserColumnDefs}
              onGridReady={onGridReady}
              // rowData={filteredData}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              rowModelType="infinite"
              cacheBlockSize={10}
              components={components}
              // rowSelection="multiple"
            />
          </div>
        </div>
        <div></div>
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return {userData: globalState.mainReducerData.userData};
};

export default connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, loginSuccess })(
  withNamespaces()(DepartmentDetails)
);
// export default DepartmentDetails;
