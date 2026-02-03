import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import './Packages.css';
import servicePackageData from '../assets/service-package.json';

const ServicePackageDetail = ({ serviceId, onBack }) => {
    const [hasChecked, setHasChecked] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [packages, setPackages] = useState([]);
    const [places, setPlaces] = useState([]);
    const [service, setService] = useState(null);

    useEffect(() => {
  setHasChecked(false);

  if (serviceId === null || serviceId === undefined) {
    setService(null);
    setHasChecked(true);
    return;
  }

  const numericId = Number(serviceId);

  const foundService = servicePackageData.services.find(
    s => s.id === numericId
  );

  if (!foundService) {
    setService(null);
    setHasChecked(true);
    return;
  }

  setService(foundService);
  setPlaces(foundService.places || []);

  if (foundService.places?.length > 0) {
    setSelectedPlace(foundService.places[0].placeId);
    setPackages(foundService.places[0].packages || []);
  }

  setHasChecked(true);
}, [serviceId]);


    // ❌ NO loading for static data
    if (!service) {
        return (
            <div className="container" style={{ padding: "40px", textAlign: "center" }}>
                <h3>No packages available</h3>
                <button className="btn btn-secondary" onClick={onBack}>
                    <ChevronLeft size={18} /> Back to Services
                </button>
            </div>
        );
    }

    const handlePlaceChange = (placeId) => {
        setSelectedPlace(placeId);
        const selectedPlaceData = places.find(p => p.placeId === placeId);
        setPackages(selectedPlaceData?.packages || []);
    };

    return (
        <section id="service-packages" className="packages-section">
            <div className="container">

                <div className="service-header">
                    <button className="back-button" onClick={onBack}>
                        <ChevronLeft size={24} />
                        Back to Services
                    </button>
                    <h2 className="section-title">{service.title}</h2>
                </div>

                <div className="filter-section">
                    <label>Select Place:</label>
                    <select
                        value={selectedPlace ?? ''}
                        onChange={(e) => handlePlaceChange(Number(e.target.value))}
                    >
                        {places.map(place => (
                            <option key={place.placeId} value={place.placeId}>
                                {place.placeName}, {place.state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="packages-grid">
                    {packages.map(pkg => (
                        <div key={pkg.id} className={`package-card ${pkg.recommended ? 'recommended' : ''}`}>
                            {pkg.recommended && <div className="tag">Most Popular</div>}
                            <h3>{pkg.title}</h3>
                            <div className="price">₹ {pkg.price.toLocaleString('en-IN')}</div>
                            <ul>
                                {pkg.features.map((f, i) => (
                                    <li key={i}><Check size={16} /> {f}</li>
                                ))}
                            </ul>
                            <button className={`btn ${pkg.recommended ? 'btn-primary' : 'btn-secondary'}`}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ServicePackageDetail;
