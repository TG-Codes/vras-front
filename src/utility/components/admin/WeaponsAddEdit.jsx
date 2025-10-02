import React, { useState } from "react";
import ModalDialog from "../ModalDialog";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "../TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth, getDate } from "date-fns";

// import Dropdown from "./Dropdown";

const WeaponsAddEdit = ({
  formData,
  formDataError,
  showModal,
  handleInputChange,
  handleSubmit,
  closeModal,
  headerText,
  subscriptionData,
  submitButtonText,
  formType,
  editObjWeapon,
  handleChangeSubscription,
  selectedYear,
  handleYearChange,
  currentYear,
}) => {

  return (
    <ModalDialog open={showModal} onClose={closeModal} size="lg">
      <ModalDialog.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <div className="form_holder">
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="name"
                  label="Name:*"
                  placeholder=""
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formDataError.name}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="generation"
                  label="Generation:"
                  placeholder=""
                  value={formData.generation}
                  onChange={handleInputChange}
                  error={formDataError.generation}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="type"
                  label="Weapon Type:"
                  placeholder=""
                  value={formData.type}
                  onChange={handleInputChange}
                  error={formDataError.type}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="description"
                  label="Description:"
                  placeholder=""
                  value={formData.description}
                  onChange={handleInputChange}
                  error={formDataError.description}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="accuracy"
                  label="Accuracy:"
                  placeholder=""
                  value={formData.accuracy}
                  onChange={handleInputChange}
                  error={formDataError.accuracy}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="reloadTime"
                  label="Reload Time:"
                  placeholder=""
                  value={formData.reloadTime}
                  onChange={handleInputChange}
                  error={formDataError.reloadTime}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="damage"
                  label="Damage:"
                  placeholder=""
                  value={formData.damage}
                  onChange={handleInputChange}
                  error={formDataError.damage}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="fireRate"
                  label="Fire Rate:"
                  placeholder=""
                  value={formData.fireRate}
                  onChange={handleInputChange}
                  error={formDataError.fireRate}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="recoil"
                  label="Recoil:"
                  placeholder=""
                  value={formData.recoil}
                  onChange={handleInputChange}
                  error={formDataError.recoil}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="magazineCapacity"
                  label="Magazine Capacity:"
                  placeholder=""
                  value={formData.magazineCapacity}
                  onChange={handleInputChange}
                  error={formDataError.magazineCapacity}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="bulletType"
                  label="Bullet Type:"
                  placeholder=""
                  value={formData.bulletType}
                  onChange={handleInputChange}
                  error={formDataError.bulletType}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="bulletCount"
                  label="Bullet Count:"
                  placeholder=""
                  value={formData.bulletCount}
                  onChange={handleInputChange}
                  error={formDataError.bulletCount}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="grenadeType"
                  label="Grenade Type:"
                  placeholder=""
                  value={formData.grenadeType}
                  onChange={handleInputChange}
                  error={formDataError.grenadeType}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="grenadeCount"
                  label="Grenade Count:"
                  placeholder=""
                  value={formData.grenadeCount}
                  onChange={handleInputChange}
                  error={formDataError.grenadeCount}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="weight"
                  label="Weight:"
                  placeholder=""
                  value={formData.weight}
                  onChange={handleInputChange}
                  error={formDataError.weight}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="length"
                  label="Length:"
                  placeholder=""
                  value={formData.length}
                  onChange={handleInputChange}
                  error={formDataError.length}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="height"
                  label="Height:"
                  placeholder=""
                  value={formData.height}
                  onChange={handleInputChange}
                  error={formDataError.height}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="manufacturer"
                  label="Manufacturer:"
                  placeholder=""
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  error={formDataError.manufacturer}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="countryOfOrigin"
                  label="Country of Origin:"
                  placeholder=""
                  value={formData.countryOfOrigin}
                  onChange={handleInputChange}
                  error={formDataError.countryOfOrigin}
                />
              </div>
              {/* <div className="col-md-6">
                <TextInput
                  type="number"
                  name="yearOfManufacture"
                  label="Year of Manufacture:"
                  placeholder=""
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  error={formDataError.yearOfManufacture}
                />
              </div> */}
              <div className="col-md-6">
                <label>Year of Manufacture:</label>
                <DatePicker
                  selected={selectedYear}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                  yearItemNumber={9}
                  minDate={new Date("1900")}
                  maxDate={new Date(currentYear, 11, 31)} // Set max date to the end of the current year
                />
                {/* {selectedYear && <p>Selected Year: {getYear(selectedYear)}</p>} */}
              </div>
              <div className="col-md-6">
                <TextInput
                  type="text"
                  name="notes"
                  label="Notes:"
                  placeholder=""
                  value={formData.notes}
                  onChange={handleInputChange}
                  error={formDataError.notes}
                />
              </div>
            </div>
          </div>
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default WeaponsAddEdit;
