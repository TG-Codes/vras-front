import React from 'react'
import BackButton from '../../../utility/components/BackButton'
import mission_img from "../../../utility/assets/images/mission.png";

const PendingMissions = () => {
  return (
    <div className="globaltable_holder">
      <div className="table_modal_open">
            <div className="back_btn_caption_hold">
            <BackButton className={"back-button"} />
              <span className="icn_bk_btn"><img src={mission_img}/></span>
             <h3>Pending Missions</h3>
            </div>
        {/* <Button className="tablemodal_btn" onClick={addMission}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add Mission
        </Button> */}
      </div>
      {/* <MissionAddEdit
        showModal={showModal}
        closeModal={closeModal}
        formData={formData}
        formDataError={formDataError}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        headerText={roleAddEditModalProps.headerText}
        submitButtonText={roleAddEditModalProps.submitButtonText}
        formType={roleAddEditModalProps.formType}
        handleDifficultyChange={handleDifficultyChange}
        difficultyValue={difficultyValue}
        statusOptions={statusOptions}
        handleChangeStatus={handleChangeStatus}
      />

      <ConfirmationAlert
        showAdminModal={showAdminModal}
        closeConfirmationAlert={closeConfirmationAlert}
        confirm={confrim}
        confirmationText={"delete this Mission"}
        headerText={"Delete?"}
      /> */}
      {/* <div
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
          rowSelection="multiple"
          components={components}
        />
      </div> */}
    </div>
  )
}

export default PendingMissions