import i18next from "i18next";
import React from "react";
import { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import ConfirmationAlert from "../../../../utility/components/ConfirmationAlert";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import client_img from "../../../../utility/assets/images/client.png";
import axios from "axios";
import {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
} from "../../../../actions/allActions";
import { connect } from "react-redux";
// import { Button } from "react-bootstrap";
import Button from "../../../../utility/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faUserPlus,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from "react-toastify";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import Utility from "../../../../utility/utility";
import ApproveModal from "../../../../utility/components/admin/ApproveModal";
import InfoModal from "../../../../utility/components/admin/InfoModal";
import testImg from "../../../../utility/assets/images/jadon-kelly-Qo_2hhoqC3k-unsplash.jpg";
import WeaponsAddEdit from "../../../../utility/components/admin/WeaponsAddEdit";
import { withNamespaces } from "react-i18next";
import { useParams } from "react-router-dom";
import BackButton from "../../../../utility/components/BackButton";
const baseUrL = process.env.REACT_APP_BASE_URL;
const protocolURL = process.env.REACT_APP_FRONTEND_PROTOCOL;
const frontendDomain = process.env.REACT_APP_FRONTEND_DOMAIN;
const UserwiseDepartment = (props) => {
  const paramsData =useParams()
  const paramArr = paramsData?.slug?.split('&')
  const { userData, loaderStateTrue, loaderStateFalse, loginSuccess, t } = props;
  const authToken = userData.token;
  const [ rowData, setRowData ] = useState([])
  const [clientID, setClientID] = useState("");
  const [modules, setmodules] = useState([InfiniteRowModelModule]);
  // const [subscriptionData, setSubscriptionData] = useState([]);
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
  const fetchDepartmentsData = async ()=>{
    try {
      const response = await axios.get(`${baseUrL}/admin/clients/${paramArr[0]}/users/${paramArr[1]}/departments`, {
        headers: {
          Authorization: authToken
        }
      })
      setRowData(response.data.data)
    } catch (err) {
      console.error(err)
    }
  } 
  const rowHeight = 70;
  const headerHeight = 60;
  const [columnDefs, setColumnDefs] = useState([
    // {
    //   headerName: "Select",
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   width: 50,
    // },
    { field: "name" , width: 685},
    { field: "description" , width: 685 },
  ]);

  const datasource = {
    getRows(params) {
      let url = `${baseUrL}/admin/clients/${paramArr[0]}/users/${paramArr[1]}/departments?`;
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
            // const filteredResponse = response.data.data.map((item)=> item.department)
            const filteredResponse = response.data.data[0].departments
            params.successCallback(
              filteredResponse,
              parseInt(filteredResponse.length)
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
  const resetDataGrid = () => {
    gridApi.setDatasource(datasource);
  };
  const onGridReady = useCallback((params) => {
    setgridparams(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDatasource(datasource);
  });

  const gridOptions = useMemo(
    () => ({
      infiniteInitialRowCount: 1,
      rowBuffer: 0,
      rowModelType: "infinite",
      suppressCellSelection: true,
      suppressHorizontalScroll: true,
    }),
    []
  );
  const [defaultColDef, setdefaultColDef] = useState({
    flex: 1,
    minWidth: 50,
  });

  return (
    <>
      <div className="globaltable_holder">
        <div>
          <div className="table_modal_open">
          <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={client_img}/></span>
             <h3>Users</h3>
            </div>
            {/* <Button className="tablemodal_btn" onClick={addClient}>
              <FontAwesomeIcon icon={faUserPlus} /> {t("addWeapons")}
            </Button> */}
          </div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "calc(100vh - 320px)" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowHeight={rowHeight}
            headerHeight={headerHeight}
            // rowData={rowData}
            rowModelType="infinite"
            onGridReady={onGridReady}
            // components={components}
            cacheBlockSize={10}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  return { userData: globalState.mainReducerData.userData };
};

export default connect(mapStateToProps, {
  loaderStateTrue,
  loaderStateFalse,
  loginSuccess,
})(withNamespaces()(UserwiseDepartment));
