import React, { useState } from "react";
import "./PujaModal.css";
import SuccessModal from "./SuccessModal";

const PujaModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pujaType: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen && !showSuccess) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.length < 3)
      newErrors.name = "Please enter a valid name";

    if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit mobile number";

    if (!form.pujaType)
      newErrors.pujaType = "Please select puja type";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setShowSuccess(true);
    onClose();

    setForm({
      name: "",
      phone: "",
      pujaType: "",
      message: ""
    });
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">

            <span className="close-btn" onClick={onClose}>×</span>

            <h2>Request Puja Assistance</h2>

            <form className="puja-form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}

              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              {errors.phone && <p className="error">{errors.phone}</p>}

              <select name="pujaType" value={form.pujaType} onChange={handleChange}>
                <option value="">Select Puja Type</option>
                <option>Pind Daan</option>
                <option>Asthi Visarjan</option>
                <option>Narayan Bali</option>
                <option>Mahamrityunjaya Puja</option>
                <option>Other</option>
              </select>
              {errors.pujaType && <p className="error">{errors.pujaType}</p>}

              <textarea
                rows="4"
                name="message"
                placeholder="Mention date, place or requirement (optional)"
                value={form.message}
                onChange={handleChange}
              />

              <button type="submit" className="submit-btn">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default PujaModal;
