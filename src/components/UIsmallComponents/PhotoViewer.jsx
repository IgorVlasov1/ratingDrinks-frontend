import React from "react";
import "./photoviewer.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
const PhotoViewer = ({ imageUrl, onClose }) => {
  return (
    <div className="photo-viewer">
      <div className="photo-viewer__overlay" onClick={onClose}></div>
      <div className="photo-viewer__container">
        <img src={imageUrl} alt="Large photo" />
        <AiOutlineCloseCircle
          className="photo-viewer__close-btn"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PhotoViewer;
