import "./TempleModal.css";


const TempleModal = ({ temple, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <span className="close-btn" onClick={onClose}>×</span>

        <img src={temple.image} alt={temple.name} />

        <h2>{temple.name}</h2>
        <p>Location: {temple.location}</p>

        <h4>Available Pujas</h4>
        <ul>
          {temple.pujas.map(p => <li key={p}>{p}</li>)}
        </ul>

        <h3>Price: ₹{temple.price}</h3>

        <button className="submit-btn">
          Request Puja Assistance
        </button>

      </div>
    </div>
  );
};

export default TempleModal;
