import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../utility/components/Button";
import axios from "axios";
import BackButton from "../../../utility/components/BackButton";
import analytics_img from "../../../utility/assets/images/analytics.png";
import { useDebounce } from "use-debounce";
const baseUrL = process.env.REACT_APP_BASE_URL;
const ProUsersDepartment = (props) => {
  const { userData } = props;
  const authToken = userData.token;
  const paramsData = useParams();
  const [proUsersData, setProUsersData] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 300);
  const departmentsObjData = proUsersData?.find((item) => {
    return item.departments;
  });
 

  const filteredDepartments = departmentsObjData?.departments?.filter(department => 
    department.name.toLowerCase().includes(debouncedFilter.toLowerCase())
  );
  useEffect(() => {
    fetchUsersData();
  }, [debouncedFilter]);
  const fetchUsersData = async () => {
    try {
      const response = await axios.get(
        `${baseUrL}/clients/departments/${paramsData?.slug}/pro-users`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      // console.log("res=>", response.data)
      setProUsersData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", width: "685" },

    // {
    //   field: "Action", width: "685",
    //   cellRenderer: (params) => {
    //     if (params.data) {
    //       return (
    //         <div>
    //           <Button
    //             onClick={(e) => editRoles(e, params)}
    //             className="action_button edt_btn"
    //           >
    //             <FontAwesomeIcon icon={faPencil} />
    //           </Button>
    //           <Button
    //             onClick={(e) => deleteDepartment(e, params)}
    //             className="action_button del_btn"
    //           >
    //             <FontAwesomeIcon icon={faTrashCan} />
    //           </Button>
    //         </div>
    //       );
    //     } else {
    //       return null;
    //     }
    //   },
    // },
  ]);
  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
        <div className="back_btn_caption_hold">
          <BackButton className={"back-button"} />
          <span className="icn_bk_btn">
            <img src={analytics_img} />
          </span>
          <h3>Departments</h3>
        </div>
        {/* <Button className="tablemodal_btn" 
        onClick={addProUser}
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Add Pro User
        </Button> */}
        <input
          className="dep_search"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter data..."
        />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          //   onGridReady={onGridReady}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowData={filteredDepartments}
          //   rowModelType="infinite"
          // rowSelection="multiple"
          //   cacheBlockSize={10}
          //   components={components}
          //   onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};
export default connect(mapStateToProps, {})(ProUsersDepartment);
