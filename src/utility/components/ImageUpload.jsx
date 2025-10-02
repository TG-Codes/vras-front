import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import noImage from "../assets/images/select_image.png"

const ImageUpload = ({handleImageChange, label, selectedImage, removeImage, handleClick, defaultImage}) => {
  return (
    <div>
      <label className="image-upload">
        {selectedImage ? (
          <div className="image-container">
            <button className="remove-image" onClick={removeImage}><FontAwesomeIcon icon={faTimes} /></button>
            <img src={selectedImage} alt="Selected" className="preview-image" />
          </div>
        ) : (
          <div className="image-container" onClick={handleClick}>
            <div className="change-image"><FontAwesomeIcon icon={faTimes} /></div>
            <img src={defaultImage} alt="Selected" className="preview-image" />
          </div>
          // <div className="image-container">
          //   <button className="remove-image" onClick={handleClick}><FontAwesomeIcon icon={faTimes} /></button>
          //   <img src={defaultImage} alt="Selected" className="preview-image" />
          // </div>
        )}
        <input id="fileInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
      </label>
    </div>
  );
}

export default ImageUpload