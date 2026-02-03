import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <div className="hero-badge">
                    <span>Authentic Odia Rituals</span>
                </div>
                <h1>
                    Perform Pinda Daan Online <br />
                    <span className="highlight">With Pure Odia Sanskar</span>
                </h1>
                <p className="hero-subtitle">
                    Honor your ancestors from anywhere in the world. We perform Pinda Daan at Puri Swargadwar and Baitarani with verified priests, live streaming, and complete adherence to traditions.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary">Book Ritual Now</button>
                    <button className="btn btn-secondary-light">Know the Process</button>
                </div>

                <div className="hero-trust-badges">
                    <div className="badge">
                        <span className="icon">✓</span> Verified Priests
                    </div>
                    <div className="badge">
                        <span className="icon">●</span> Live Video Option
                    </div>
                    <div className="badge">
                        <span className="icon">☸</span> Traditional Vidhi
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
