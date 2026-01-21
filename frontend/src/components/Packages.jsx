import React from 'react';
import './Packages.css';
import { Check } from 'lucide-react';

const packages = [
    {
        title: "Basic Pinda Daan",
        location: "River Bank (Virtual)",
        price: "₹ 2,100",
        features: [
            "Group Ritual",
            "Performed by Vedic Brahmin",
            "Photos provided",
            "Standard Pinda material"
        ]
    },
    {
        title: "Special Pinda Daan",
        location: "Puri Swargadwar",
        price: "₹ 5,100",
        recommended: true,
        features: [
            "Individual Ritual (Sankalpa)",
            "Performed at Swargadwar",
            "Live Video Streaming",
            "Premium offerings (Vastra, Daan)",
            "Mahaprasad Bogh included"
        ]
    },
    {
        title: "Annual Shraddha",
        location: "Home / Temple",
        price: "₹ 3,500",
        features: [
            "According to Tithi",
            "Detailed Ancestry Pooja",
            "Performed by Senior Pandit",
            "Video Recording",
            "Brahmin Bhojan Feed"
        ]
    }
];

const Packages = () => {
    return (
        <section id="packages" className="packages-section">
            <div className="container">
                <h2 className="section-title">Ritual Packages</h2>
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <div key={index} className={`package-card ${pkg.recommended ? 'recommended' : ''}`}>
                            {pkg.recommended && <div className="tag">Most Popular</div>}
                            <h3>{pkg.title}</h3>
                            <div className="location">{pkg.location}</div>
                            <div className="price">{pkg.price}</div>
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

export default Packages;
