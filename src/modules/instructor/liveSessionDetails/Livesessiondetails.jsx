import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useParams } from 'react-router-dom';
import { P } from '../../../utility/components/Typography';
import { connect } from 'react-redux';
import axios from 'axios';
import BackButton from '../../../utility/components/BackButton';
import deployed_code_account from "../../../utility/assets/images/deployed_code_account.png"

const baseUrL = process.env.REACT_APP_BASE_URL
const Livesessiondetails = (props) => {
  const paramsData = useParams()
  const { userData } = props;
  const [liveSessionDetails, setLiveSessionDetails] = useState([])
  useEffect(() => {
    fetchLiveSessionDetails()
  }, [])
  const authToken = userData.token
  const rowHeight = 70;
  const headerHeight = 60;
  const proUserColumnDefs = [{ field: "name", width: 685 }, { field: 'description', width: 685 }];

  const fetchLiveSessionDetails = async () => {
    try {
      const response = await axios.get(`${baseUrL}/instructors/live-sessions/${paramsData.slug}`, {
        headers: {
          Authorization: authToken
        }
      })
      setLiveSessionDetails(response.data.data.users)

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="container-fluid">
          <div className="details_pg_head table_modal_open">
            <div className="back_btn_caption_hold">
              <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={deployed_code_account} /></span>
              <h3>Live Session Details</h3>
            </div>
          </div>
          </div>
          <div className="row">

            <div className="col-lg-6 col-md-12">
              <Link
                className="small-box purple_box"
                to={`/instructor/views`}
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
                to={`/instructor/analytics`}
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
              rowData={liveSessionDetails}
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
  )
}

const mapStateToProps = (globalState) => {
  return {
    userData: globalState.mainReducerData.userData
  }
}
export default connect(mapStateToProps, {})(Livesessiondetails)
