import React, { useCallback, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import mission_img from "../../../utility/assets/images/mission.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import BackButton from "../../../utility/components/BackButton";
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const baseUrL = process.env.REACT_APP_BASE_URL;
const MissionDetails = (props) => {
const { userData } = props;
const authToken = userData.token
const paramsData = useParams()
  const rowHeight = 70;
  const headerHeight = 60;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridparams, setgridparams] = useState(null);
  const [components, setcomponents] = useState({
    loadingRenderer: (params) => {
      if (params.value !== undefined) {
        return params.value;
      } else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
      }
    },
  });
  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/clients/missions/show/${paramsData?.slug}?`;
      const { startRow, endRow, sortModel } = params;
      try {
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }

        const pageSize = endRow - startRow;
        const pageNumber = Math.floor(startRow / pageSize) + 1;

        url += `page=${pageNumber}&length=${pageSize}`;

        const response = axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        });
        response
          .then((response) => {
            console.log("mission details ", response.data.data)
            // console.log("mission details Total data", response)
            params.successCallback(
              [response.data.data],
              response.data.data.total
            );
          })
          .catch((error) => {
            console.log(error);
            params.failCallback();
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });
  const [columnDefs, setColumnDefs] = useState([
    { field: "name"},
    { field: "description"},
    { field: "environment"},
    { field: "scenario"},
    { field: "department"},
    { field: "startAt"}
  ]);
  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
            <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={mission_img}/></span>
             <h3>Mission Details</h3>
            </div>
        {/* <Button className="tablemodal_btn" onClick={addMission}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add Mission
        </Button> */}
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 320px)" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          // rowData={rowData}
          rowModelType="infinite"
          // rowSelection="multiple"
          components={components}
          cacheBlockSize={10}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (globalState)=> {
  return {
    userData: globalState.mainReducerData.userData
  }
}
export default connect(mapStateToProps,{})(MissionDetails)
