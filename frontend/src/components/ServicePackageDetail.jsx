import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import './Packages.css';
import servicePackageData from '../assets/service-package.json';

const ServicePackageDetail = ({ serviceId, onBack }) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [packages, setPackages] = useState([]);
    const [places, setPlaces] = useState([]);
    const [service, setService] = useState(null);

    useEffect(() => {
        // Find the service from the data
        const foundService = servicePackageData.services.find(s => s.id === parseInt(serviceId));
        if (foundService) {
            setService(foundService);
            setPlaces(foundService.places);
            // Set the first place as default
            if (foundService.places.length > 0) {
                setSelectedPlace(foundService.places[0].placeId);
                setPackages(foundService.places[0].packages);
            }
        }
    }, [serviceId]);

    const handlePlaceChange = (placeId) => {
        setSelectedPlace(placeId);
        const selectedPlaceData = places.find(p => p.placeId === placeId);
        if (selectedPlaceData) {
            setPackages(selectedPlaceData.packages);
        }
    };

    if (!service) {
        return <div className="container">Loading...</div>;
    }

    return (
        <section id="service-packages" className="packages-section">
            <div className="container">
                {/* Header with Back Button */}
                <div className="service-header">
                    <button className="back-button" onClick={onBack}>
                        <ChevronLeft size={24} />
                        Back to Services
                    </button>
                    <h2 className="section-title">{service.title}</h2>
                </div>

                {/* Filter Section */}
                <div className="filter-section">
                    <div className="filter-group">
                        <label htmlFor="place-filter" className="filter-label">Select Place:</label>
                        <select
                            id="place-filter"
                            value={selectedPlace || ''}
                            onChange={(e) => handlePlaceChange(parseInt(e.target.value))}
                            className="filter-select"
                        >
                            {places.map(place => (
                                <option key={place.placeId} value={place.placeId}>
                                    {place.placeName}, {place.state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <div key={pkg.id} className={`package-card ${pkg.recommended ? 'recommended' : ''}`}>
                            {pkg.recommended && <div className="tag">Most Popular</div>}
                            <h3>{pkg.title}</h3>
                            <div className="price">₹ {pkg.price.toLocaleString('en-IN')}</div>
                            <ul className="features">
                                {pkg.features.map((feature, i) => (
                                    <li key={i}>
                                        <Check size={16} className="check-icon" /> {feature}
                                    </li>
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
