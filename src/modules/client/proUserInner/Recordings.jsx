import React from 'react'
import BackButton from '../../../utility/components/BackButton';
import analytics_img from "../../../utility/assets/images/analytics.png";

const Recordings = () => {
  return (
    <>
      <div className="globaltable_holder">
          <div className="table_modal_open" 
          // style={{width: "25%", borderRadius: "5px", color: "#403f3f", backgroundColor: "#e3e3e3"}}
          >
            <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={analytics_img}/></span>
             <h3>Recordings</h3>
             </div>
          </div>
      </div>
    </>
  )
}

export default Recordings