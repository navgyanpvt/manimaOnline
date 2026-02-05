import React, { useState } from "react";
import templeData from "../assets/special-puja-temple.json";
import TempleModal from "./TempleModal";
import PujaModal from "./PujaModal";
import "./SpecialPujaTemples.css";

const SpecialPujaTemples = ({ onBack }) => {
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showPujaModal, setShowPujaModal] = useState(false);

  const filteredTemples = templeData.filter(t =>
    (!location || t.location === location) &&
    (!purpose || t.availableFor.includes(purpose))
  );

  return (
    <section className="special-puja">

      {/* Back Button */}
      <div className="service-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Services
        </button>
      </div>

      <h2>Special Puja Temples</h2>

      {/* Filters */}
      <div className="filters">
        <select onChange={e => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Puri">Puri</option>
          <option value="Cuttack">Cuttack</option>
          <option value="Dhenkanal">Dhenkanal</option>
        </select>

        <select onChange={e => setPurpose(e.target.value)}>
          <option value="">All Occasions</option>
          <option>Birthday</option>
          <option>Marriage</option>
          <option>Anniversary</option>
          <option>Promotion</option>
        </select>
      </div>

      {/* Temple Cards */}
      <div className="temple-grid">
        {filteredTemples.map(temple => (
          <div
            key={temple.id}
            className="temple-card"
            onClick={() => setSelectedTemple(temple)}
          >
            <img src={temple.image} alt={temple.name} />
            <h4>{temple.name}</h4>
            <p>{temple.location}</p>
            <span>₹{temple.price}</span>
          </div>
        ))}
      </div>

      {/* Temple Modal */}
      {selectedTemple && (
        <TempleModal
          temple={selectedTemple}
          onClose={() => setSelectedTemple(null)}
          onRequestPuja={() => {
            setSelectedTemple(null);
            setShowPujaModal(true);
          }}
        />
      )}

      {/* Puja Modal */}
      <PujaModal
        isOpen={showPujaModal}
        onClose={() => setShowPujaModal(false)}
      />

    </section>
  );
};

export default SpecialPujaTemples;
