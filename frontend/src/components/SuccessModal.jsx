import React from "react";
import "./PujaModal.css";

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box success-box">

        <h2>🙏 Thank You</h2>

        <p className="success-text">
          Your request has been received successfully.
          <br />
          Our team will contact you shortly to assist you with the puja.
        </p>

        <button className="submit-btn" onClick={onClose}>
          Okay
        </button>

      </div>
    </div>
  );
};

export default SuccessModal;
